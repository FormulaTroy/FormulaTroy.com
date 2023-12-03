/** @param {NS} ns */
export async function main(ns) {

  // Target server of the hack
  var hackTarget = ns.args[0];

  // Get Home Ram minus a reserve amount for running other stuff)
  var homeRam = ns.getServerMaxRam('home') - 15;
  var homeRamNumOfShards = 5;
  var homeRamShard = Math.floor(homeRam / homeRamNumOfShards);
  var homeRamAfterHack = 0;
  var hackRamNeeded = ns.getScriptRam("/hackloop/hgw/hackloop-hack.js");
  var growRamNeeded = ns.getScriptRam("/hackloop/hgw/hackloop-grow.js");
  var weakRamNeeded = ns.getScriptRam("/hackloop/hgw/hackloop-weak.js");
  var wngRamNeeded  = ns.getScriptRam("/hackloop/hgw/hackloop-wng.js");
  var hackThreads = 1;
  var growThreads = 1;
  var weakThreads = 1;
  var wngThreads = 1;

  // Kill any current HGW scripts on this server
  ns.scriptKill('/hackloop/hgw/hackloop-hack.js', 'home');
  ns.scriptKill('/hackloop/hgw/hackloop-grow.js', 'home');
  ns.scriptKill('/hackloop/hgw/hackloop-weak.js', 'home');
  ns.scriptKill('/hackloop/hgw/hackloop-hack2.js', 'home');
  ns.scriptKill('/hackloop/hgw/hackloop-grow2.js', 'home');
  ns.scriptKill('/hackloop/hgw/hackloop-weak2.js', 'home');
  ns.scriptKill('/hackloop/hgw/hackloop-hack3.js', 'home');
  ns.scriptKill('/hackloop/hgw/hackloop-grow3.js', 'home');
  ns.scriptKill('/hackloop/hgw/hackloop-weak3.js', 'home');
  ns.scriptKill('/hackloop/hgw/hackloop-hack4.js', 'home');
  ns.scriptKill('/hackloop/hgw/hackloop-grow4.js', 'home');
  ns.scriptKill('/hackloop/hgw/hackloop-weak4.js', 'home');
  ns.scriptKill('/hackloop/hgw/hackloop-hack5.js', 'home');
  ns.scriptKill('/hackloop/hgw/hackloop-grow5.js', 'home');
  ns.scriptKill('/hackloop/hgw/hackloop-weak5.js', 'home');
  ns.scriptKill('/hackloop/hgw/hackloop-wng.js', 'home');
  ns.scriptKill('/hackloop/hgw/hackloop-wng2.js', 'home');
  ns.scriptKill('/hackloop/hgw/hackloop-wng3.js', 'home');
  ns.scriptKill('/hackloop/hgw/hackloop-wng4.js', 'home');
  ns.scriptKill('/hackloop/hgw/hackloop-wng5.js', 'home');

  // Depending on RAM, decide which scripts to execute and how many threads and batches
  if (homeRam >= 400) {
    // split home ram into shards / batches
    var homeRamNumOfShards = 4;
    var homeRamShard = Math.floor(homeRam / homeRamNumOfShards);

    // garuntee at least X amount of hack threads
    hackThreads = 3;
    homeRamAfterHack = homeRamShard - (hackThreads * hackRamNeeded);

    // depending on how much ram is left, use 80% for growing and 20% for weakening
    // weakThreads = Math.floor( (homeRamAfterHack * 0.2) / weakRamNeeded );
    // growThreads = Math.floor( (homeRamAfterHack * 0.8) / growRamNeeded );
    // v2: use 100% for the Weak and Grow conditional script
    wngThreads = Math.floor( homeRamAfterHack / wngRamNeeded );

    // run thw HGW with the specific thread counts, for each shard
    ns.exec('/hackloop/hgw/hackloop-hack.js', 'home', hackThreads, hackTarget);
    ns.exec('/hackloop/hgw/hackloop-wng.js', 'home', wngThreads, hackTarget);
    ns.toast('Home HGW batch 1 running!', "success", 8000);
    await ns.sleep(15000);
    ns.exec('/hackloop/hgw/hackloop-hack2.js', 'home', hackThreads, hackTarget);
    ns.exec('/hackloop/hgw/hackloop-wng2.js', 'home', wngThreads, hackTarget);
    ns.toast('Home HGW batch 2 running!', "success", 8000);
    await ns.sleep(15000);
    ns.exec('/hackloop/hgw/hackloop-hack3.js', 'home', hackThreads, hackTarget);
    ns.exec('/hackloop/hgw/hackloop-wng3.js', 'home', wngThreads, hackTarget);
    ns.toast('Home HGW batch 3 running!', "success", 8000);
    await ns.sleep(15000);
    ns.exec('/hackloop/hgw/hackloop-hack4.js', 'home', hackThreads, hackTarget);
    ns.exec('/hackloop/hgw/hackloop-wng4.js', 'home', wngThreads, hackTarget);
    ns.toast('Home HGW batch 4 running!', "success", 8000);
    await ns.sleep(15000);

  } else if (homeRam >= 100) {
    // split home ram into shards / batches
    var homeRamNumOfShards = 2;
    var homeRamShard = Math.floor(homeRam / homeRamNumOfShards);

    // garuntee at least X amount of hack threads
    hackThreads = 3;
    homeRamAfterHack = homeRamShard - (hackThreads * hackRamNeeded);

    // depending on how much ram is left, use 80% for growing and 20% for weakening
    // weakThreads = Math.floor( (homeRamAfterHack * 0.2) / weakRamNeeded );
    // growThreads = Math.floor( (homeRamAfterHack * 0.8) / growRamNeeded );
    // v2: use 100% for the Weak and Grow conditional script
    wngThreads = Math.floor( homeRamAfterHack / wngRamNeeded );

    // run thw HGW with the specific thread counts, for each shard
    ns.exec('/hackloop/hgw/hackloop-hack.js', 'home', hackThreads, hackTarget);
    ns.exec('/hackloop/hgw/hackloop-wng.js', 'home', wngThreads, hackTarget);
    ns.toast('Home HGW batch 1 running!', "success", 8000);
    await ns.sleep(15000);
    ns.exec('/hackloop/hgw/hackloop-hack2.js', 'home', hackThreads, hackTarget);
    ns.exec('/hackloop/hgw/hackloop-wng2.js', 'home', wngThreads, hackTarget);
    ns.toast('Home HGW batch 2 running!', "success", 8000);
    await ns.sleep(15000);

  } else {
    // garuntee at least X amount of hack threads
    hackThreads = 1;
    homeRamAfterHack = homeRam - (hackThreads * hackRamNeeded);

    // depending on how much ram is left, use 80% for growing and 20% for weakening
    // weakThreads = Math.floor( (homeRamAfterHack * 0.2) / weakRamNeeded );
    // growThreads = Math.floor( (homeRamAfterHack * 0.8) / growRamNeeded );
    // v2: use 100% for the Weak and Grow conditional script
    wngThreads = Math.floor( homeRamAfterHack / wngRamNeeded );

    // run thw HGW with the specific thread counts
    ns.exec('/hackloop/hgw/hackloop-hack.js', 'home', hackThreads, hackTarget);
    ns.exec('/hackloop/hgw/hackloop-wng.js', 'home', wngThreads, hackTarget);
    ns.toast('Home HGW running! (single batch)', "success", 8000);
    await ns.sleep(15000);
  }

  // Decide which scripts to execute and how many threads (ratio)
  // 1.75GB of RAM per thread
  // ns.exec('/hackloop/hgw/hackloop-weak.js', 'home', 520, hackTarget);
  // ns.exec('/hackloop/hgw/hackloop-grow.js', 'home', 2160, hackTarget);
  // ns.exec('/hackloop/hgw/hackloop-hack.js', 'home', 10, hackTarget);
  // ns.toast('Home HGW batch 1 running!', "success", 8000);
  // await ns.sleep(15000);
  // ns.exec('/hackloop/hgw/hackloop-weak2.js', 'home', 520, hackTarget);
  // ns.exec('/hackloop/hgw/hackloop-grow2.js', 'home', 2160, hackTarget);
  // ns.exec('/hackloop/hgw/hackloop-hack2.js', 'home', 10, hackTarget);
  // ns.toast('Home HGW batch 2 running!', "success", 8000);
  // await ns.sleep(15000);
  // ns.exec('/hackloop/hgw/hackloop-weak3.js', 'home', 520, hackTarget);
  // ns.exec('/hackloop/hgw/hackloop-grow3.js', 'home', 2160, hackTarget);
  // ns.exec('/hackloop/hgw/hackloop-hack3.js', 'home', 10, hackTarget);
  // ns.toast('Home HGW batch 3 running!', "success", 8000);
  // await ns.sleep(15000);
  // ns.exec('/hackloop/hgw/hackloop-weak4.js', 'home', 520, hackTarget);
  // ns.exec('/hackloop/hgw/hackloop-grow4.js', 'home', 2160, hackTarget);
  // ns.exec('/hackloop/hgw/hackloop-hack4.js', 'home', 10, hackTarget);
  // ns.toast('Home HGW batch 4 running!', "success", 8000);
  // await ns.sleep(15000);
  // ns.exec('/hackloop/hgw/hackloop-weak5.js', 'home', 520, hackTarget);
  // ns.exec('/hackloop/hgw/hackloop-grow5.js', 'home', 2160, hackTarget);
  // ns.exec('/hackloop/hgw/hackloop-hack5.js', 'home', 10, hackTarget);
  // ns.toast('Home HGW batch 5 running!', "success", 8000);

} // end main();
