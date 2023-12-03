<# Shutdown Controller Script
This is part of a script library to automate scheduled shutdowns
with macros or a Stream Deck via the WindowsScriptDeck plugin.
Full library on https://formulatroy.com #>

# Set shutdown timer
shutdown /s /t 28800 /c "Scheduled shutdown from macro" /f /d p:0:0

# Display confirmation box
Add-Type -AssemblyName PresentationFramework
[System.Windows.MessageBox]::Show('Shutdown scheduled for 8 hours!','Shutdown Macro Library Message')
