function degToRad(value){
    return new Decimal(value).div(180).mul(Math.PI)
}

function conjugate(Re1, Im1){
    return {Re: new Decimal(Re1), Im: new Decimal(Im1).mul(-1)}
}

function complexAdd(Re1, Im1, Re2, Im2){
    Re1 = new Decimal(Re1)
    Im1 = new Decimal(Im1)
    Re2 = new Decimal(Re2)
    Im2 = new Decimal(Im2)
    return {Re: Re1.add(Re2), Im: Im1.add(Im2)}
}

function complexSub(Re1, Im1, Re2, Im2){
    Re1 = new Decimal(Re1)
    Im1 = new Decimal(Im1)
    Re2 = new Decimal(Re2)
    Im2 = new Decimal(Im2)
    return {Re: Re1.sub(Re2), Im: Im1.sub(Im2)}
}

function complexMul(Re1, Im1, Re2, Im2){
    Re1 = new Decimal(Re1)
    Im1 = new Decimal(Im1)
    Re2 = new Decimal(Re2)
    Im2 = new Decimal(Im2)
    return {Re: Re1.mul(Re2).sub(Im1.mul(Im2)), Im: Re1.mul(Im2).add(Re2.mul(Im1))}
}

function complexDiv(Re1, Im1, Re2, Im2){
    Re1 = new Decimal(Re1)
    Im1 = new Decimal(Im1)
    Re2 = new Decimal(Re2)
    Im2 = new Decimal(Im2)
    let divider = Re2.pow(2).add(Im2.pow(2))
    let output = complexMul(Re1, Im1, Re2, Im2.mul(-1))
    return {Re: output.Re.div(divider), Im: output.Im.div(divider)}
}

/*
function complexPow(Re1, Im1, Pow){
    Re1 = new Decimal(Re1)
    Im1 = new Decimal(Im1)
    Pow = new Decimal(Pow)

    return {Re: output.Re.div(divider), Im: output.Im.div(divider)}
}
*/