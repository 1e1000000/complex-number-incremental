const TABS = {
    choose(x, stab=false) {
        if (!stab) {
            tmp.tab = x
        }
        else {
            tmp.stab[tmp.tab] = x
        }
    },
    1: [
        { id: "Main" },
        { id: "Stats" },
        { id: "Options" },
        { id: "Prestige", unl() { return tmp.pres.mil_reached[0] }, style: "prestige1"},
    ],
    2: {
        0: [
            { id: "Main" },
            { id: "Milestones" },
            { id: "Custom Angle", unl() {return tmp.pres.mil_reached[0]} },
        ],
        1: [
            { id: "Main" },
        ],
        3: [
            { id: "Main" },
        ],
    },
}