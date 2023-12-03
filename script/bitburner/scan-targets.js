/** @param {NS} ns */
export async function main(ns) {

  // find a target with good hackability.
  // target's hacking level should be 1/3ish of mine
  // better growth stat makes grow() more effective

  // > run scan-targets.js [hostname] [hostname2(optional)] [hostname(etc)]

  for (let index = 0; index < ns.args.length; index++) {
    const server = ns.args[index];
    //var prop1 = ns.getServerRequiredHackingLevel(server);
    var prop2 = ns.getServerGrowth(server);
    //var prop3 = ns.getServerMoneyAvailable(server);
    var prop4 = ns.getServerMaxMoney(server);
    var prop5 = ns.getServerMinSecurityLevel(server);
    //var prop6 = ns.getServerSecurityLevel(server);
    //var prop7 = ns.getServerMaxRam(server);
    ns.print("----------------");
    ns.print(server+": "+prop4+", "+prop2+", "+prop5);
    ns.print("----------------");
  }

}// end main();
