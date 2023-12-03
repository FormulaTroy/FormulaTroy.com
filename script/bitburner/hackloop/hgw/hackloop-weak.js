/** @param {NS} ns */
export async function main(ns) {

	// Target server of the hack
	var target = ns.args[0];

	// Infinite loop
	while (true) {

		await ns.weaken(target);

	}// end hackloop

}// end main();
