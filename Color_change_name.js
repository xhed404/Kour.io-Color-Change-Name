// ==UserScript==
// @name         Kour.io Color Change Name
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  The nickname changes color every 30 seconds.
// @author       I
// @match        *://kour.io/*
// @grant        none
// @license      GNU
// ==/UserScript==
 
(function() {
    'use strict';
    var nickname = "Nickname"; // Enter the nickname that will be displayed in the game here.
    var colorChangeTime = 30000; // Color change (30,000 ms = 30 seconds)
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
})();