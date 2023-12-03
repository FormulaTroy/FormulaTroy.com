/** @param {NS} ns */
export async function main(ns) {

	// Infinite loop
	while (true) {

		// get the current hacking level
		hackingLevelPlayer = ns.getHackingLevel();

		// buy TOR automatically
		// Once you've completed BitNode 4, you'll unlock an API that allows you to do this:
		// ns.purchaseTor();

		// buy programs
		// if (!ns.fileExists("BruteSSH.exe", "home"))

		// wait 1 minute and then check it all again
		await ns.sleep(60000);

	}// end loop

}// end main();
