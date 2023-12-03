/** @param {NS} ns */
export async function main(ns) {

  // Target server of the hack
  var target = ns.args[0];

  // Infinite loop
  while (true) {

    ns.getServerRequiredHackingLevel(target);
    ns.getServerGrowth(target);
    ns.getServerMoneyAvailable(target);
    ns.getServerMaxMoney(target);
    ns.getServerMinSecurityLevel(target);
    ns.getServerSecurityLevel(target);
    ns.print("----------------");

    await ns.sleep(1000);

  }

}// end main();
