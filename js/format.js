function format(ex, acc=2) {
    ex = E(ex)
    let a = "{sign: " + ex.sign + ", mag: " + ex.mag + ", layer: " + ex.layer + "}"
    if (tmp.aprilEnabled && Math.random() < .9) return [a,ex.toString(),ex.toExponential(Math.max(2,acc)),"","NaN","???","Troll","April Fool","Infinite"][Math.floor(Math.random()*9)]

    neg = ex.lt(0)?"-":""
    if (ex.mag == Infinity) return neg + 'Infinite'
    if (Number.isNaN(ex.mag)) return neg + 'NaN'
    if (ex.lt(0)) ex = ex.mul(-1)
    if (ex.eq(0)) return ex.toFixed(acc)
    let e = ex.log10().floor()
    let type = "sc"
    switch (type) {
        default:
        case "sc":
            if (ex.log10().lt(Math.min(-acc,0)) && acc >= 1) {
                let e = ex.log10().ceil()
                let m = ex.div(e.eq(-1)?E(0.1):E(10).pow(e))
                let be = e.mul(-1).max(1).log10().gte(6)
                return neg+(be?'':m.toFixed(2))+'e'+format(e, 0)
            } else if (e.lt(6)) {
                return neg+(e.lt(3)?ex.toFixed(acc):ex.toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'))
            } else {
                if (ex.gte("eeee10")) {
                    let slog = ex.slog()
                    return (slog.gte(1e6)?'':E(10).pow(slog.sub(slog.floor())).toFixed(4)) + "F" + format(slog.floor(), 0)
                }
                let m = ex.div(E(10).pow(e))
                let be = e.log10().gte(6)
                return neg+(be?'':m.toFixed(be?3:2))+'e'+format(e, 0)
            }
        
    }
}