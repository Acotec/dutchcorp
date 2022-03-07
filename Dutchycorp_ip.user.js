// ==UserScript==
// @name         Dutchycorp_ip
// @namespace    Acot
// @version      0.1
// @description  Reload page when dutchycorp says a user is already usin the ip
// @author       Acot
// @updateURL    https://github.com/Acotec/dutchycorp_meta/raw/master/Dutchycorp_ip.user.js
// @downloadURL  https://github.com/Acotec/dutchycorp_meta/raw/master/Dutchycorp_ip.user.js
//// @require    https://github.com/Acotec/dutchycorp_script/raw/master/Dutchycorp_ip.user.js
// @include      *autofaucet.dutchycorp.space*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    try{document.querySelector("#dropdown1 > li:nth-child(10) > a").remove()}catch(err){}//remove logout button
    if(/.*is Linked to your IP.*/ig.test(document.body.textContent)){
        window.location.reload(true)
    }
})();