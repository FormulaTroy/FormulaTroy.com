/** @param {NS} ns */
export async function main(ns) {

	// Target server of the hack
	var target = ns.args[0];

	// only hack if the server has 75% of it's money there
	var moneyThresh = ns.getServerMaxMoney(target) * 0.25;
	var currentMoney = ns.getServerMoneyAvailable(target);

	// Infinite loop
	while (true) {

		// recheck the current money each loop
		currentMoney = ns.getServerMoneyAvailable(target);

		// if the current money is over 75% of max, hack
		// else, wait a few seconds and check again
		if (currentMoney > moneyThresh) {
			await ns.hack(target);
		} else {
			await ns.sleep(5000);
		}

	}// end hackloop

}// end main();
