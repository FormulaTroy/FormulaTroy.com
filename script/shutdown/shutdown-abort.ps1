<# Shutdown Controller Script
This is part of a script library to automate scheduled shutdowns
with macros or a Stream Deck via the WindowsScriptDeck plugin.
Full library on https://formulatroy.com #>

# Abort any pending shutdown timer
shutdown /a

# Display confirmation box
Add-Type -AssemblyName PresentationFramework
[System.Windows.MessageBox]::Show('Pending shutdown from macro has been aborted!','Shutdown Macro Library Message')
