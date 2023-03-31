var diff = 0;
var date = Date.now();
var player

const MAINS = {
    numberDisplay(){
        let ret = ""
        let ret2 = ""
        let x
        // base resource
        ret += complexDisplay(player.number.Re, player.number.Im, 2, 4, true, false)

        // prestige resource
        //if (tmp.pres.mil_reached[0]) ret += "+" + complexDisplay(player.prestige.Re, player.prestige.Im, 0, 0, true, true) + "<text class='red'>p</text>"

        return ret
    },
    baseProd(){
        let Re = degToRad(tmp.currAngle).cos().pow(2)
        let Im = degToRad(tmp.currAngle).sin().pow(2)
        return {Re: Re, Im: Im}
    },
    numberMulti(){
        let mult = E(1)
        if (player.mainUpgs[9].gte(1)) mult = mult.mul(tmp.mainUpgs[9].eff)
        return mult
    },
    currProd(){
        let prod = this.baseProd()

        prod.Re = prod.Re.mul(tmp.numberMutli)
        prod.Im = prod.Im.mul(tmp.numberMutli)

        if (player.mainUpgs[0].gte(1)) prod.Re = prod.Re.mul(tmp.mainUpgs[0].eff)
        if (player.mainUpgs[4].gte(1)) prod.Re = prod.Re.mul(tmp.mainUpgs[4].eff)
        if (player.mainUpgs[5].gte(1)) prod.Re = prod.Re.mul(tmp.mainUpgs[5].eff)
        if (player.mainUpgs[7].gte(1)) prod.Re = prod.Re.mul(tmp.mainUpgs[7].eff)
        if (player.mainUpgs[11].gte(1)) prod.Re = prod.Re.mul(4) 

        if (player.mainUpgs[2].gte(1)) prod.Im = prod.Im.mul(tmp.mainUpgs[2].eff)
        if (player.mainUpgs[3].gte(1)) prod.Im = prod.Im.mul(tmp.mainUpgs[3].eff)
        if (player.mainUpgs[8].gte(1)) prod.Im = prod.Im.mul(tmp.mainUpgs[8].eff)
        if (player.mainUpgs[11].gte(1)) prod.Im = prod.Im.mul(tmp.mainUpgs[11].eff)

        return prod
    },
}

function complexDisplay(Re, Im, RePrec=2, ImPrec=4, zeroDisplay=true, bracket=false){
    let x = ""
    Re = E(Re)
    Im = E(Im)
    if (Re.neq(0)){
        if (Im.neq(0)){
            x = format(Re, RePrec) + "+" + format(Im, ImPrec) + "i"
            if (bracket) x = "(" + x + ")"
            return x
        } else {
            return format(Re, RePrec)
        }
    } else {
        if (Im.neq(0)){
            return format(Im, ImPrec) + "i"
        } else {
            return (zeroDisplay?format(0, RePrec):"")
        }
    }
}

function baseProductionDisplay(){
    let ret = format(tmp.baseNumberProduction.Re,4)
    if (tmp.baseNumberProduction.Im.neq(0)){
        if (tmp.baseNumberProduction.Im.lt(0)) ret = ret + format(tmp.baseNumberProduction.Im,4) + "i"
        else ret = ret + "+" + format(tmp.baseNumberProduction.Im,4) + "i"
    }
    return ret
}

function productionDisplay(){
    let ret = format(tmp.numberProduction.Re)
    if (tmp.numberProduction.Im.neq(0)){
        if (tmp.numberProduction.Im.lt(0)) ret = ret + format(tmp.numberProduction.Im,4) + "i"
        else ret = ret + "+" + format(tmp.numberProduction.Im,4) + "i"
    }
    ret += "/s"
    return "(" + ret + ")"
}

function resetNumber(){
    player.number = {
        Re: E(0),
        Im: E(0)
    }
}

function capitalFirst(str) {
	if (str=="" || str==" ") return str
	return str
		.split(" ")
		.map(x => x[0].toUpperCase() + x.slice(1))
		.join(" ");
}