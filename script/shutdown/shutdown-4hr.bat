:: Shutdown Controller Script
:: This is part of a script library to automate scheduled
:: shutdowns with macros or a Stream Deck
:: Full library on https://formulatroy.com

:: Set shutdown timer
shutdown /s /t 14400 /c "Scheduled shutdown from macro" /f /d p:0:0

:: Display confirmation box
start "" cmd /c "echo System shutdown scheduled for 4 hours!&echo(&pause"
