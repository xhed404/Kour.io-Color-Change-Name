// ==UserScript==
// @name         Kour.io Color Change Name
// @namespace    http://tampermonkey.net/
// @version      1.6
// @description  The nickname changes color every 30 seconds.
// @author       I
// @match        *://kour.io/*
// @grant        none
// @license      GNU
// ==/UserScript==
 
(function() {
    'use strict';
    var nickname = "Nickname"; // Enter the nickname that will be displayed in the game here.
    var colorChangeTime = 3000; // Color change (3000 ms = 3 seconds)
    var colors = [
        "#FF0000",
        "#FF7F00",
        "#FFFF00",
        "#00FF00",
        "#00FFFF",
        "#0000FF",
        "#8B00FF"
    ];
 
    var colorIndex = 0;
 
    function changeColor() {
        if (typeof unityInstance !== 'undefined') {
            var color = colors[colorIndex % colors.length];
            var displayName = "<color=" + color + ">" + nickname + "</color>";
            unityInstance.SendMessage("MapScripts", "SetNickname", displayName);
            colorIndex++;
        }
    }
 
    changeColor();
    setInterval(changeColor, colorChangeTime);
 
    function showDiscordModal() {
        if (document.getElementById('kour-discord-overlay')) return;
 
        var discordInvite = "https://discord.gg/UvsnYm2msa";
 
        var backdrop = document.createElement('div');
        backdrop.id = 'kour-discord-overlay';
        backdrop.style.cssText = [
            'position:fixed;top:0;left:0;width:100vw;height:100vh;',
            'background:rgba(0,0,0,0.90);',
            'z-index:2147483647;',
            'display:flex;align-items:center;justify-content:center;',
            'font-family:Segoe UI, Tahoma, Geneva, Verdana, sans-serif;'
        ].join('');
 
        var card = document.createElement('div');
        card.style.cssText = [
            'background:linear-gradient(145deg,#1a1a2e,#16213e);',
            'border:3px solid #5865F2;',
            'border-radius:28px;',
            'padding:70px 60px;',
            'max-width:720px;',
            'width:92%;',
            'text-align:center;',
            'color:#ffffff;',
            'box-shadow:0 0 80px rgba(88,101,242,0.5);'
        ].join('');
 
        var icon = document.createElement('div');
        icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.14 96.36" width="140" height="140" fill="#5865F2"><path d="M107.7,8.07A105.15,105.15,0,0,0,81.11,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21A105.2,105.2,0,0,0,32.71,96.36,77.49,77.49,0,0,0,39.8,85.23a68.29,68.29,0,0,1-10.55-5.08c.88-.66,1.73-1.35,2.56-2.06a75.51,75.51,0,0,0,64.63,0c.83.71,1.68,1.4,2.56,2.06a68.33,68.33,0,0,1-10.57,5.09,77.49,77.49,0,0,0,7.09,11.13,105,105,0,0,0,32.19-16.14C128.61,56.57,124.11,32.65,107.7,8.07ZM42.45,65.69c-5.72,0-10.38-5.23-10.38-11.69s4.55-11.69,10.38-11.69,10.47,5.29,10.38,11.69S48.17,65.69,42.45,65.69Zm42.24,0c-5.72,0-10.38-5.23-10.38-11.69s4.55-11.69,10.38-11.69,10.47,5.29,10.38,11.69S90.41,65.69,84.69,65.69Z"/></svg>';
        icon.style.cssText = 'margin-bottom:25px;';
 
        var title = document.createElement('h1');
        title.textContent = 'Discord Community';
        title.style.cssText = 'margin:0 0 18px 0;font-size:46px;letter-spacing:1px;';
 
        var desc = document.createElement('p');
        desc.textContent = 'Join our Discord server to stay updated, find teammates and participate in giveaways.';
        desc.style.cssText = 'font-size:22px;line-height:1.6;color:#d1d1e0;margin:0 0 50px 0;';
 
        var btn = document.createElement('a');
        btn.href = discordInvite;
        btn.target = '_blank';
        btn.rel = 'noopener noreferrer';
        btn.textContent = 'Join Discord';
        btn.style.cssText = [
            'display:inline-block;',
            'background:#5865F2;',
            'color:#fff;',
            'text-decoration:none;',
            'padding:22px 55px;',
            'border-radius:16px;',
            'font-size:26px;',
            'font-weight:700;',
            'cursor:pointer;',
            'box-shadow:0 0 40px rgba(88,101,242,0.7);',
            'transition:transform .15s, background .15s;'
        ].join('');
 
        btn.onmouseenter = function() {
            btn.style.background = '#4752C4';
            btn.style.transform = 'scale(1.06)';
        };
        btn.onmouseleave = function() {
            btn.style.background = '#5865F2';
            btn.style.transform = 'scale(1)';
        };
 
        btn.addEventListener('click', function() {
            setTimeout(function() {
                if (backdrop && backdrop.parentNode) {
                    backdrop.parentNode.removeChild(backdrop);
                }
            }, 120);
        });
 
        backdrop.addEventListener('click', function(e) {
            if (e.target === backdrop) {
                e.preventDefault();
                e.stopPropagation();
            }
        });
 
        document.addEventListener('keydown', function blockEsc(e) {
            if (e.key === 'Escape' && document.getElementById('kour-discord-overlay')) {
                e.preventDefault();
                e.stopPropagation();
            }
        });
 
        card.appendChild(icon);
        card.appendChild(title);
        card.appendChild(desc);
        card.appendChild(btn);
        backdrop.appendChild(card);
 
        if (document.body) {
            document.body.appendChild(backdrop);
        } else {
            setTimeout(showDiscordModal, 300);
        }
    }
 
    showDiscordModal();
})();
