// ==UserScript==
// @name         DutchycorpPtcView
// @namespace    Acot
// @version      0.1
// @description  click Submit when countdown end, when viewing ptc
// @author       Acot
// @updateURL    https://github.com/Acotec/dutchycorp_meta/raw/master/DutchycorpPtcView.user.js
// @downloadURL  https://github.com/Acotec/dutchycorp_meta/raw/master/DutchycorpPtcView.user.js
//// @require    https://github.com/Acotec/dutchycorp_script/raw/master/DutchycorpPtcView.user.js
// @include      https://autofaucet.dutchycorp.space/ptc/view.php*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=dutchycorp.space
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
      function waitForKeyElements(t, o, e, i, n) {
        void 0 === e && (e = !0), void 0 === i && (i = 300), void 0 === n && (n = -1);
        var r = "function" == typeof t ? t() : document.querySelectorAll(t),
            u = r && 0 < r.length;
        u && r.forEach(function (t) {
            var e = "data-userscript-alreadyFound";
            t.getAttribute(e) || !1 || (o(t) ? u = !1 : t.setAttribute(e, !0))
        }), 0 === n || u && e || (--n, setTimeout(function () {
            waitForKeyElements(t, o, e, i, n)
        }, i))
    }
    waitForKeyElements('#ptc-submit-btn',(e)=>{e.click()})
    //document.querySelector("#ptc-submit-btn").click()

})();