// ==UserScript==
// @name         DutchycorpPtcView
// @namespace    Acot
// @version      0.2
// @description  click Submit when countdown end, when viewing ptc
// @author       Acot
// @updateURL    https://github.com/Acotec/dutchycorp_meta/raw/root/DutchycorpPtcView.user.js
// @downloadURL  https://github.com/Acotec/dutchycorp_meta/raw/root/DutchycorpPtcView.user.js
//// @require    https://github.com/Acotec/dutchycorp_script/raw/root/DutchycorpPtcView.user.js
// @include      *autofaucet.dutchycorp.space/ptc/view.php*
// @include      *autofaucet.dutchycorp.space/ptc/index.php
// @include      *autofaucet.dutchycorp.space/ptc/
// @include      *autofaucet.dutchycorp.space/ptc
// @icon         https://www.google.com/s2/favicons?sz=64&domain=dutchycorp.space
// @grant        none
// ==/UserScript==

(function() {
    'use strict'
    let progress = setInterval(()=>{
        console.log('waiting')
        let i=0
        let style = document.querySelector("div.progress").getAttribute('style')
        if(/display: none/ig.test(style)){
            clearInterval(progress)
            document.querySelector("#ptc-submit-btn").click()
        }
        if(i>61){
            clearInterval(progress)
        }
    },1000)
    //document.querySelector("div.progress").getAttribute('style')
    //waitForKeyElements('#ptc-submit-btn',(e)=>{e.click()})
    //document.querySelector("#ptc-submit-btn").click()

    })();
