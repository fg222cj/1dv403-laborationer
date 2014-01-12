applications.imageViewer = function imageViewer(contentWindow, contentWindowWidth) {
	this.name = "Image Viewer";
	this.icon = "images/imageViewerIcon.png";
    
    var url = "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/";
    
    new AjaxCon(url, function(data) {
        var thumbPadding = 10;  // M�ngden padding angivet i antal pixlar som varje tumnagel ska ha runt sig.
        var pictures = JSON.parse(data);
        console.log(pictures);
        
        var maxThumbWidth = 0;    // H�gsta bredd p� tumnagel, styr hur breda rutorna som presenterar tumnaglarna ska vara.
        var maxThumbHeight = 0;   // H�gsta h�jd p� tumnagel, styr hur h�ga rutorna som presenterar tumnaglarna ska vara.
        
        // for-loopen rotar igenom arrayet och plockar fram de h�gsta v�rdena p� maxThumbWidth och maxThumbHeight.
        for(var i = 0; i < pictures.length; i += 1) {
            if(pictures[i].thumbWidth > maxThumbWidth) {
                maxThumbWidth = pictures[i].thumbWidth;
            }
            if(pictures[i].thumbHeight > maxThumbHeight) {
                maxThumbHeight = pictures[i].thumbHeight;
            }
        }
        
        var thumbSideLength = 0;    // divarna som tumnaglarna ligger i ska vara kvadratiska, d�rf�r tar vi den h�gsta av maxThumbWidth och maxThumbHeight.
        if(maxThumbWidth > maxThumbHeight) {
            thumbSideLength = maxThumbWidth;
        }
        else {
            thumbSideLength = maxThumbHeight;
        }
        
        for(var i = 0; i < pictures.length; i += 1) {
            var thumbAnchor = document.createElement("a");
            thumbAnchor.setAttribute("class", "thumbnail-anchor");
            thumbAnchor.setAttribute("href", pictures[i].URL);
            thumbAnchor.style.width = thumbSideLength + "px";
            thumbAnchor.style.height = thumbSideLength + "px";
            thumbAnchor.style.lineHeight = thumbSideLength + "px";
            thumbAnchor.onclick = function() {
                document.getElementsByTagName("body")[0].style.background = "url(" + this.href + ") no-repeat center center fixed";
                return false;
            }
            contentWindow.appendChild(thumbAnchor);
            
            var thumbPicture = document.createElement("img");
            thumbPicture.setAttribute("src", pictures[i].thumbURL);
            thumbAnchor.appendChild(thumbPicture);
        }
        
        /*
        // R�knar ut hur m�nga tumnaglar som f�r plats per rad genom att ta bredden p� f�nstret dividerat med den ber�knade bredden p� en tumnagel.
        var itemsPerRow = Math.floor(contentWindowWidth / (thumbSideLength + (thumbPadding * 2)));
        
        var picturesIndex = 0;
        for(var i = 0; i < Math.ceil(pictures.length / itemsPerRow); i++) {
            for(var j = 0; j < itemsPerRow; i++) {
                
            }
        }
        
        */
    });
    
};