// ==UserScript==
// @name         Games
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://autofaucet.dutchycorp.space/games/?r=s*
// @match        https://autofaucet.dutchycorp.space/games/?id=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=dutchycorp.space
// @require      https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.11.2/moment.js
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant       window.onurlchange
// @grant        GM_addValueChangeListener
// ==/UserScript==

(function() {
    'use strict';
    Storage.prototype.setObj = function(key, obj) {
        return this.setItem(key, JSON.stringify(obj))
    }
    Storage.prototype.getObj = function(key,def=null) {
        if(this.getItem(key)&&JSON.parse(this.getItem(key)).length>0){
            return JSON.parse(this.getItem(key))
        }else{
            return def
        }
    }
    var count,ids;
    var least=5
    ids = localStorage.getObj('ids',[])||GM_getValue('ids',[])
    function waitForKeyElements(t, o, e, i, n) {
        void 0 === e && (e = !0), void 0 === i && (i = 300), void 0 === n && (n = -1);
        var r = "function" == typeof t ? t() : document.querySelectorAll(t),
            u = r && 0 < r.length;
        u && r.forEach(function(t) {
            var e = "data-userscript-alreadyFound";
            t.getAttribute(e) || !1 || (o(t) ? u = !1 : t.setAttribute(e, !0))
        }), 0 === n || u && e || (--n, setTimeout(function() {
            waitForKeyElements(t, o, e, i, n)
        }, i))
    }
    function newgame(useid=null){
        if(useid){
            window.location=`https://autofaucet.dutchycorp.space/games/?id=${useid}&r=s`
        }
        else if(localStorage.getObj('ids',[]).length||GM_getValue('ids',[]).length>=least){
            console.info( "count reset");
            sessionStorage.setItem('count',0);
            localStorage.setItem('count',0)
            GM_setValue('count',0)
            ids = localStorage.getObj('ids',[])||GM_getValue('ids',[])
            let id = ids.splice(0,1)[0]
            console.log(ids.length,ids)
            GM_deleteValue('ids')
            GM_setValue('ids',ids)
            localStorage.setObj('ids',ids)
            GM_setValue('lastid',id)
            localStorage.setItem('lastid',id)
            window.location=`https://autofaucet.dutchycorp.space/games/?id=${id}&r=s`
        }
        else{
            window.location='https://autofaucet.dutchycorp.space/games'
        }
    };
    function getRand(max=1083,force=false){
        var nums =localStorage.getObj('nums',[])||GM_getValue('nums',[])
        console.log('nums',nums.length)
        if(nums.length<2||force){
            let rand=Array.from({length:max},(v,k)=>k+1)
            GM_setValue('nums',rand);
            localStorage.setObj('nums',rand)
            nums =localStorage.getObj('num')||GM_getValue('nums')
        }
        let num = nums.splice(0,1)
        GM_setValue('nums',nums)
        localStorage.setObj('nums',nums)
        return num
    };
    let title = document.title
    var timer = (x) => {
        if (x == 0){
            window.location.reload(true)
            return
        };
        //let gamelement=document.querySelector("#product_data  div.left.col.s12.m6.l5  h5")
        //let gamename = gamelement&&gamelement.innerText
        document.title = `${x}(${sessionStorage.getItem('count')||localStorage.getItem('count')||GM_getValue(count)})-Game`//${gamename}`
        return setTimeout(() => {
            timer(--x)
        }, 1000)
    }
    if(/.*autofaucet.dutchycorp.space\/games\/\?r=s$/i.test(window.location.href)){
        console.log((GM_getValue('moment')))
        function getgames(){
            //alert()
            function getid(){
                var gamesid =document.querySelectorAll("#methods > a");
                ids = []
                for (let i = 0; i < gamesid.length; i++) {
                    let id = gamesid[i].href.replace(/.*=/,'');
                    ids.push(id)
                }
                console.log(ids)
                GM_setValue('ids',ids)
                localStorage.setObj('ids',ids)
                newgame()
            }
            let check = setInterval(()=>{
                if(document.querySelector("#product_data")){
                    clearInterval(check)
                    let force=true;
                    if(ids.length<=least||force){
                        let next = getRand(1083,force)[0]
                        GM_setValue('next',next)
                        ProductHandler('all','all',next,0)
                        setTimeout(getid,2000)
                    }
                    else{
                        //newgame(GM_getValue('lastid',null))
                    }
                }
                console.log('check')
            },9995)
            //}
            }
        if (window.attachEvent)
        {window.attachEvent('onload', getgames);}
        else if (window.addEventListener)
        {window.addEventListener('load', getgames, false);}
        else
        {document.addEventListener('load', getgames, false);}
    }
    else{
        if (window.performance) {
            console.info("window.performance works fine on this browser");
        }
        console.info(performance.navigation.type);
        if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
            console.info( "This page is reloaded" );
            count=parseInt(localStorage.getItem('count')||sessionStorage.getItem('count'))
            console.log(count)
            //console.log(document.querySelector("#final_claim_btn"))
            setTimeout(()=>{
                sessionStorage.setItem('count',parseInt(sessionStorage.getItem('count'))+1)
                localStorage.setItem('count',parseInt(localStorage.getItem('count'))+1)
                GM_setValue('count',sessionStorage.getItem('count')||localStorage.getItem('count'))
                count=parseInt(localStorage.getItem('count')||sessionStorage.getItem('count'))
                if(/undefined/ig.test(window.location.href)){
                    newgame()
                }
                waitForKeyElements('#toast-container', (element) => {
                    //alert(element.innerText)
                    if(count>=least){
                        newgame()
                    }
                    else if(/You already earned at least.+times on this game today/ig.test(element.innerText)){
                        newgame()
                    }
                },false);
                document.querySelector("#final_claim_btn").click()
            },1000)
            console.log('claim')
        }
        else {
            console.info( "This page is not reloaded");
            if(parseInt(localStorage.getItem('count')||GM_getValue('count',0))>=least-1){
                sessionStorage.setItem('count',0)
                localStorage.setItem('count',0)
            }
            else{
                sessionStorage.setItem('count',localStorage.getItem('count')||GM_getValue('count',0))
            }
        }

        timer(57)
    }

})();
