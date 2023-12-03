[comment]: <> (BitBurner is a programming-based hacking game)
[comment]: <> (This folder has the scripts I used for a couple playthoughs)
[comment]: <> (https://store.steampowered.com/app/1812820/Bitburner/)

# Milestones
## Startup
[ ] > run init.js
[ ] ($200K) Buy TOR Router manually
[ ] ($500K) > buy BruteSSH.exe
## CSEC
[ ] > run find-server.js CSEC
[ ] (CSEC lvl 58) > run BruteSSH.exe; run NUKE.exe; backdoor;
## Hackzors
[ ] ($2m) > home; buy FTPCrack.exe
[ ] ($7m) > home; buy FTPCrack.exe; buy relaySMTP.exe; buy DeepscanV1.exe; buy ServerProfiler.exe
## Millions / NiteSec (L212)
[ ] [optional] ($26m) > home; buy DeepscanV2.exe; buy AutoLink.exe;
[ ] > run find-server.js avmnite-02h
[ ] (avmnite-02h) > scan-analyze 10
[ ] (NiteSec) > run BruteSSH.exe; run FTPCrack.exe; run NUKE.exe; backdoor;
## Black Hand (L353)
[ ] ($26m) > home; buy DeepscanV2.exe; buy AutoLink.exe;
[ ] > run find-server.js I.I.I.I
[ ] (I.I.I.I) > scan-analyze 10
[ ] (Black Hand) > run BruteSSH.exe; run FTPCrack.exe; run relaySMTP.exe; run NUKE.exe; backdoor;
## All Hackzors
[ ] ($300m) > home; buy HTTPWorm.exe; buy SQLInject.exe;
## BitRunners
[ ] > run find-server.js run4theh111z
[ ] (run4theh111z @ level 11) > scan-analyze 10
[ ] (BitRunners) > run BruteSSH.exe;run FTPCrack.exe;run relaySMTP.exe;run HTTPWorm.exe;run SQLInject.exe;run NUKE.exe;backdoor;
## XP Farming
[ ] (XP Farming) > run progloop/progloop-xp.js {0-5}
## Find the BitNode
(w0r1d_d43m0n) > run BruteSSH.exe;run FTPCrack.exe;run relaySMTP.exe;run HTTPWorm.exe;run SQLInject.exe;run NUKE.exe;backdoor;


once at the highest hostname in the main loop, start secondary formulahacker servers at max ram that have a home-loop kind of thing with an arg, and start hacking the top 10 targets from the list.



# To Do
combine grow and weaken into the same script that chooses
hack script has a conditional to only hack if there's at least 70% money available?





update findserver.js to also try to open ports and nuke and backdoor


DEPLOY WITH MAX RAM -> https://github.com/bitburner-official/bitburner-scripts/blob/master/deploy.js

Tian Di Hui is a faction you can get by being in one of the Asian cities (Chongqing, New Tokyo, Ishima) if you have enough hacking stat and money, which you should. They have two augments that increase faction rep gain and are almost always worth investing in because their highest rep augment allows you to not focus on faction/company work and still get full reputation gains.

wait until start with formulas.exe?
https://bitburner.readthedocs.io/en/latest/advancedgameplay/hackingalgorithms.html#hacking-managers-proto-batchers





# Script Tree

Nested scripts are started automatically by the parent script.

> init.js

>>> hackloop/hackloop-monitor-target.js
>>> hackloop/hackloop-init.js
>>>>> hackloop/hgw/hackloop-{hack/grow/weaken}.js
>>> hackloop/hackloop-home.js
>>>>> hackloop/hgw/hackloop-{hack/grow/weaken}.js

>>> prog/prog-milestones.js





# Commands

Terminal help
> help

ctrl + c will end a command like hack early

> run BruteSSH.exe
> run FTPCrack.exe
> run relaySMTP.exe
> run HTTPWorm.exe
> run SQLInject.exe

> run NUKE.exe

> backdoor

All ports and nuke:
> run BruteSSH.exe; run FTPCrack.exe; run relaySMTP.exe; run HTTPWorm.exe; run SQLInject.exe; run NUKE.exe;

## Navigation

Go home
> home

See RAM, etc
> free

Scan internet
> scan
> scan-analyze (depth)

Look for machines
> scan-analyze 3
> scan-analyze 5

> connect {server}

## Get Root Access

> analyze

If ports are open, get root
> run NUKE.exe

## Scripting

Create file
> nano n00dles.js

check RAM cost
> mem [scriptname] -t [numOfThreads]

## Logging

> tail n00dles.js

## Transfering files

> scp hackloop-noodles.js foodnstuff
