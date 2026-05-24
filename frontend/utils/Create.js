

export function makeid(){

    let Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiujklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let result = "";

    for(let i=0;i<8;i++){
     result+=Chars.charAt(Math.floor(Math.random()*Chars.length));
    }

    return result;
}