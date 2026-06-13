#Requires AutoHotkey v2.0
#SingleInstance Force
#UseHook

if !A_IsAdmin {
    Run('*RunAs "' A_ScriptFullPath '"')
    ExitApp()
}

~^s:: {
    Reload
}

; --- CONFIGURATION ---
global Friction := 0.89
global ActivationThreshold := 0.0
global CutoffVelocity := 0.00000001

global EnableY := false

global CaptureRate := 1
global OutputRate := 10
; ---------------------

global toggle := true
`:: {
    global toggle := !toggle
    SoundBeep(toggle ? 1000 : 500, 100)
}

global LastX := 0, LastY := 0
global VelX := 0, VelY := 0
global IsMovingHand := false

MouseGetPos(&LastX, &LastY)

SetTimer(CaptureInput, CaptureRate)
SetTimer(ApplyForces, OutputRate)

CaptureInput() {
    global toggle, LastX, LastY, VelX, VelY, IsMovingHand, EnableY
    static DynamicThreshold := 0

    if (!toggle) {
        return
    }

    MouseGetPos(&CurrentX, &CurrentY)
    DeltaX := CurrentX - LastX
    DeltaY := CurrentY - LastY

    if (DeltaX != 0 || DeltaY != 0) {
        IsMovingHand := true

        VelX := (VelX * 0.4) + (DeltaX * 0.6)
        VelY := (VelY * 0.4) + ((EnableY ? DeltaY : 0) * 0.6)

        LastX := CurrentX
        LastY := CurrentY

        DynamicThreshold := A_TickCount
    } else if (A_TickCount - DynamicThreshold > 15) {
        IsMovingHand := false
    }
}

ApplyForces() {
    global toggle, VelX, VelY, IsMovingHand, Friction, CutoffVelocity, LastX, LastY
    static DriftActive := false

    if (!toggle) {
        return
    }

    ; While you are moving your hand, let the math settle cleanly
    if (IsMovingHand) {
        DriftActive := false
        return
    }

    ; When your hand stops, it takes the final accurately weighted velocity and bleeds it out
    if (Abs(VelX) > CutoffVelocity || Abs(VelY) > CutoffVelocity) {
        DriftActive := true

        VelX *= Friction
        VelY *= Friction

        if (Round(VelX) == 0 && Round(VelY) == 0) {
            VelX := 0
            VelY := 0
            DriftActive := false
            return
        }

        DllCall("mouse_event", "UInt", 1, "Int", Round(VelX), "Int", Round(VelY), "UInt", 0, "UPtr", 0)

        ; Sync coordinates to avoid reading our own artificial drift
        MouseGetPos(&LastX, &LastY)
    }
    else {
        VelX := 0
        VelY := 0
        DriftActive := false
    }
}
