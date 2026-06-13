#Requires AutoHotkey v2.0
#SingleInstance Force
#UseHook

; Run as Admin to ensure it works inside the game window
if !A_IsAdmin {
    Run('*RunAs "' A_ScriptFullPath '"')
    ExitApp()
}

~^s:: {
    Reload
}

; --- CONFIGURATION ---
global Friction := 0.95            ; How fast the drift slows down (0.70 = quick stop, 0.95 = long slide)
global ActivationThreshold := 0.0  ; MINIMUM raw velocity (pixels) required to trigger drift.
                                   ; Anything below this is treated as a micro-correction and ignored.
global CutoffVelocity := 0.01      ; The baseline speed where the drift completely stops running
global SampleRate := 1            ; How often (in ms) the script checks your mouse speed
; ---------------------

global toggle := true ; Script starts on or off
`:: {
    global toggle := !toggle
    SoundBeep(toggle ? 1000 : 500, 100) ; Quick beep to let you know if it's on/off
}

; Initialize positions globally
global LastX := 0, LastY := 0
MouseGetPos(&LastX, &LastY)

SetTimer(TrackAndSmooth, SampleRate)

TrackAndSmooth() {
    global Friction, ActivationThreshold, CutoffVelocity, SampleRate, toggle, LastX, LastY
    static VelX := 0, VelY := 0
    static DriftActive := false

    if (!toggle) {
        return
    }

    ; Get the current mouse position
    MouseGetPos(&CurrentX, &CurrentY)

    ; Calculate how far the mouse physically moved since the last check
    DeltaX := CurrentX - LastX
    DeltaY := CurrentY - LastY

    ; CASE 1: You are actively moving the physical mouse
    if (DeltaX != 0 || DeltaY != 0) {
        ; Calculate total directional movement using absolute values
        TotalDelta := Max(Abs(DeltaX), Abs(DeltaY))

        ; Only capture velocity if movement exceeds our configuration threshold
        if (TotalDelta >= ActivationThreshold) {
            VelX := DeltaX
            VelY := DeltaY
        } else {
            ; For micro-corrections, keep tracking mouse position but wipe the velocity buffer
            VelX := 0
            VelY := 0
        }
        DriftActive := false
    }
    ; CASE 2: Your hand stopped, but we have stored velocity to bleed off
    else if (Abs(VelX) > CutoffVelocity || Abs(VelY) > CutoffVelocity) {
        DriftActive := true

        ; Apply friction to slow down the speed for the next loop
        VelX *= Friction
        VelY *= Friction

        ; debug, turn off Y value for now, only smooth on X
        VelY := 0

        ; Inject the raw, decaying relative movement packet into the game
        DllCall("mouse_event", "UInt", 1, "Int", Round(VelX), "Int", Round(VelY), "UInt", 0, "UPtr", 0)
    }
    ; CASE 3: Mouse is completely still and drift has finished
    else {
        VelX := 0
        VelY := 0
        DriftActive := false
    }

    ; Update coordinates for the next loop iteration
    if (DriftActive) {
        MouseGetPos(&LastX, &LastY)
    } else {
        LastX := CurrentX
        LastY := CurrentY
    }
}
