// ==UserScript==
// @name         DutchyCorp(YourBalance)
// @namespace    Acot
// @version      0.1
// @description  Scroll to Coin to withdraw
// @author       Acot
// @include      *autofaucet.dutchycorp.space/account.php*
// @updateURL    https://github.com/Acotec/dutchycorp_meta/raw/master/DutchyCorp(YourBalance).user.js
// @downloadURL  https://github.com/Acotec/dutchycorp_meta/raw/master/DutchyCorp(YourBalance).user.js
//// @require    https://github.com/Acotec/dutchycorp_script/raw/master/DutchyCorp(YourBalance).user.js
// @match        https://autofaucet.dutchycorp.space/your_balance.php
// @icon         https://www.google.com/s2/favicons?sz=64&domain=dutchycorp.space
// @grant        none
// ==/UserScript==
(function(){
    'use strict';
    let coin_code = 'USDT'
    let id = '#withdraw_'+coin_code
    function waitForKeyElements(t,o,e,i,n){void 0===e&&(e=!0),void 0===i&&(i=300),void 0===n&&(n=-1);var r="function"==typeof t?t():document.querySelectorAll(t),u=r&&0<r.length;u&&r.forEach(function(t){var e="data-userscript-alreadyFound";t.getAttribute(e)||!1||(o(t)?u=!1:t.setAttribute(e,!0))}),0===n||u&&e||(--n,setTimeout(function(){waitForKeyElements(t,o,e,i,n)},i))}
    waitForKeyElements(id, (element) => {
        element.scrollIntoView();
    });
    waitForKeyElements('#withdraw-btn-USDT', (element) => {
        element.scrollIntoView();
        element.click()
    });
    //document.querySelector("#withdraw_USDT").scrollIntoView();
})();
