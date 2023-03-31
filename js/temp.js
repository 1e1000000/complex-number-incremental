var tmp = {}

function resetTemp(){
    let d = new Date()
    keep = [tmp.el, tmp.prevSave]

    tmp = {
        tab: 0,
        stab: [],
        mainUpgs: [],
        currAngle: E(0),
        pres: {
            mil_reached: [],
        },
        
        april: d.getDate() == 1 && d.getMonth() == 3,
        aprilEnabled: false,
    }

    for (let x = 0; x < UPGS.number.ids.length; x++) tmp.mainUpgs[x] = {}
    for (let x = 0; x < TABS[1].length; x++) tmp.stab.push(0)

    tmp.el = keep[0]
    tmp.prevSave = keep[1]
}

resetTemp() // idk why everything breaks without resetting Temp

function updateMainTemp(){
    tmp.numberDisplay = MAINS.numberDisplay()
    tmp.baseNumberProduction = MAINS.baseProd()
    tmp.numberMutli = MAINS.numberMulti()
    tmp.numberProduction = MAINS.currProd()
    tmp.baseProductionDisplay = baseProductionDisplay()
    tmp.productionDisplay = productionDisplay()
}

function updateTemp(){
    tmp.offlineActive = player.offline.time > 1
    tmp.offlineMult = tmp.offlineActive?player.offline.time+1:1

    updatePrestigeTemp()

    updateUpgsTemp()
    updateMainTemp()
}