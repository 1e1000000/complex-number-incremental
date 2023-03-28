function calc(dt, dt_offline) {
    if (player.pause) return
    player.offline.time = Math.max(player.offline.time-tmp.offlineMult*dt_offline,0)

    player.number.Re = player.number.Re.add(tmp.numberProduction.Re.mul(dt)).max(0)
    player.number.Im = player.number.Im.add(tmp.numberProduction.Im.mul(dt)).max(0)

    player.recordRUpg2 = player.recordRUpg2.max(player.mainUpgs[1])
}

function loop() {
    diff = Date.now()-date;
    updateTemp()
    updateHTML()
    calc(diff/1000*tmp.offlineMult,diff/1000);
    date = Date.now();
    player.offline.current = date
}