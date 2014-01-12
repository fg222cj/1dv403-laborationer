"use strict";
var pwd = {
    
    // init länkar alla app-ikoner till sina respektive appar genom att baserat på deras id tilldela dem ett app-id som de sedan är länkade till.
    init: function() {
    	var imageViewerAnchor = document.getElementById("imageViewer");
    	imageViewerAnchor.onclick = function() {
    		pwd.loadApp("imageViewer");
    	}
    },
    
    // loadApp startar en app baserat på det app-id den tar emot.
    loadApp: function(appId) {
        var appWindowContent = document.createElement("div");
    	var app = new applications[appId](appWindowContent);
    	
    	var appWindow = document.createElement("div");
    	appWindow.setAttribute("class", "app-window");
    	
    	var statusBar = document.createElement("div");
    	statusBar.setAttribute("class", "app-window-status-bar");
    	appWindow.appendChild(statusBar);
        appWindow.appendChild(appWindowContent);
    	
    	var appIcon = document.createElement("img");
    	appIcon.setAttribute("src", app.icon);
    	appIcon.setAttribute("class", "app-icon");
    	statusBar.appendChild(appIcon);
    	
    	statusBar.innerHTML += app.name;
    	
    	var closeWindowButtonAnchor = document.createElement("a");
    	closeWindowButtonAnchor.setAttribute("class", "app-window-status-bar-button");
    	closeWindowButtonAnchor.setAttribute("href", "#");
    	closeWindowButtonAnchor.onclick = function() {
    		appWindow.parentNode.removeChild(appWindow);
    	}
    	statusBar.appendChild(closeWindowButtonAnchor);
    	
    	var closeWindowButtonImage = document.createElement("img");
    	closeWindowButtonImage.setAttribute("src", "images/closeButton.png")
    	closeWindowButtonAnchor.appendChild(closeWindowButtonImage);
    	
    	document.getElementById("main").appendChild(appWindow);
    }
    
}

var applications = {};

window.onload = pwd.init;