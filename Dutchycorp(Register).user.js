// ==UserScript==
// @name         Dutchycorp(Register)
// @namespace    Acot
// @version      0.1
// @description  Fill in details on Register page
// @author       Acot
// @updateURL    https://github.com/Acotec/dutchycorp_meta/raw/master/Dutchycorp(Register).user.js
// @downloadURL  https://github.com/Acotec/dutchycorp_meta/raw/master/Dutchycorp(Register).user.js
//// @require      https://github.com/Acotec/dutchycorp_script/raw/master/Dutchycorp(Register).user.js
// @match        https://autofaucet.dutchycorp.space/?r=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=dutchycorp.space
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    function capitalizeFirstLetter(string){return string[0].toUpperCase() + string.slice(1).toLowerCase();};
    const crypt = (salt, text) => {
        const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
        const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
        const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);

        return text
            .split("")
            .map(textToChars)
            .map(applySaltToChar)
            .map(byteHex)
            .join("");
    };
    const decrypt = (salt, encoded) => {
        const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
        const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
        return encoded
            .match(/.{1,2}/g)
            .map((hex) => parseInt(hex, 16))
            .map(applySaltToChar)
            .map((charCode) => String.fromCharCode(charCode))
            .join("");
    };
    function generatepass(df_ps){
        let ps=df_ps
        let ps_num =ps.length
        let key = window.location.host
        let crypt_ps = crypt(key,ps)
        let decrypt_ps =decrypt(key,crypt_ps)
        let bycrypt_ps = btoa(crypt_ps)+crypt_ps
        let gen = bycrypt_ps.replace(/=|\d/ig,'').substring(0,8)+crypt_ps.substr(-7)
        console.log(ps,crypt_ps,decrypt_ps,bycrypt_ps,gen)
        gen = capitalizeFirstLetter(gen.substring(4,))
        if(gen.length<8){gen=capitalizeFirstLetter(gen)}
        if(!/\w/ig.test(gen)){gen=capitalizeFirstLetter(gen+'Acot')}
        if(!/\d/ig.test(gen)){gen=capitalizeFirstLetter(gen+81186815)}
        return gen
    }
    var can_continue=window.confirm(`HAVE YOU CHANGE YOUR IP?\nYES(OK)--NO(Cancel).\n\n(Don't click(OK) if you have not change your IP!).\nElse you will lose your refferer.`);
    if(can_continue){
        //if (confirm("ARE YOU SURE YOU HAVE CHANGE YOUR IP?\nYES(ok)     NO(Cancel)")){null}else{alert("CHANGE YOUR IP");throw Error};
        let form = Array.from(document.querySelectorAll(".form-group")),
            un = prompt("Please enter the "+atob('VVNFUk5BTUU=')+" you want to use", ""),
            em = prompt("Please enter the "+atob('RU1BSUw=')+" you want to use", ""),
            //ps = prompt("Please enter the "+atob('UEFTU1dPUkQ=')+" you want to use",""),
            ps="",
            d=[];
        if(!(un==null||un=="")){form.filter(u=>{if(u.querySelector('input').type==atob('dGV4dA==')){u.querySelector('input').value=un}});}
        if(!(em==null ||em=="")){form.filter(e=>{if(e.querySelector('input').type==atob('ZW1haWw=')){e.querySelector('input').value=em}});}
        if(!(ps==null||ps=="")){form.filter(a =>{if(a.querySelector('input').type==atob('cGFzc3dvcmQ=')){
            ps = generatepass(ps)
            console.log(ps)
            a.value=ps
        }})
                               }
        else{
            form.filter(a =>{if(a.querySelector('input').type==atob('cGFzc3dvcmQ=')){d.push(a.querySelector('input'))}})
            ps = generatepass(un)
            console.log(ps)
            d.forEach(p =>{
                p.value=ps//atob('QEF1dG9mYXVjZXRtZWluNzc=')
            })
        }
    } else {
        alert("CHANGE YOUR IP")
    }
})();