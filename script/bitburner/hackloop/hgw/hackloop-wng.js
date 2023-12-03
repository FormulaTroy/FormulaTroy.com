/** @param {NS} ns */
export async function main(ns) {

	// Target server of the hack
	var target = ns.args[0];
	var securityThresh = ns.getServerMinSecurityLevel(target) + 2;
	var currentSecurity = ns.getServerSecurityLevel(target);

	// Infinite loop
	while (true) {

		// recheck the current security level each loop
		currentSecurity = ns.getServerSecurityLevel(target);

		// if the security level is 5 above min, weaken
		// else, grow
		if (currentSecurity > securityThresh) {
			await ns.weaken(target);
		} else {
			await ns.grow(target);
		}

	}// end hackloop

}// end main();
