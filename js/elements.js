function setupHTML() {
	let tabs = new Element("tabs")
	let stabs = new Element("stabs")
	let table = ""
	let table2 = ""
	for (let x = 0; x < TABS[1].length; x++) {
		table += `<div style="width: 130px">
			<button onclick="TABS.choose(${x})" class="btn_tab" id="tab${x}">${TABS[1][x].id}</button>
		</div>`
		if (TABS[2][x]) {
			table2 += `<div id="stabs${x}" class="table_center">`
			for (let y = 0; y < TABS[2][x].length; y++) {
				table2 += `<div style="width: 130px">
					<button onclick="TABS.choose(${y}, true)" class="btn_tab" id="stab${x}_${y}">${TABS[2][x][y].id}</button>
				</div>`
			}
			table2 += `</div>`
		}
	}
	tabs.setHTML(table)
	stabs.setHTML(table2)

    setupMainUpgsHTML()
	setupPrestigeHTML()

    tmp.el = {}
	let all = document.getElementsByTagName("*")
	for (let i=0;i<all.length;i++) {
		let x = all[i]
		tmp.el[x.id] = new Element(x)
	}
}

function updateUpperHTML(){
	document.getElementById("offlineTime").innerHTML = (player.pause?"WARNING: GAME IS PAUSED":player.offline.time>1?"Simulating Offline Progress, " + format(player.offline.time+1) + "x running speed":"")
    document.getElementById("number").innerHTML = tmp.numberDisplay
	document.getElementById("production").innerHTML = tmp.productionDisplay
}

function updateTabsHTML() {
	for (let x = 0; x < TABS[1].length; x++) {
		let tab = TABS[1][x]
		tmp.el["tab"+x].setDisplay(tab.unl ? tab.unl() : true)
		tmp.el["tab"+x].setClasses({btn_tab: true, [tab.style ? tab.style : "normal"]: true, choosed: x == tmp.tab})

		if (tmp.el["tab_frame"+x]) tmp.el["tab_frame"+x].setDisplay(x == tmp.tab)
		if (TABS[2][x]) {
			tmp.el["stabs"+x].setDisplay(x == tmp.tab)
			if (x == tmp.tab) for (let y = 0; y < TABS[2][x].length; y++)  {
				let stab = TABS[2][x][y]
				tmp.el["stab"+x+"_"+y].setDisplay(stab.unl ? stab.unl() : true)
				tmp.el["stab"+x+"_"+y].setClasses({btn_tab: true, [stab.style ? stab.style : "normal"]: true, choosed: y == tmp.stab[x]})
				if (tmp.el["stab_frame"+x+"_"+y]) tmp.el["stab_frame"+x+"_"+y].setDisplay(y == tmp.stab[x])
			}
		}
	}
}

function updateOptionsHTML(){
	document.getElementById("offline").innerHTML = player.offline.active?"ON":"OFF"
	document.getElementById("pause").innerHTML = player.pause?"ON":"OFF"
}

function updateHTML(){
    updateUpperHTML()
    updateTabsHTML()
    if (tmp.tab==0) {
		if (tmp.stab[0] == 0) updateMainUpgsHTML()
		if (tmp.stab[0] == 1) {
            tmp.el.RUpg2Best.setTxt(format(player.recordRUpg2,0))
            for (let x = 0; x < PRESTIGE.mils.length; x++) {
                tmp.el['pres_mil'+x].changeStyle('background-color',tmp.pres.mil_reached[x]?'#2f22':'#4442')
                tmp.el['pres_mil_goal'+x].setTxt(format(PRESTIGE.mils[x][0],0))
            }
        }
		if (tmp.stab[0] == 2){
			document.getElementById("baseProd2").innerHTML = tmp.baseProductionDisplay
			document.getElementById("custom_angle_output").innerHTML = getCustomAngleOutputText()}
	}
	if (tmp.tab==2) updateOptionsHTML()
	if (tmp.tab==3) updatePrestigeHTML()
}