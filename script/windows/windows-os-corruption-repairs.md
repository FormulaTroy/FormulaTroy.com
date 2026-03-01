# Fix random OS-related BS issues
## Commands run via cmd as Admin

1. Reduce the size of the WinSxS folder (the Windows Component Store) by removing outdated versions of system components that have been replaced by newer updates:
- dism /online /cleanup-image /analyzecomponentstore

If results are "Component Store Cleanup Recommended : Yes":
- dism /online /cleanup-image /startcomponentcleanup


2. Scan Windows components for corruption:
- dism /online /cleanup-image /scanhealth

If results are "The component store is repairable.":
- dism /online /cleanup-image /restorehealth


3. After source image repairs, sfc can be used for loose files like dlls:
- sfc /scannow
