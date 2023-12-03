:: Shutdown Controller Script
:: This is part of a script library to automate scheduled
:: shutdowns with macros or a Stream Deck
:: Full library on https://formulatroy.com

:: Abort any pending shutdown timer
shutdown /a

:: Display confirmation box
start "" cmd /c "echo Pending shutdown has been aborted!&echo(&pause"
