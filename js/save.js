function E(x){return new Decimal(x)};

function getPlayerData() {
    let s = {
        pause: false,
        number: {
            Re: new Decimal(0),
            Im: new Decimal(0),
        },
        mainUpgs: {
            
        },
        recordRUpg2: new Decimal(0),
        customAngleInput: "-1",
        prestige: {
            Re: new Decimal(0),
            Im: new Decimal(0),
        },
        offline: {
            active: true,
            current: Date.now(),
            time: 0,
        },
    }
    for (let x = 0; x < UPGS.number.ids.length; x++) s.mainUpgs[x] = E(0)
    return s
}

function wipe(reload=false) {
    if (reload) {
        wipe()
        save()
        resetTemp()
        loadGame(false)
    }
    else player = getPlayerData()
}

function loadPlayer(load) {
    const DATA = getPlayerData()
    player = deepNaN(load, DATA)
    player = deepUndefinedAndDecimal(player, DATA)
    convertStringToDecimal()

    let off_time = (Date.now() - player.offline.current)/1000
    if (off_time >= 60 && player.offline.active && !player.pause) player.offline.time += off_time
}

function deepNaN(obj, data) {
    for (let x = 0; x < Object.keys(obj).length; x++) {
        let k = Object.keys(obj)[x]
        if (typeof obj[k] == 'string') {
            if (data[k] == null || data[k] == undefined ? false : Object.getPrototypeOf(data[k]).constructor.name == "Decimal") if (isNaN(E(obj[k]).mag)) obj[k] = data[k]
        } else {
            if (typeof obj[k] != 'object' && isNaN(obj[k])) obj[k] = data[k]
            if (typeof obj[k] == 'object' && data[k] && obj[k] != null) obj[k] = deepNaN(obj[k], data[k])
        }
    }
    return obj
}

function deepUndefinedAndDecimal(obj, data) {
    if (obj == null) return data
    for (let x = 0; x < Object.keys(data).length; x++) {
        let k = Object.keys(data)[x]
        if (obj[k] === null) continue
        if (obj[k] === undefined) obj[k] = data[k]
        else {
            if (Object.getPrototypeOf(data[k]).constructor.name == "Decimal") obj[k] = E(obj[k])
            else if (typeof obj[k] == 'object') deepUndefinedAndDecimal(obj[k], data[k])
        }
    }
    return obj
}

function convertStringToDecimal() {
    for (let x = 0; x < UPGS.number.ids.length; x++) player.mainUpgs[x] = E(player.mainUpgs[x]||0)
}

function save(){
    let str = btoa(JSON.stringify(player))
    if (localStorage.getItem("ReImNumberGame") == '') wipe()
    localStorage.setItem("ReImNumberGame",str)
    tmp.prevSave = localStorage.getItem("ReImNumberGame")
}

function load(x){
    if(typeof x == "string" & x != ''){
        loadPlayer(JSON.parse(atob(x)))
    } else {
        wipe()
    }
}

function exportData() {
    let str = btoa(JSON.stringify(player))

    let copyText = document.getElementById('copy')
    copyText.value = str
    copyText.style.visibility = "visible"
    copyText.select();
    document.execCommand("copy");
    copyText.style.visibility = "hidden"
}

function importData() {
    let loadgame = prompt("Paste in your save WARNING: WILL OVERWRITE YOUR CURRENT SAVE")
    if (loadgame != null) {
        load(loadgame)
        location.reload()
    }
}

function loadGame(start=true) {
    wipe()
    load(localStorage.getItem("ReImNumberGame"))
    setupHTML()
    if (start) {
        document.getElementById('custom_angle_input').value = player.customAngleInput
        document.getElementById('custom_angle_input').addEventListener('input', e=>{
            player.customAngleInput = e.target.value
        })
        setInterval(loop, 50)
        setInterval(save,10000)
        for (let x = 0; x < 5; x++) updateTemp()
    }
}