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
global Friction := 0.89            ; Lower = stops faster. Higher (e.g., 0.95) = glides longer.
global ActivationThreshold := 5.0  ; Minimum peak velocity required during a swipe to trigger inertia.
global MinInertiaVelocity := 6.0   ; The baseline velocity injected if the swipe trails off at the end.
global CutoffVelocity := 0.1       ; Velocity at which the simulation completely stops.

global EnableY := false            ; Set to true to allow vertical inertia.

global CaptureRate := 10           ; Balanced input capture rate (10ms matches typical polling ticks).
global OutputRate := 10            ; Output loop execution rate (10ms).
; ---------------------

global toggle := true
`:: {
    global toggle := !toggle
    SoundBeep(toggle ? 1000 : 500, 100)
}

; Internal State Trackers
global LastX := 0, LastY := 0
global VelX := 0, VelY := 0
global PeakVelX := 0, PeakVelY := 0
global IsMovingHand := false
global InertiaArmed := false
global LastMoveTime := 0

; Initialize starting mouse position
MouseGetPos(&LastX, &LastY)

; Timers
SetTimer(CaptureInput, CaptureRate)
SetTimer(ApplyForces, OutputRate)

/**
 * Captures physical user mouse movements, calculates current velocity,
 * and tracks the peak velocity of the current physical swipe.
 */
CaptureInput() {
    global toggle, LastX, LastY, VelX, VelY, PeakVelX, PeakVelY, IsMovingHand, InertiaArmed, LastMoveTime, EnableY

    if (!toggle) {
        return
    }

    MouseGetPos(&CurrentX, &CurrentY)
    DeltaX := CurrentX - LastX
    DeltaY := CurrentY - LastY

    if (DeltaX != 0 || DeltaY != 0) {
        IsMovingHand := true
        LastMoveTime := A_TickCount

        ; Smooth out immediate spikes using a weighted moving average
        CurrentVelX := (VelX * 0.3) + (DeltaX * 0.7)
        CurrentVelY := (VelY * 0.3) + ((EnableY ? DeltaY : 0) * 0.7)

        VelX := CurrentVelX
        VelY := CurrentVelY

        ; Track the absolute peak velocity achieved during this single continuous movement
        if (Abs(CurrentVelX) > Abs(PeakVelX)) {
            PeakVelX := CurrentVelX
        }
        if (Abs(CurrentVelY) > Abs(PeakVelY)) {
            PeakVelY := CurrentVelY
        }

        ; Check if this physical stroke broke past our activation threshold
        if (Abs(PeakVelX) >= ActivationThreshold || Abs(PeakVelY) >= ActivationThreshold) {
            InertiaArmed := true
        }

        ; Keep our baseline coordinates tracked
        LastX := CurrentX
        LastY := CurrentY
    }
    ; If no physical movement is detected for more than 20ms, the hand has stopped
    else if (IsMovingHand && (A_TickCount - LastMoveTime > 20)) {
        IsMovingHand := false

        ; If the gesture qualified for inertia, inject the peak velocities
        if (InertiaArmed) {
            ; If trailing off caused the velocity to drop below our minimum floor, force the floor limit
            if (Abs(VelX) < MinInertiaVelocity && VelX != 0) {
                VelX := (VelX > 0) ? MinInertiaVelocity : -MinInertiaVelocity
            } else if (VelX == 0 && PeakVelX != 0) {
                VelX := (PeakVelX > 0) ? MinInertiaVelocity : -MinInertiaVelocity
            }

            if (EnableY) {
                if (Abs(VelY) < MinInertiaVelocity && VelY != 0) {
                    VelY := (VelY > 0) ? MinInertiaVelocity : -MinInertiaVelocity
                } else if (VelY == 0 && PeakVelY != 0) {
                    VelY := (PeakVelY > 0) ? MinInertiaVelocity : -MinInertiaVelocity
                }
            }
        }
        else {
            ; Hand stopped without breaking the threshold; clear velocities completely
            VelX := 0
            VelY := 0
        }

        ; Reset stroke peak tracking for the next movement
        PeakVelX := 0
        PeakVelY := 0
    }
}

/**
 * Handles the physics loop processing. When the hand stops moving,
 * this bleeds off the injected velocities over time via friction.
 */
ApplyForces() {
    global toggle, VelX, VelY, IsMovingHand, InertiaArmed, Friction, CutoffVelocity, LastX, LastY

    if (!toggle || IsMovingHand || !InertiaArmed) {
        return
    }

    ; If velocities drop below our cutoff scale, completely kill the loop
    if (Abs(VelX) <= CutoffVelocity && Abs(VelY) <= CutoffVelocity) {
        VelX := 0
        VelY := 0
        InertiaArmed := false
        return
    }

    ; Apply decay
    VelX *= Friction
    VelY *= Friction

    ; Round out movements to cleanly communicate integer changes to the system
    MoveX := Round(VelX)
    MoveY := Round(VelY)

    if (MoveX != 0 || MoveY != 0) {
        DllCall("mouse_event", "UInt", 1, "Int", MoveX, "Int", MoveY, "UInt", 0, "UPtr", 0)

        ; Crucial: Wait for the hardware queue to process before grabbing our coordinate update
        Sleep(1)
        MouseGetPos(&LastX, &LastY)
    }
}
