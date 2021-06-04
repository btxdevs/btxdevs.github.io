if (typeof vu == "undefined") { vu = function() {} }

if (typeof vu.sop == "undefined") { vu.sop = function() {} }

if (typeof vu.sop.document == "undefined") { vu.sop.document = function() {} }

if (typeof vu.sop.document.ui == "undefined") { vu.sop.document.ui = function() {} }

vu.sop.document.ui.sleepTime = 333;
vu.sop.document.ui.side = 'front';
//vu.sop.document.ui.feedbackTime = 100;
vu.sop.document.ui.photoTime = 2500;

vu.sop.document.ui.previewBox = false; // WIP

vu.sop.document.ui.percentualLimitsActive = [[0,35],[0,35],[65,100],[65,100]];    // [left, top, width, height]



/* ------------------------------------------------------ */

vu.sop.document.ui.setLimits = function() {
    if (vu.camera.isVerticalVideo) {
        // Vertical Video
        vu.sop.document.ui.percentualLimitsActive = [[0,35],[0,100],[40,100],[0,100]];    // [left, top, width, height]
    } else {
        // Horizontal Video
        vu.sop.document.ui.percentualLimitsActive = [[0,35],[0,35],[65,100],[65,100]];    // [left, top, width, height]
    }
}


/* ------------------------------------------------------ */

vu.sop.document.ui.bg = function(color) { return "url('data:image/svg+xml;base64," +  btoa('<?xml version="1.0" encoding="utf-8"?>'+
    '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 750 500" style="enable-background:new 0 0 750 500;" xml:space="preserve">' +
    '<style type="text/css">.st0{fill:'+color+';}</style>' +
    '<g id="Layer_1">' +
    '<path class="st0" ' +
    'd="M 20,172 V 44 C 20,30.7 30.7,20 44,20 h 128 c 6.6,0 8,1.4 8,8 v 8 c 0,6.6 -1.40149,7.859606 -8,8 H 44 v 128 c 0,6.6 -1.4,8 -8,8 h -8 c -6.6,0 -8,-1.4 -8,-8 z M 566,28 v 8 c 0,6.6 1.40149,7.859606 8,8 h 128 v 128 c 0,6.6 1.4,8 8,8 h 8 c 6.6,0 8,-1.4 8,-8 V 44 C 726,30.7 715.3,20 702,20 H 574 c -6.6,0 -8,1.4 -8,8 z m 152,290 h -8 c -6.6,0 -7.88622,1.40098 -8,8 V 454 H 574 c -6.6,0 -8,1.4 -8,8 v 8 c 0,6.6 1.4,8 8,8 h 128 c 13.3,0 24,-10.7 24,-24 V 326 c 0,-6.6 -1.4,-8 -8,-8 z M 180,470 v -8 c 0,-6.6 -1.40149,-7.85961 -8,-8 H 44 V 326 c 0,-6.6 -1.4,-8 -8,-8 h -8 c -6.6,0 -8,1.4 -8,8 v 128 c 0,13.3 10.7,24 24,24 h 128 c 6.6,0 8,-1.4 8,-8 z"' +
    '/></g>' +
    '</svg>') +"')"};

vu.sop.document.ui.bgStyle2 = function(color, bgcolor, bgopacity) { return "url('data:image/svg+xml;base64," +  btoa('<?xml version="1.0" encoding="utf-8"?>'+
    '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1500 1000" style="enable-background:new 0 0 1500 1000;" xml:space="preserve">' +
    '<style type="text/css">.st0{fill:'+color+';}</style>' +
    '<g id="Layer_1">' +
    '<path style="fill:'+bgcolor+';fill-opacity:'+bgopacity+';stroke-width:0.9443655;stroke:none" d="M -1.4140625 0.39453125 L -1.4140625 997.41406 L 1501.8945 997.41406 L 1501.8945 0.39453125 L -1.4140625 0.39453125 z M 380.31055 250.4043 L 1118.4434 250.4043 L 1118.4434 737.82812 L 380.31055 737.82812 L 380.31055 250.4043 z " id="rect15" />' +
    '<path id="path4-3-7" d="M 967.39775,244.00234 H 1102.348 c 13.3,0 22,8.7 22,22 v 135.46437 c 0,2.50362 -1.1556,2.53563 -2.1845,2.53563 h -5.4203 c -1.1442,0 -2.3952,-0.11832 -2.3952,-2.53562 V 268.23025 c 0,-6.75719 -4.8888,-14.22791 -14.1409,-14.22791 H 967.39775 c -3.42204,0 -3.02947,-1.40568 -3.04975,-3.43494 l -0.0331,-3.31268 c -0.01,-0.99461 -0.37229,-3.25238 3.08285,-3.25238 z" 	class="st0" />' +
    '<path id="path4-3" d="M 531.28045,744.1099 H 396.33021 c -13.3,0 -22,-8.70005 -22,-22.00005 V 586.64548 c 0,-2.50362 1.15559,-2.53563 2.18451,-2.53563 h 5.42031 c 1.14417,0 2.39518,0.11832 2.39518,2.53562 v 133.23647 c 0,8.56318 4.8888,14.22791 14.14087,14.22791 h 132.80937 c 3.42204,0 3.02947,1.40568 3.04975,3.43494 l 0.0331,3.31268 c 0.01,0.99461 0.37229,3.25243 -3.08285,3.25243 z" class="st0" />' +
    '<path id="path4-6" d="M 1124.2972,587.08425 V 722.0345 c 0,13.3 -8.7,22 -22,22 H 966.83283 c -2.50362,0 -2.53563,-1.15559 -2.53563,-2.1845 v -5.42032 c 0,-1.14417 0.11832,-2.39518 2.53562,-2.39518 h 133.23648 c 8.6133,0 14.2279,-4.8888 14.2279,-14.14086 V 587.08425 c 0,-3.42204 1.4057,-3.02947 3.4349,-3.04975 l 3.3127,-0.0331 c 0.9946,-0.01 3.2524,-0.37229 3.2524,3.08285 z" class="st0" />' +
    '<path id="path4" d="M 374.32294,400.94162 V 265.99137 c 0,-13.3 8.7,-22 22,-22 h 135.46437 c 2.50362,0 2.53563,1.15559 2.53563,2.18451 v 5.42031 c 0,1.14417 -0.11832,2.39518 -2.53562,2.39518 H 398.55085 c -7.72945,-0.0884 -14.22791,4.8888 -14.22791,14.14087 v 132.80938 c 0,3.42204 -1.40567,3.02947 -3.43494,3.04975 l -3.31267,0.0331 c -0.99461,0.01 -3.25239,0.37229 -3.25239,-3.08285 z" class="st0" />' +
    '</g></svg>') +"')"};

vu.sop.document.ui.bgActive = vu.sop.document.ui.bg('#1DC600');
vu.sop.document.ui.bgSmall = vu.sop.document.ui.bg('#3B83C6');
vu.sop.document.ui.bgInactive = vu.sop.document.ui.bg('#212529');

vu.sop.document.ui.setBgStyle2 = function(colorActive, colorSmall, colorInactive, bgColor, bgOpacity) {
    vu.sop.document.ui.bgElement = document.getElementById('vu.sop.document.ui.background')

    vu.sop.document.ui.bgActive = vu.sop.document.ui.bgStyle2(colorActive, bgColor, bgOpacity);
    vu.sop.document.ui.bgSmall = vu.sop.document.ui.bgStyle2(colorSmall, bgColor, bgOpacity);
    vu.sop.document.ui.bgInactive = vu.sop.document.ui.bgStyle2(colorInactive, bgColor, bgOpacity);

    vu.sop.document.ui.bgElement.style.backgroundSize = '150%'
    vu.sop.document.ui.bgElement.style.backgroundPosition = '50% 50%'
}

/* ------------------------------------------------------ */

vu.sop.document.ui.resolve;
vu.sop.document.ui.reject;
vu.sop.document.ui.results = [];
vu.sop.document.ui.resultsTime = [];

vu.sop.document.ui.start = async function(side) {
    vu.sop.document.ui.setLimits()
    vu.sop.document.ui.box = document.getElementById('vu.sop.document.ui.box')
    vu.sop.document.ui.bgElement = document.getElementById('vu.sop.document.ui.background')
    vu.sop.document.ui.bgElement.style.backgroundImage = vu.sop.document.ui.bgInactive;

    await vu.sop.ui.show("vu.sop.document.ui.background");
    vu.sop.document.ui.side = side
    if (side == "front"){
        //vu.sop.audio.play(vu.sop.audio.addFrontDocumentBottomMsg)
        vu.sop.ui.showBottomText(vu.sop.msg.addFrontDocumentBottomMsg)
    } else {
        vu.sop.audio.play(vu.sop.audio.addBackDocumentBottomMsg)
        vu.sop.ui.showBottomText(vu.sop.msg.addBackDocumentBottomMsg)
    }

    vu.sop.document.ui.results = [];
    vu.sop.document.ui.resultsTime = [];

    let promise = new Promise(function (resolve, reject) {
        vu.sop.document.ui.resolve = resolve;
        vu.sop.document.ui.reject = reject;
    });

    vu.sop.document.ui.loop(side)
    return promise
};

vu.sop.document.ui.loop = async function(promise) {
    picture = null;
    //result;
    vWidth = vu.camera.video.videoWidth;
    vHeight = vu.camera.video.videoHeight;
    try {
        result = await vu.sop.document.objectDetection.predictAsync(vu.camera.video)
        if (typeof result[0] !== 'undefined') {
            if (vu.sop.document.ui.previewBox) {
                vu.sop.document.ui.drawBox(result);
            }
            result = vu.sop.document.ui.calculateResult(result[0][0], result[0][1], vWidth, vHeight)

            // Feedback
            if (result === "active") {
                vu.sop.document.ui.bgElement.style.backgroundImage = vu.sop.document.ui.bgActive;
            } else if (result === "small") {
                vu.sop.document.ui.bgElement.style.backgroundImage = vu.sop.document.ui.bgSmall;
            } else {
                vu.sop.document.ui.bgElement.style.backgroundImage = vu.sop.document.ui.bgInactive;
            }
            //
        } else {
            vu.sop.document.ui.box.style.display = 'none';
        }
    } catch (e) {
        result = 'inactive';
    }

    //console.log(result)

    timeNow = Date.now()
    vu.sop.document.ui.results.push(result);
    vu.sop.document.ui.resultsTime.push(timeNow);

    // clean old results - TODO hacerlo por tiempo, no por contador.
    if (vu.sop.document.ui.results.length  >  200){
        vu.sop.document.ui.results.shift();
        vu.sop.document.ui.resultsTime.shift();
    }

    if (vu.sop.document.ui.results.length  >  3){
        startPhotoIndex = false;
        for (i = 0; i < vu.sop.document.ui.results.length; i++) {
            time = vu.sop.document.ui.resultsTime[vu.sop.document.ui.results.length - i]
            if ( startPhotoIndex === false && timeNow >= ( time + vu.sop.document.ui.photoTime)) {
                startPhotoIndex = vu.sop.document.ui.results.length - i;
            }
        }
        // Feedback

        // Photo
        takePhoto = true
        for (i = startPhotoIndex; i < vu.sop.document.ui.results.length; i++) {
            result = vu.sop.document.ui.results[i];
            if ( result !== "active" && takePhoto === true) {
                takePhoto = false;
            }
        }
        if (takePhoto) {
            vu.sop.ui.flash();
            picture = await vu.camera.takePicture()

            // Clean Up
            vu.sop.ui.showBottomText('')
            await vu.sop.ui.hide("vu.sop.document.ui.background");

            // Resolve Promise
            vu.sop.document.ui.resolve(picture);
            return;
        }
    }

    // Continuar loopeando
    setTimeout(function () {
        let prom = vu.sop.document.ui.loop(promise)
    }, 10);
};


vu.sop.document.ui.calculateResult = function(label, box, videoWidth, videoHeight) {
    /*if (videoWidth < videoHeight){
        // Vertical VIDEO!
        videoWidthOri = videoWidth;
        videoWidth = videoHeight;
        videoHeight = videoWidthOri;
    }*/

    let boxPercentualLeft = Math.round((box[0]*100)/videoWidth);
    let boxPercentualTop = Math.round((box[1]*100)/videoHeight);
    let boxPercentualWidth = Math.round((box[2]*100)/videoWidth);
    let boxPercentualHeight = Math.round((box[3]*100)/videoHeight);

    //console.log(box)
    //console.log(boxPercentualLeft,boxPercentualTop,boxPercentualWidth,boxPercentualHeight)

    if ( boxPercentualLeft > vu.sop.document.ui.percentualLimitsActive[0][0] &&
         boxPercentualLeft < vu.sop.document.ui.percentualLimitsActive[0][1] &&
         boxPercentualTop > vu.sop.document.ui.percentualLimitsActive[1][0] &&
         boxPercentualTop < vu.sop.document.ui.percentualLimitsActive[1][1] &&
         boxPercentualWidth > vu.sop.document.ui.percentualLimitsActive[2][0] &&
         boxPercentualWidth < vu.sop.document.ui.percentualLimitsActive[2][1] &&
         boxPercentualHeight > vu.sop.document.ui.percentualLimitsActive[3][0] &&
         boxPercentualHeight < vu.sop.document.ui.percentualLimitsActive[3][1]
    ) {
        return 'active';
    }
    return 'inactive';
};

/* ------------------------------------------------------ */


// WIP
vu.sop.document.ui.box = document.getElementById('vu.sop.document.ui.box')

vu.sop.document.ui.drawBox = function(predictResults) {
    scale = vu.camera.video.offsetHeight / vu.camera.video.videoHeight
    try {
        bbox = predictResults[0][1]
        if (bbox[0] < 1) {
            bbox[0] = 1
        }
        if (bbox[1] < 1) {
            bbox[1] = 1
        }
        if (bbox[2] > vu.camera.video.videoWidth) {
            bbox[2] = vu.camera.video.videoWidth
        }
        if (bbox[3] > vu.camera.video.videoHeight) {
            bbox[3] = vu.camera.video.videoHeight
        }
        bleft = bbox[0] * scale
        btop = bbox[1] * scale
        bwidth = bbox[2] * scale
        bheight = bbox[3] * scale
        vu.sop.document.ui.box.style.left = bleft + "px";
        vu.sop.document.ui.box.style.top = btop + "px";
        vu.sop.document.ui.box.style.width = bwidth + "px";
        vu.sop.document.ui.box.style.height = bheight + "px";
        vu.sop.document.ui.box.style.display = 'block'
    }

    catch(error) {
        vu.sop.document.ui.box.style.display = 'none'
    }
}
