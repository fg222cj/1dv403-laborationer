"use strict";

applications.imageViewer = function imageViewer(contentWindow, contentWindowWidth) {
	this.name = "Image Viewer";
	this.icon = "images/imageViewerIcon.png";
    
    var url = "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/";
    
    new AjaxCon(url, function(data) {
        
        if(data === "loading data") {
            var ajaxLoader = document.createElement("img");
            ajaxLoader.setAttribute("src", "images/ajax-loader.gif");
            ajaxLoader.setAttribute("id", "ajax-loader");
            contentWindow.appendChild(ajaxLoader);
        }
        else {
            contentWindow.removeChild(document.getElementById("ajax-loader"));
            var pictures = JSON.parse(data);
            
            var maxThumbWidth = 0;    // Högsta bredd på tumnagel, styr hur breda rutorna som presenterar tumnaglarna ska vara.
            var maxThumbHeight = 0;   // Högsta höjd på tumnagel, styr hur höga rutorna som presenterar tumnaglarna ska vara.
            
            // for-loopen rotar igenom arrayet och plockar fram de högsta värdena på maxThumbWidth och maxThumbHeight.
            for(var i = 0; i < pictures.length; i += 1) {
                if(pictures[i].thumbWidth > maxThumbWidth) {
                    maxThumbWidth = pictures[i].thumbWidth;
                }
                if(pictures[i].thumbHeight > maxThumbHeight) {
                    maxThumbHeight = pictures[i].thumbHeight;
                }
            }
            
            for(var i = 0; i < pictures.length; i += 1) {
                var thumbAnchor = document.createElement("a");
                thumbAnchor.setAttribute("class", "thumbnail-anchor");
                thumbAnchor.setAttribute("href", pictures[i].URL);
                thumbAnchor.style.width = maxThumbWidth + "px";
                thumbAnchor.style.height = maxThumbHeight + "px";
                thumbAnchor.style.lineHeight = maxThumbHeight-5 + "px";
                thumbAnchor.onclick = function() {
                    document.getElementsByTagName("body")[0].style.background = "url(" + this.href + ") no-repeat center center fixed";
                    return false;
                }
                contentWindow.appendChild(thumbAnchor);
                
                var thumbPicture = document.createElement("img");
                thumbPicture.setAttribute("src", pictures[i].thumbURL);
                thumbAnchor.appendChild(thumbPicture);
            }
        }
        
    });
    
};