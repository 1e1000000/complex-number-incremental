var diff = 0;
var date = Date.now();
var player

const MAINS = {
    numberDisplay(){
        let ret = format(player.number.Re)
        let ret2 = ""
        let x
        let y
        // base resource
        x = player.number.Im
        if (x.neq(0)){
            if (x.lt(0)) ret = ret + format(x,4) + "i"
            else ret = ret + "+" + format(x,4) + "i"
        }
        // prestige resource
        x = player.prestige.Re
        y = player.prestige.Im
        if (x.neq(0)){
            if (y.neq(0)){ // complex number
                if (y.lt(0)) ret2 = format(x,0) + format(y,0) + "i"
                else ret2 = format(x,0) + "+" + format(y,0) + "i"
                ret += "+(" + ret2 + ")p"
            } else { // real number
                if (x.lt(0)) ret = ret + format(x,0) + "p"
                else ret = ret + "+" + format(x,0) + "p"
            }
        } else {
            if (y.neq(0)){ // pure imaginary number
                if (y.lt(0)) ret = ret + format(y,0) + "ip"
                else ret = ret + "+" + format(y,0) + "ip"
            } else { // zero number

            }
        }
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