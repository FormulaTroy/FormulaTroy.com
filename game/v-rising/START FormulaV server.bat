@echo off
REM Copy this script to your own file and modify to your content. This file can be overwritten when updating.
set SteamAppId=1604030
echo "Starting V Rising Dedicated Server - PRESS CTRL-C to exit"

@echo on
VRisingServer.exe
-persistentDataPath .\save-data
-serverName "FormulaV"
-saveName "formulav"
-logFile ".\logs\formulavServer.log"
-hideIpAddress true
-lowerFPSWhenEmpty true
-lowerFPSWhenEmptyValue 5
