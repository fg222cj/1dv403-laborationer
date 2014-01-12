applications.imageViewer = function imageViewer(contentWindow) {
	this.name = "Image Viewer";
	this.icon = "images/imageViewerIcon.png";
    
    var url = "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/";
    new AjaxCon(url, function(data) {
        var pictures = JSON.parse(data);
        console.log(pictures);
        
        var maxPictureWidth = 0;    // Högsta bredd på tumnagel, styr hur breda rutorna som presenterar tumnaglarna ska vara.
        var maxPictureHeight = 0;   // Högsta höjd på tumnagel, styr hur höga rutorna som presenterar tumnaglarna ska vara.
        
        // for-loopen rotar igenom arrayet och plockar fram de högsta värdena på maxPictureWidth och maxPictureHeight.
        for(var i = 0; i < pictures.length; i += 1) {
            if(pictures[i].thumbWidth > maxPictureWidth) {
                maxPictureWidth = pictures[i].thumbWidth;
            }
            if(pictures[i].thumbHeight > maxPictureHeight) {
                maxPictureHeight = pictures[i].thumbHeight;
            }
        }
        
        var thumbSideLength = 0;
    });
    
}
