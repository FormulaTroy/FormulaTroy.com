/** @param {NS} ns */
export async function main(ns) {

	// RAM (GB) █ Long Cost ($)  █ Short Cost ($)
	// ██████████████████████████████████████████
	// 2        █ 110,000        █ 110k
	// 4        █ 220,000        █ 220k
	// 8        █ 440,000        █ 440k
	// 16       █ 880,000        █ 880k
	// 32       █ 1,760,000      █ 2M
	// 64       █ 3,520,000      █ 4M
	// 128      █ 7,040,000      █ 7M
	// 256      █ 14,080,000     █ 14M
	// 512      █ 28,160,000     █ 28M
	// 1024     █ 56,320,000     █ 56M
	// 2048     █ 112,640,000    █ 113M
	// 4096     █ 225,280,000    █ 225M
	// 8192     █ 450,560,000    █ 451M
	// 16384    █ 901,120,000    █ 901M
	// 32768    █ 1,802,240,000  █ 2B
	// 65536    █ 3,604,480,000  █ 4B
	// 131072   █ 7,208,960,000  █ 7B
	// 262144   █ 14,417,920,000 █ 14B
	// 524288   █ 28,835,840,000 █ 29B
	// 1048576  █ 57,671,680,000 █ 58B

	// How much GB RAM for each formulahacker
	// 64 TB of ram
	var ram = 65536;

	// Continuously try to purchase servers until the max
	var i = 0;
	while (i < ns.getPurchasedServerLimit()) {
		// Check if we have enough money to purchase a server
		if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram)) {
			// buy the server and start hacking XP farm
			var hostname = ns.purchaseServer("formulahacker-" + i, ram);
			ns.scp("/hackloop/hgw/hackloop-xp.js", hostname);
			ns.exec("/hackloop/hgw/hackloop-xp.js", hostname, 37449);
			ns.toast("Bought a new FormulaHacker!", "success", 8000);
			++i;
		}
		await ns.sleep(120000);
	}

}
