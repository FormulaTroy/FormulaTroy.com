/** @param {NS} ns */
export async function main(ns) {

  // reset home
  ns.killall('home', true);

  // start hackloop
	ns.exec('/hackloop/hackloop-init.js', 'home');

  // start hacking off of formulahacking servers
	// TO DO!
	// TURN THESE INTO XP BOTS THAT JUST FARM WEAKEN ON joesguns

  // start progs
	//ns.exec('/progloop/prog-init.js', 'home');

  // start buying XP servers
	// ns.exec('/progloop/progloop-servers.js', 'home');

}// end main();
