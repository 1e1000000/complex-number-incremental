const UPGS = {
    number: {
        temp() {
            for (let x = 0; x < this.ids.length; x++) {
                let d = tmp.mainUpgs
                let data = this.ids[x]
                d[x].cost = data.cost(player.mainUpgs[x])
                d[x].costIm = data.costIm
                d[x].bulk = data.bulk().min(data.maxLvl||1/0)
                d[x].bonus = this.ids[x].bonus?this.ids[x].bonus():E(0)
                d[x].can = player.number[d[x].costIm?"Im":"Re"].gte(d[x].cost) && player.mainUpgs[x].lt(UPGS.number.ids[x].maxLvl||1/0)

                d[x].eff = this.ids[x].effect(player.mainUpgs[x]||E(0))
                d[x].effDesc = this.ids[x].effDesc(d[x].eff)
            }
        },
        buy(x, manual=false) {
            let cost = tmp.mainUpgs[x].cost
            let currency = tmp.mainUpgs[x].costIm?"Im":"Re"

            if (tmp.mainUpgs[x].can) {
                player.number[currency] = player.number[currency].sub(cost)
                if (!player.mainUpgs[x]) player.mainUpgs[x] = E(0)
                player.mainUpgs[x] = player.mainUpgs[x].add(1)
            }
        },
        buyMax(x) {
            let currency = tmp.mainUpgs[x].costIm?"Im":"Re"
            if (tmp.mainUpgs[x].can) {
                player.number[currency] = player.number[currency].sub(this.ids[x].cost(tmp.mainUpgs[x].bulk.sub(1))).max(0)
                player.mainUpgs[x] = player.mainUpgs[x].max(tmp.md.upgs[x].bulk)
            }
        },
        ids: [
            {
                unl() {return true},
                desc: `+1x to Real part of production`,
                costIm: false,
                cost(x) { return E(1.5).pow(x).mul(5) },
                bulk() {
                    if (player.number.Re.gte(5)) {
                        return player.number.Re.div(5).max(1).log(1.5).add(1).floor()
                    } else return E(0)
                },
                effect(x) {
                    let ret = E(1).mul(x).add(1)
                    if (player.mainUpgs[6].gte(1)) ret = ret.pow(1.5)
                    return ret
                },
                effDesc(x) { return format(x,1) + "x"},
            },
            {
                unl() {return true},
                desc: `Add 1° to base formula`,
                costIm: false,
                maxLvl: E(45),
                cost(x) {
                    if (x.lte(5)) return E(10).pow(x).mul(1000)
                    else if (x.lte(45)) return E(1e5).pow(x.div(5).root(1.2)).mul(1000)
                    else return E(1/0)
                },
                bulk() {
                    if (player.number.Re.gte(1000)) {
                        if (player.number.Re.gte(1e8) && player.mainUpgs[1].gte(5)) return player.number.Re.div(1000).max(1).log(1e5).pow(1.2).mul(5).add(1).floor().min(45)
                        return player.number.Re.div(1000).max(1).log(10).add(1).floor().min(5)
                    } else return E(0)
                },
                effect(x) {
                    return E(1).mul(x)
                },
                effDesc(x) { return format(x,0) + "°"},
            },
            {
                unl() {return true},
                desc: `+0.5x to Imaginary part of production`,
                costIm: false,
                cost(x) { return E(4).pow(x).mul(1e7) },
                bulk() {
                    if (player.number.Re.gte(1e7)) {
                        return player.number.Re.div(1e7).max(1).log(4).add(1).floor()
                    } else return E(0)
                },
                effect(x) {
                    let ret = E(0.5).mul(x).add(1)
                    if (player.mainUpgs[10].gte(1)) ret = ret.pow(2)
                    return ret
                },
                effDesc(x) { return format(x,1) + "x"},
            },
            {
                unl() {return true},
                desc: `Im multiply Im production`,
                costIm: false,
                cost(x) { return E(1000).pow(x.pow(1.5)).mul(1e19) },
                bulk() {
                    if (player.number.Re.gte(1e19)) {
                        return player.number.Re.div(1e19).max(1).log(1000).root(1.5).add(1).floor()
                    } else return E(0)
                },
                effect(x) {
                    return player.number.Im.add(10).max(10).log(10).pow(x.pow(0.75))
                },
                effDesc(x) { return format(x,2) + "x"},
            },
            {
                unl() {return true},
                desc: `Im multiply Re production`,
                costIm: true,
                maxLvl: E(1),
                cost(x) { return E(0.01) },
                bulk() {
                    if (player.number.Im.gte(0.01)) {
                        return E(1)
                    } else return E(0)
                },
                effect(x) {
                    let i = player.number.Im.max(0)
                    let e = E(1024)
                    if (i.gte(1e-3)) e = e.div(E(4).pow(i.log10().add(3).div(0.75).min(4))) // 4
                    if (i.gte(1)) e = e.div(i.root(4).min(2)) // 2
                    let ret = i.add(1).pow(e)
                    if (ret.gte(1e16)) ret = E(10).pow(ret.log10().div(16).pow(0.75).mul(16))
                    return ret
                },
                effDesc(x) { return format(x) + "x" + (x.gte(1e16)?" (softcapped)":"")},
            },
            {
                unl() {return true},
                desc: `Re multiply Re production`,
                costIm: true,
                maxLvl: E(1),
                cost(x) { return E(0.1) },
                bulk() {
                    if (player.number.Im.gte(0.1)) {
                        return E(1)
                    } else return E(0)
                },
                effect(x) {
                    let ret = player.number.Re.add(2).max(2).log(2)
                    if (player.mainUpgs[10].gte(1)) ret = ret.pow(2)
                    return ret
                },
                effDesc(x) { return format(x) + "x"},
            },
            {
                unl() {return true},
                desc: `Raise rebuyable 1 effect by 1.5`,
                costIm: true,
                maxLvl: E(1),
                cost(x) { return E(1) },
                bulk() {
                    if (player.number.Im.gte(1)) {
                        return E(1)
                    } else return E(0)
                },
                effect(x) {
                    return E(1.5)
                },
                effDesc(x) { return "^" + format(x)},
            },
            {
                unl() {return true},
                desc: `For every 10 Rebuyable 1 level, double Re production`,
                costIm: true,
                maxLvl: E(1),
                cost(x) { return E(10) },
                bulk() {
                    if (player.number.Im.gte(10)) {
                        return E(1)
                    } else return E(0)
                },
                boosts(){
                    let amt = player.mainUpgs[0]
                    let boost = amt.div(10).add(1e-10).floor()
                    if (amt.gte(100)) {
                        amt = amt.sub(100).mul(2).add(100)
                        boost = amt.pow(0.5).add(1e-10).floor()
                    }
                    return boost
                },
                effect(x) {
                    let b = E(2)
                    return b.pow(UPGS.number.ids[7].boosts())
                },
                next(){
                    let x = UPGS.number.ids[7].boosts()
                    let next = x.add(1).mul(10).sub(1e-10).ceil()
                    if (x.gte(10)) next = x.add(1).div(10).pow(2).sub(1).mul(50).add(100).sub(1e-10).ceil()
                    return next
                },
                effDesc(x) { return format(x,0) + "x<br>Next x2 at Level " + format(UPGS.number.ids[7].next(),0) + (UPGS.number.ids[7].boosts().gte(10)?" (scaled)":"")},
            },
            {
                unl() {return true},
                desc: `Re multiply Im production`,
                costIm: true,
                maxLvl: E(1),
                cost(x) { return E(50) },
                bulk() {
                    if (player.number.Im.gte(50)) {
                        return E(1)
                    } else return E(0)
                },
                effect(x) {
                    return player.number.Re.add(10).max(10).log(10).pow(0.5)
                },
                effDesc(x) { return format(x) + "x"},
            },
            {
                unl() {return true},
                desc: `Rebuyable 2 level multiply Number production`,
                costIm: true,
                maxLvl: E(1),
                cost(x) { return E(500) },
                bulk() {
                    if (player.number.Im.gte(500)) {
                        return E(1)
                    } else return E(0)
                },
                effect(x) {
                    return player.mainUpgs[1].add(1).pow(0.5)
                },
                effDesc(x) { return format(x) + "x"},
            },
            {
                unl() {return true},
                desc: `Raise rebuyable 3 and one-time upgrade 2 effect by 2`,
                costIm: true,
                maxLvl: E(1),
                cost(x) { return E(5e4) },
                bulk() {
                    if (player.number.Im.gte(5e4)) {
                        return E(1)
                    } else return E(0)
                },
                effect(x) {
                    return E(2)
                },
                effDesc(x) { return "^" + format(x)},
            },
            {
                unl() {return true},
                desc: `For every 10 Rebuyable 3 level, double Im production, also quadruple Re production`,
                costIm: true,
                maxLvl: E(1),
                cost(x) { return E(5e8) },
                bulk() {
                    if (player.number.Im.gte(5e8)) {
                        return E(1)
                    } else return E(0)
                },
                boosts(){
                    let amt = player.mainUpgs[2]
                    let boost = amt.div(10).add(1e-10).floor()
                    if (amt.gte(100)) {
                        amt = amt.sub(100).mul(2).add(100)
                        boost = amt.pow(0.5).add(1e-10).floor()
                    }
                    return boost
                },
                effect(x) {
                    let b = E(2)
                    return b.pow(UPGS.number.ids[11].boosts())
                },
                next(){
                    let x = UPGS.number.ids[11].boosts()
                    let next = x.add(1).mul(10).sub(1e-10).ceil()
                    if (x.gte(10)) next = x.add(1).div(10).pow(2).sub(1).mul(50).add(100).sub(1e-10).ceil()
                    return next
                },
                effDesc(x) { return format(x,0) + "x<br>Next x2 at Level " + format(UPGS.number.ids[11].next(),0) + (UPGS.number.ids[11].boosts().gte(10)?" (scaled)":"")},
            },
        ]
    }
}