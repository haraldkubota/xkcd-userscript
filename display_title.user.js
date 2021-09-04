// ==UserScript==
// @name         Display XKCD IMG title
// @namespace    https://hkubota.wordpress.com/
// @downloadURL  https://raw.githubusercontent.com/haraldkubota/xkcd-userscript/main/display_title.user.js
// @supportURL   https://hkubota.wordpress.com/2021/09/04/xkcd-userscript/
// @version      0.2
// @description  Show the IMG title and Explain XKCD Link
// @author       Harald Kubota
// @match        http*://*xkcd.com/*
// @icon         https://www.google.com/s2/favicons?domain=xkcd.com
// @grant        none
// ==/UserScript==

(function() {
    window.addEventListener('load', () => {
        const titleElement = document.querySelector('#comic [title]');
        if (titleElement) {
            const title = titleElement.title;
            let p = document.createElement('p');
            p.innerText = title;
            document.querySelector('#comic').append(p);
            const mystyle = {
                "font-variant": "none",
                "background": "lightgray",
                "padding": "10px"
            };
            Object.assign(p.style, mystyle);
        }
        const currentComic = document.querySelector('div#middleContainer.box > a');
        if (currentComic) {
            let uriPath = currentComic.text.split('/');
            let currentComicNumber=0;
            for (let i=uriPath.length-1; i>=0; --i) {
                let n = parseInt(uriPath[i]);
                if (!isNaN(n)) {
                    currentComicNumber = n;
                    break;
                }
            }
            let div = document.createElement('div');
            let a = document.createElement('a');
            var link = document.createTextNode('https://www.explainxkcd.com/wiki/index.php/'+currentComicNumber);
            a.appendChild(link);
            a.setAttribute('href', 'https://www.explainxkcd.com/wiki/index.php/'+currentComicNumber);
            div.appendChild(a);
            document.querySelector('#comic').append(div);
        }
    }, false);
})();
