// ==UserScript==
// @name        DutchFpAddressUpdate
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include      *autofaucet.dutchycorp.space/addresses_update.php*
// @include      *autofaucet.dutchycorp.space/account.php*
// @updateURL    https://github.com/Acotec/dutchycorp_meta/raw/root/DutchFpAddressUpdate.user.js
// @downloadURL  https://github.com/Acotec/dutchycorp_meta/raw/root/DutchFpAddressUpdate.user.js
//// @require    https://github.com/Acotec/dutchycorp_script/raw/root/DutchFpAddressUpdate.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=dutchycorp.space
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// ==/UserScript==

(function() {
    'use strict';
    function waitForKeyElements(t,o,e,i,n){void 0===e&&(e=!0),void 0===i&&(i=300),void 0===n&&(n=-1);var r="function"==typeof t?t():document.querySelectorAll(t),u=r&&0<r.length;u&&r.forEach(function(t){var e="data-userscript-alreadyFound";t.getAttribute(e)||!1||(o(t)?u=!1:t.setAttribute(e,!0))}),0===n||u&&e||(--n,setTimeout(function(){waitForKeyElements(t,o,e,i,n)},i))}
    function getEmail(){
        window.location.href="https://autofaucet.dutchycorp.space/account.php"
    }
    function updateFpAddress(element){
        let email = GM_getValue('email','')
        if(email){
            element.querySelector('input').value=email
            GM_deleteValue('email')
            document.querySelector("#addresses_form > div:nth-child(91) > center > button").click()
        }
        else{
            getEmail()
        }
    }
    if(/addresses_update.php/ig.test(window.location)){
        //alert('update')
        let i=0
        console.log(i)
        let check = setInterval(()=>{
            let email = document.querySelector("#addresses_form > div:nth-child(3)").querySelector('input').value
            if(email){
                GM_deleteValue('email')
                clearInterval(check)
            }else{
                updateFpAddress( document.querySelector("#addresses_form > div:nth-child(3)"))
                clearInterval(check)
            }
            if(i>=30){
                clearInterval(check)
            }
            i++
        },1000)
        }
    if(/account.php.*/ig.test(window.location)){
        let email=document.querySelector("#methods > form > font > form:nth-child(10) > div:nth-child(1) > input").value
        GM_setValue('email',email)
        window.location.href="https://autofaucet.dutchycorp.space/addresses_update.php"
    }
    //document.querySelector("#addresses_form > div:nth-child(3)")
})();