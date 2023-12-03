/** @param {NS} ns */
export async function main(ns) {

	// Target server of the hack
	var hackTarget = ns.args[0];

	// scan-analyze 10 for an array of hostnames to try
	// paste in vscode, take just the hostnames into an array
	// use that array here:
	var serverList = ["n00dles", "joesguns", "phantasy", "max-hardware", "computek", "foodnstuff", "sigma-cosmetics", "zer0", "silver-helix", "netlink", "johnson-ortho", "avmnite-02h", "summit-uni", "lexo-corp", "aerocorp", "omnia", "defcomm", "infocomm", "solaris", "nova-med", "unitalife", "icarus", "zb-def", "zeus-med", "rho-construction", "galactic-cyber", "omega-net", "crush-fitness", "rothman-uni", "zb-institute", "millenium-fitness", "catalyst", "alpha-ent", "global-pharm", "deltaone", "univ-energy", "taiyang-digital", "snap-fitness", "hong-fang-tea", "harakiri-sushi", "iron-gym", "nectar-net", "neo-net", "the-hub", "syscore", "aevum-police", "I.I.I.I", "CSEC", "darkweb"];

	for (let index = 0; index < serverList.length; index++) {

		// for each serverList[] item as var server
		const server = serverList[index];

		var serverReal = await ns.serverExists(server);
		// check server exists
		if (serverReal) {

			// Can I hackzor on you?
			var hackingLevelPlayer = ns.getHackingLevel();
			var hackingLevelServer = ns.getServerRequiredHackingLevel(server);
			if (hackingLevelPlayer >= hackingLevelServer) {

				// Apply all port opening hackzors
				var portsOpen = 0;
				if (ns.fileExists("BruteSSH.exe", "home")) { ns.brutessh(server); portsOpen++; }
				if (ns.fileExists("FTPCrack.exe", "home")) { ns.ftpcrack(server); portsOpen++; }
				if (ns.fileExists("relaySMTP.exe", "home")) { ns.relaysmtp(server); portsOpen++; }
				if (ns.fileExists("HTTPWorm.exe", "home")) { ns.httpworm(server); portsOpen++; }
				if (ns.fileExists("SQLInject.exe", "home")) { ns.sqlinject(server); portsOpen++; }

				// Check if enough ports were open for root
				var portsNeeded = ns.getServerNumPortsRequired(server);

				if (portsOpen >= portsNeeded) {
					// Get root access
					ns.nuke(server);

					// Copy HGW files over
					ns.scp('/hackloop/hgw/hackloop-wng.js', server, 'home');

					// Kill any current scripts on this server
					ns.killall(server, true);

					// Decide which scripts to execute and how many threads (ratio)
					// Sleeps are to stagger script executions
					var maxRam = ns.getServerMaxRam(server);

					// check if it's a 0 ram server
					if (maxRam >= 1) {

						// get script ram usage and calc max threads
						var scriptRam = ns.getScriptRam("/hackloop/hgw/hackloop-wng.js");
						var threads = Math.floor(maxRam / scriptRam);

						// exec the script on the target server with max num of threads
						ns.exec('/hackloop/hgw/hackloop-wng.js', server, threads, hackTarget);
						ns.toast('Using ' + maxRam + 'GB of ram from ' + server, "success", 8000);
						await ns.sleep(1000);

					} else {
						ns.toast('Cannot deploy to ' + server + '; Has 0 RAM!', "warning", 2000);
					}// end 0 ram server check

				} else {
					ns.toast('Cannot root ' + server + '; Only ' + portsOpen + '/' + portsNeeded + " ports open", "error", 8000);
				}// end hack level check

			} else {
				ns.toast('Cannot hack ' + server + '; needs hacking lvl: ' + hackingLevelServer, "error", 8000);
			}// end hack level check

		} else {
			ns.toast('Cannot find the server ' + server, "error", 8000);
		}// end check server exists

	}// end for loop over serverList

}// end main();
