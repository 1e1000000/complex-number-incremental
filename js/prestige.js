const PRESTIGE = {
    gain() {
        let x = E(10).pow(player.number.Re.log10().root(2)).div(1e6)
        if (x.lt(1)) return E(0)
        return x.floor()
    },
    enter() {
        if (tmp.pres.gain.gte(1)){
            player.prestige.Re = player.prestige.Re.add(tmp.pres.gain)

            this.doReset()
        }
    },
    doReset() {
        player.number={
            Re: E(0),
            Im: E(0)
        }
        for (let i=0;i<UPGS.number.ids.length;i++){player.mainUpgs[i]=E(0)}
    },
    customAngle(){
        let x = E(player.customAngleInput)
        if (x.lt(0)) return player.mainUpgs[1]
        else if (x.gte(player.mainUpgs[1])) return player.mainUpgs[1]
        else return x.floor()
    },
    mils: [
        [E(45), `Unlock Prestige and configurable angle for base formula, useful to increase Re production`],
        [E(50), `Not possible yet :) The end game is currently at 1e36+5e10i`],
    ],
}

function updatePrestigeTemp() {
    tmp.pres.gain = PRESTIGE.gain()
    for (let x = 0; x < PRESTIGE.mils.length; x++) tmp.pres.mil_reached[x] = player.recordRUpg2.gte(PRESTIGE.mils[x][0])
    tmp.currAngle = tmp.pres.mil_reached[0]?PRESTIGE.customAngle():player.mainUpgs[1]
}

function updatePrestigeHTML() {
    if (tmp.tab == 3) {
        if (tmp.stab[3] == 0) {
           document.getElementById("presBtn").innerHTML = "Prestige for x" + format(10,0) + " Number production"//"Prestige for " + format(tmp.pres.gain,0) + "<text class='red'>p</text>"
        }
    }
}

function setupPrestigeHTML() {
    let new_table = new Element("pres_milestones_table")
    let html = ""

    for (let x = 0; x < PRESTIGE.mils.length; x++) {
        html += `
        <div id="pres_mil${x}" style="width: 100%; margin: 5px 0px; padding: 8px 0px; background-color: #4444; font-size: 14px;">
            <h2>Level <span id="pres_mil_goal${x}">X</span> Rebuyable 2</h2><br><br>
            ${PRESTIGE.mils[x][1]}
        </div>
        `
    }
    new_table.setHTML(html)
}

function getCustomAngleOutputText(){
    let x = E(player.customAngleInput)
    let ret = format(tmp.currAngle,0) + "°"
    if (!tmp.pres.mil_reached[0]) ret += " (Custom Angle not available)"
    else if (x.lt(0)) ret += " (Updated based on Rebuyable 2 level)"
    else if (x.gt(player.mainUpgs[1])) ret += " (Capped at Rebuyable 2 level)"
    else if (x.neq(x.floor())) ret += " (Rounded down to nearest integer)"
    return ret
}