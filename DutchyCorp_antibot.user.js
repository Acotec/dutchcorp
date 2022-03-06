// ==UserScript==
// @name         DutchyCorp_antibot
// @namespace    Acot
// @version      0.1
// @description  Solve the antibot on dutchyCorp
// @author       Acot
// @updateURL    https://github.com/Acotec/dutchycorp_meta/raw/master/DutchyCorp_antibot.user.js
// @downloadURL  https://github.com/Acotec/dutchycorp_meta/raw/master/DutchyCorp_antibot.user.js
//// @require      https://github.com/Acotec/dutchycorp_script/raw/master/DutchyCorp_antibot.user.js
// @include      https://autofaucet.dutchycorp.space/shortlinks-wall.php*
//// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @icon         https://www.google.com/s2/favicons?domain=dutchycorp.space
// @grant        none
// ==/UserScript==

(function() {
    var antibotid;
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
    var evt = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: 20,
        /* whatever properties you want to give it */
    })
    function clickOnEle(el){
        var simulateMouseEvent = function(element, eventName, coordX, coordY) {
            element.dispatchEvent(new MouseEvent(eventName, {
                //view: window,
                bubbles: true,
                cancelable: true,
                clientX: coordX,
                clientY: coordY,
                button: 0
            }));
        };
        var theButton = el;
        var box = theButton.getBoundingClientRect(),
            coordX = box.left + (box.right - box.left) / 2,
            coordY = box.top + (box.bottom - box.top) / 2;
        simulateMouseEvent (theButton, "mousedown", coordX, coordY);
        simulateMouseEvent (theButton, "mouseup", coordX, coordY);
        simulateMouseEvent (theButton, "click", coordX, coordY);
    }
    var antibot= setInterval(isantibotvisible,2000)
    function isantibotvisible(){
        try{
            let visible =document.getElementsByClassName("modal open")[0].style.display == "block"
            let antibotid=document.getElementsByClassName("modal open")[0].id
            console.log('waiting for antibotFrame')
            if(visible){
                clearInterval(antibot)
                //alert('anti')
                setTimeout(()=>{
                    let icon=Array.from(document.querySelector("#"+antibotid).getElementsByClassName("gradient-btn btn btn-secondary"))
                    icon.forEach(img=>{
                        let select =document.querySelector("#"+antibotid).innerText.replace(/[\W]/g,"").replace(/.*Select|Gosend/ig,'').trim();
                        let icselect = img.getElementsByTagName('input')[0].value.replace(/[\W]/ig,"").trim();
                        console.log(icselect,select)
                        if(select == icselect){
                            console.log("Antibot to select is - ",select)
                            //waitForKeyElements(".waves-ripple", (element) =>{alert("OPEN")});
                            console.log(img.getElementsByTagName('input')[0],"clicked");
                            setTimeout(()=>{clickOnEle(img.getElementsByTagName('input')[0])},1000)
                            setTimeout(()=>{clickOnEle(document.querySelector("#"+antibotid).querySelector('button'))},1000)
                            setTimeout(()=>{window.location.reload()},2000)
                        }
                    })
                },1000)
            };
        }catch(e){}
    }

})();