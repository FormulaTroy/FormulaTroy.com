/** @param {NS} ns */
export async function main(ns) {

	// Init vars on startup
	var hackTarget = "(none)";
	var proposedTarget = "";
	var targetChanged = 0;
	var hackingLevelPlayer = ns.getHackingLevel();
	if (ns.fileExists("BruteSSH.exe", "home") && ns.fileExists("FTPCrack.exe", "home") && ns.fileExists("relaySMTP.exe", "home") && ns.fileExists("HTTPWorm.exe", "home") && ns.fileExists("SQLInject.exe", "home")) {
		var allPortAccess = 1;
	} else {
		var allPortAccess = 0;
	}

	// Infinite loop
	while (true) {

		// get the current hacking level
		hackingLevelPlayer = ns.getHackingLevel();

		// If we are ready to start hacking, or switch hacking targets
		if (targetChanged == 1) {

			ns.toast('NEW TARGET!! (' + hackTarget + ')', "success", 8000);

			// start monitoring off of home machine
			ns.scriptKill('/hackloop/hackloop-monitor-target.js', 'home');
			ns.exec('/hackloop/hackloop-monitor-target.js', 'home', 1, hackTarget);
			ns.toast(hackTarget + ' monitor script running @ home!', "success", 8000);

			// start hacking off of home machine
			ns.exec('/hackloop/hackloop-home.js', 'home', 1, hackTarget);
			ns.toast('/hackloop/hackloop-home.js running!', "success", 8000);

			// spider the network and start hacking off the city
			ns.exec('/hackloop/hackloop-spider.js', 'home', 1, hackTarget);
			ns.toast('/hackloop/hackloop-spider.js running!', "success", 8000);

			// set the target change back to no
			targetChanged = 0;

		} else {

			ns.toast('Checking for new target.. currently: ' + hackTarget, "success", 8000);

			// see which targets we are high enough level for now
			if (hackingLevelPlayer >= 2508 && allPortAccess == 1) {
				proposedTarget = "global-pharm";
				ns.brutessh(proposedTarget); ns.ftpcrack(proposedTarget); ns.relaysmtp(proposedTarget); ns.httpworm(proposedTarget); ns.sqlinject(proposedTarget); ns.nuke(proposedTarget);

			} else if (hackingLevelPlayer >= 2490 && allPortAccess == 1) {
				proposedTarget = "univ-energy";
				ns.brutessh(proposedTarget); ns.ftpcrack(proposedTarget); ns.relaysmtp(proposedTarget); ns.httpworm(proposedTarget); ns.sqlinject(proposedTarget); ns.nuke(proposedTarget);

			} else if (hackingLevelPlayer >= 2487 && allPortAccess == 1) {
				proposedTarget = "nova-med";
				ns.brutessh(proposedTarget); ns.ftpcrack(proposedTarget); ns.relaysmtp(proposedTarget); ns.httpworm(proposedTarget); ns.sqlinject(proposedTarget); ns.nuke(proposedTarget);

			} else if (hackingLevelPlayer >= 2427 && allPortAccess == 1) {
				proposedTarget = "unitalife";
				ns.brutessh(proposedTarget); ns.ftpcrack(proposedTarget); ns.relaysmtp(proposedTarget); ns.httpworm(proposedTarget); ns.sqlinject(proposedTarget); ns.nuke(proposedTarget);

			} else if (hackingLevelPlayer >= 2364 && allPortAccess == 1) {
				proposedTarget = "zb-def";
				ns.brutessh(proposedTarget); ns.ftpcrack(proposedTarget); ns.relaysmtp(proposedTarget); ns.httpworm(proposedTarget); ns.sqlinject(proposedTarget); ns.nuke(proposedTarget);

			} else if (hackingLevelPlayer >= 2190 && allPortAccess == 1) {
				proposedTarget = "zb-institute";
				ns.brutessh(proposedTarget); ns.ftpcrack(proposedTarget); ns.relaysmtp(proposedTarget); ns.httpworm(proposedTarget); ns.sqlinject(proposedTarget); ns.nuke(proposedTarget);

			} else if (hackingLevelPlayer >= 1779 && allPortAccess == 1) {
				proposedTarget = "alpha-ent";
				ns.brutessh(proposedTarget); ns.ftpcrack(proposedTarget); ns.relaysmtp(proposedTarget); ns.httpworm(proposedTarget); ns.sqlinject(proposedTarget); ns.nuke(proposedTarget);

			} else if (hackingLevelPlayer >= 1515 && allPortAccess == 1) {
				proposedTarget = "rho-construction";
				ns.brutessh(proposedTarget); ns.ftpcrack(proposedTarget); ns.relaysmtp(proposedTarget); ns.httpworm(proposedTarget); ns.sqlinject(proposedTarget); ns.nuke(proposedTarget);

			} else if (hackingLevelPlayer >= 1293 && allPortAccess == 1) {
				proposedTarget = "catalyst";
				ns.brutessh(proposedTarget); ns.ftpcrack(proposedTarget); ns.relaysmtp(proposedTarget); ns.httpworm(proposedTarget); ns.sqlinject(proposedTarget); ns.nuke(proposedTarget);

			} else if (hackingLevelPlayer >= 1290 && allPortAccess == 1) {
				proposedTarget = "summit-uni";
				ns.brutessh(proposedTarget); ns.ftpcrack(proposedTarget); ns.relaysmtp(proposedTarget); ns.httpworm(proposedTarget); ns.sqlinject(proposedTarget); ns.nuke(proposedTarget);

			} else if (hackingLevelPlayer >= 1131 && allPortAccess == 1) {
				proposedTarget = "netlink";
				ns.brutessh(proposedTarget); ns.ftpcrack(proposedTarget); ns.relaysmtp(proposedTarget); ns.httpworm(proposedTarget); ns.sqlinject(proposedTarget); ns.nuke(proposedTarget);

			} else if (hackingLevelPlayer >= 1107 && allPortAccess == 1) {
				proposedTarget = "computek";
				ns.brutessh(proposedTarget); ns.ftpcrack(proposedTarget); ns.relaysmtp(proposedTarget); ns.httpworm(proposedTarget); ns.sqlinject(proposedTarget); ns.nuke(proposedTarget);

			} else if (hackingLevelPlayer >= 921 && allPortAccess == 1) {
				proposedTarget = "the-hub";
				ns.brutessh(proposedTarget); ns.ftpcrack(proposedTarget); ns.relaysmtp(proposedTarget); ns.httpworm(proposedTarget); ns.sqlinject(proposedTarget); ns.nuke(proposedTarget);

			} else if (hackingLevelPlayer >= 768 && allPortAccess == 1) {
				proposedTarget = "johnson-ortho";
				ns.brutessh(proposedTarget); ns.ftpcrack(proposedTarget); ns.relaysmtp(proposedTarget); ns.httpworm(proposedTarget); ns.sqlinject(proposedTarget); ns.nuke(proposedTarget);

			} else if (hackingLevelPlayer >= 558 && allPortAccess == 1) {
				proposedTarget = "omega-net";
				ns.brutessh(proposedTarget); ns.ftpcrack(proposedTarget); ns.relaysmtp(proposedTarget); ns.httpworm(proposedTarget); ns.sqlinject(proposedTarget); ns.nuke(proposedTarget);

			} else if (hackingLevelPlayer >= 400 && ns.fileExists("BruteSSH.exe", "home") && ns.fileExists("FTPCrack.exe", "home")) {
				proposedTarget = "silver-helix";
				ns.brutessh(proposedTarget);
				ns.ftpcrack(proposedTarget);
				ns.nuke(proposedTarget);

				// if we don't have all port access yet
				if (allPortAccess == 0) {
					// see if we do now
					if (ns.fileExists("BruteSSH.exe", "home") && ns.fileExists("FTPCrack.exe", "home") && ns.fileExists("relaySMTP.exe", "home") && ns.fileExists("HTTPWorm.exe", "home") && ns.fileExists("SQLInject.exe", "home")) {
						allPortAccess = 1;
					} else {
						ns.toast('Need more port hackzors!', "error", 8000);
					}
				}

			} else if (hackingLevelPlayer >= 300 && ns.fileExists("BruteSSH.exe", "home") && ns.fileExists("FTPCrack.exe", "home")) {
				proposedTarget = "phantasy";
				ns.brutessh(proposedTarget);
				ns.ftpcrack(proposedTarget);
				ns.nuke(proposedTarget);

			} else if (hackingLevelPlayer >= 10 && ns.fileExists("BruteSSH.exe", "home")) {
				proposedTarget = "joesguns";
				ns.brutessh(proposedTarget);
				ns.nuke(proposedTarget);

			} else {
				proposedTarget = "n00dles";
			}

			// if the hacking level is high enough for a new target
			if (proposedTarget != hackTarget) {
				// flag that were are ready to reboot the hacking army
				targetChanged = 1;
				// set the new target
				hackTarget = proposedTarget;
			} else {
				// wait 1 minute and then check it all again
				await ns.sleep(60000);
			}

		}

	}// end hackloop

}// end main();
