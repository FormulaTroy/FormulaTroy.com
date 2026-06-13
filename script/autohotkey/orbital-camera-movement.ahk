; Toggle slow orbital mouse movement on and off with the '~' key.

#SingleInstance Force
#UseHook

; Run as Admin
if !A_IsAdmin {
  Run('*RunAs "' A_ScriptFullPath '"')
  ExitApp()
}

~^s:: {
  Reload
}

; Turn script on and off with ~
global toggle := false
`:: {
  global toggle
  toggle := !toggle
}

; When on, move the mouse to the right slowly
Speed := 1
Loop {
  if toggle {
    ;MouseMove 10, 0, 0, "R"
    DllCall("mouse_event", "UInt", 1, "Int", Speed, "Int", 0, "UInt", 0, "UPtr", 0)
  }
  Sleep 1
}
