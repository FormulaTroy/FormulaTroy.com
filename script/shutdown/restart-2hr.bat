:: Shutdown Controller Script
:: This is part of a script library to automate scheduled
:: shutdowns with macros or a Stream Deck
:: Full library on https://formulatroy.com

:: Set shutdown timer
shutdown /r /t 7200 /c "Scheduled restart from macro" /f /d p:0:0

:: Display confirmation box
start "" cmd /c "echo System restart scheduled for 2 hours!&echo(&pause"
