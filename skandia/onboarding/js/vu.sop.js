if (typeof vu == "undefined") { vu = function() {} }

if (typeof vu.sop == "undefined") { vu.sop = function() {} }

if (typeof vu.face == "undefined") { vu.face = function() {} }

if (typeof vu.sop.audio == "undefined") { vu.sop.audio = function() {} }

vu.sop.disableBiometric = false;

vu.sop.operationIdValue = null;
vu.sop.userNameValue = null;
vu.sop.lang = 'es';
vu.sop.flipDocumentCamera = 'auto';
vu.sop.barcodeOptional = true;
vu.sop.warmUpDocModelAsync = false;
vu.sop.faceOrientationModelWeights = 'BEST';        // VERYLIGHT LIGHT NORMAL BEST

//------------------------------------------------------------------------------------------------------

vu.sop.preCacheFaceModelPromise = false;
vu.sop.load = async function(basePath) {

    try {
        let webRTCadapter =  vu.sop.loadJs(basePath + '/js/libs/webrtc/adapter-latest.js');

        let tfJsLoad =  vu.sop.loadJs(basePath + '/js/libs/tensorflowjs/2.7.0/tf.min.js');
        await tfJsLoad;

        let tfJsWasmLoad =  vu.sop.loadJs(basePath + '/js/libs/tensorflowjs/2.7.0/tf-backend-wasm.min.js');
        await tfJsWasmLoad;

        let msgs =  vu.sop.loadJs(basePath + '/js/vu.sop.msg.'+ vu.sop.lang +'.js');
        await msgs;

        if ( vu.sop.useGestures ) {
            vu.face.nncPath = basePath + '/js/libs/face/';
            if (vu.sop.preCacheFaceModelAsync) {
                console.log("Pre Cache Face Model - Enabled");
                vu.sop.preCacheFaceModelPromise = vu.sop.loadHtml(vu.face.nncPath + '/jeelizFaceTransferNNC.json');
            }
        } else {
            console.log('Challenge orientation model', vu.sop.faceOrientationModelWeights)
            if ( vu.sop.faceOrientationModelWeights == 'VERYLIGHT' ) {
                vu.face.nncPath = basePath + '/js/libs/face/NN_VERYLIGHT_0.json';
            } else if ( vu.sop.faceOrientationModelWeights == 'LIGHT' ) {
                vu.face.nncPath = basePath + '/js/libs/face/NN_DEFAULT.json';
            } else if ( vu.sop.faceOrientationModelWeights == 'NORMAL' ) {
                vu.face.nncPath = basePath + '/js/libs/face/NN_LIGHT_0.json';
            }  else  {
                vu.face.nncPath = basePath + '/js/libs/face/NN_WIDEANGLES_0.json';
            }

            if (vu.sop.preCacheFaceModelAsync) {
                console.log("Pre Cache Face Model - Enabled");
                vu.sop.preCacheFaceModelPromise = vu.sop.loadHtml( vu.face.nncPath );
            }
        }
        if ( vu.sop.audio.enabled == false ) {
            console.log("Audio Load is disabled by conf");
            loadAudioLang = false
        } else {
            console.log("Audio Load is enabled by conf");
            loadAudioLang = true
        }

        if (loadAudioLang) {
            audioLangLoad =  vu.sop.loadJs(basePath + '/js/vu.sop.audio.'+ vu.sop.lang +'.js');
        }
        let audioLoad =  vu.sop.loadJs(basePath + '/js/vu.sop.audio.js');
        let htmlLoad =  vu.sop.loadHtml(basePath + '/html/onboarding.html');
        let cameraLoad =  vu.sop.loadJs(basePath + '/js/vu.camera.js');
        //let blurDetectionLoad =  vu.sop.loadJs(basePath + '/js/libs/inspector-bokeh/dist/measure_blur.js');
        let picoLoad =  vu.sop.loadJs(basePath + '/js/libs/pico/pico.js');
        let documentLoad =  vu.sop.loadJs(basePath + '/js/vu.sop.document.objectDetection.js');
        let apiLoad =  vu.sop.loadJs(basePath + '/js/vu.sop.api.js');
        let sopUILoad =  vu.sop.loadJs(basePath + '/js/vu.sop.ui.js');
        let documentFaceLoad =  vu.sop.loadJs(basePath + '/js/vu.sop.document.face.js');
        let documentUiLoad =  vu.sop.loadJs(basePath + '/js/vu.sop.document.ui.js');
       
        if (vu.sop.useGestures) {
            console.log('Loading challenge gestures')
            faceLoad =  vu.sop.loadJs(basePath + '/js/vu.face.gestures.js');
            faceUiGesturesLoad =  vu.sop.loadJs(basePath + '/js/vu.face.ui.gestures.js');
            faceLibLoad = vu.sop.loadJs(basePath + '/js/libs/face/jeelizFaceTransfer.js');
        } else {
            console.log('Loading challenge orientation')
            faceLoad =  vu.sop.loadJs(basePath + '/js/vu.face.orientation.js');
            faceLibLoad = vu.sop.loadJs(basePath + '/js/libs/face/jeelizFaceFilter.js');
        }
        let faceUiLoad =  vu.sop.loadJs(basePath + '/js/vu.face.ui.js');
        //let faceUiGesturesLoad =  vu.sop.loadJs(basePath + '/js/vu.face.ui.gestures.js');
        let faceAuth =  vu.sop.loadJs(basePath + '/js/vu.face.auth.js');

        // Fill HTML Load
        document.getElementById('vu.sop').innerHTML = await htmlLoad;

        await webRTCadapter;
        await cameraLoad;
        //await blurDetectionLoad;
        await picoLoad;
        await apiLoad;
        await sopUILoad;
        await documentLoad;
        await documentFaceLoad;
        await documentUiLoad;
        await faceLoad;
        await faceUiLoad;
        await faceAuth;
        await faceLibLoad;
        await audioLoad;

        if (vu.sop.useGestures) {
            await faceUiGesturesLoad;
        }
        if (loadAudioLang) {
            await audioLangLoad;
        }


        vu.sop.document.objectDetection.modelURL = basePath + '/js/models/document/model.json';
        vu.sop.document.face.cascadeUrl = basePath + '/js/libs/pico/facefinder';

        document.getElementById('vu.sop.ui.userName').placeholder = vu.sop.msg.userInputPlaceholder
        document.getElementById('vu.sop.ui.userNameSendBtn').innerHTML = vu.sop.msg.userSendBtn

        vu.sop.ui.bottomTextBackGroundColor("rgba(0, 0, 0, 0.4)");
        await vu.sop.createLoadingImg();

    } catch (e) {
        console.log('Network Loading Error')
        console.log(e)
        throw new Error('NETWORK_ERROR');
    };

    try {
        if (!vu.sop.ui.isDeviceCompatible()) {
            vu.sop.audio.play(vu.sop.audio.deviceNotSupported)
            await vu.sop.ui.alert(vu.sop.msg.deviceNotSupported)
        }
        vu.sop.ui.isBrowserCompatible()
    } catch (e) {
        console.log(e)
	vu.sop.ui.hideWhiteLoading();
        if (e.message === 'browserOldVersion') {
            vu.sop.audio.play(vu.sop.audio.browserOldVersion)
            await vu.sop.ui.alert(vu.sop.msg.browserOldVersion)
        }
        if (e.message === 'browserUnsupported') {
            vu.sop.audio.play(vu.sop.audio.browserUnsupported)
            await vu.sop.ui.alert(vu.sop.msg.browserUnsupported)
        }
        if (e.message === 'osOldVersion') {
            vu.sop.audio.play(vu.sop.audio.osOldVersion)
            await vu.sop.ui.alert(vu.sop.msg.osOldVersion)
        }
        vu.sop.ui.showWhiteLoading();
    };
};


vu.sop.loadJs = function(url) {
    let promise = new Promise(function (resolve, reject) {
        let script = document.createElement('script');
        script.onload = function () {
            resolve(true);
        };
        script.onerror = function () {
            console.log("Error Loading", url)
            reject(true);
        };
        script.src = url;
        document.head.appendChild(script); //or something of the likes
    });
    return promise;
};


vu.sop.loadHtml = function(url) {
    let promise = new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const resp = xhr.responseText;
                    resolve(resp);
                } else {
                    const resp = xhr.responseText;
                    reject(resp);
                }
            } else {
                //console.log("xhr processing going on");
            }
        };
        xhr.open("GET", url, true);
        xhr.send();
    });
    return promise;
};


vu.sop.getBase64  = function(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(evt){
        img = new Image();
        img.src = evt.target.result;
        img.onload = function() {
            canvas = document.createElement('canvas');
            maxWidth = 1600
            if (img.height > 1600){
                canvas.width = maxWidth
                newHeight = Math.round((img.height * maxWidth) / img.width)
                canvas.height = newHeight;
                console.log(canvas.width, canvas.height)
                ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, maxWidth, newHeight);
                result = canvas.toDataURL("image/jpeg", 0.85);
                resolve(result)
            } else {
                resolve(img.src)
            }
        }
    }
    //reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

vu.sop.videoResizeRules = 'doc'
vu.sop.videoResizeObserver = new ResizeObserver(entries => {
    if ( vu.sop.videoResizeRules == 'doc' ) {
        console.log('Video element change, applying styles: doc')
        vid = document.getElementById('vu.sop.ui.video')

        if(window.innerHeight > window.innerWidth) {
            // Si la pantalla esta en vertical
            if (vu.camera.isVerticalVideo()) {
                // Si el video esta en vertical
                vid.style.maxWidth = "100%";
                vid.style.maxHeight = "none";
                vid.style.width = "auto";
                vid.style.height = "auto";
            } else {
                // Si el video esta en horizontal
                vid.style.maxWidth = "100%";
                vid.style.maxHeight = "none";
                vid.style.width = "auto";
                vid.style.height = "auto";
            }
        } else {
            // Si la pantalla esta en horizontal
            vid.style.maxHeight = "100%";
            vid.style.maxWidth = "100%";
            vid.style.width = "auto";
            vid.style.height = "auto";
        }
        bg = document.getElementById('vu.sop.document.ui.background')
        bg.style.maxWidth = vu.camera.video.offsetWidth + "px";
        bg.style.maxHeight = vu.camera.video.offsetHeight + "px";
    }
    if ( vu.sop.videoResizeRules == 'face' ) {
        console.log('Video element change, applying styles: face')
        vid = document.getElementById('vu.sop.ui.video')

        if(window.innerHeight > window.innerWidth) {
            // Si la pantalla esta en vertical
            if (vu.camera.isVerticalVideo()) {
                // Si el video esta en vertical
                vid.style.maxWidth = "100%";
                vid.style.maxHeight = "none";
                vid.style.width = "100%";
                vid.style.height = "auto";
            } else {
                // Si el video esta en horizontal
                vid.style.maxWidth = "none";
                vid.style.maxHeight = "100%";
                vid.style.width = "auto";
                vid.style.height = "100%";
            }
        } else {
            // Si la pantalla esta en horizontal
            if (vu.camera.isVerticalVideo()) {
                // Si el video esta en vertical
                vid.style.maxWidth = "100%";
                vid.style.maxHeight = "none";
                vid.style.width = "100%";
                vid.style.height = "auto";
            } else {
                // Si el video esta en horizontal
                vid.style.maxWidth = "none";
                vid.style.maxHeight = "100%";
                vid.style.width = "auto";
                vid.style.height = "100%";
            }
        }
    }
});

//------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------

if (typeof vu.sop.steps == "undefined") { vu.sop.steps = function() {} }

vu.sop.start = async function() {
    // Prepara la camara y librerias para userInput() document()
    await vu.sop.steps.loadLibsAndCamera();
    // Pantalla de ingreso de usuario
    await vu.sop.steps.userInput();
    // Pantallas para subir los documentos
    await vu.sop.steps.document();
    // Prepara la camara y librerias para authFace()
    await vu.sop.steps.loadLibsAndCameraFace();
    // Pantalla de autenticacion
    try {
        return await vu.sop.steps.authFace()
    } catch (e) {
        throw new Error(e.message)
    };
};

vu.sop.steps.documentPromiseResolve = null;
vu.sop.steps.documentPromiseReject = null;

vu.sop.steps.document = async function() {
    let promise = new Promise(function (resolve, reject) {
        vu.sop.steps.documentPromiseResolve = resolve;
        vu.sop.steps.documentPromiseReject = reject;

        document.getElementById("vu.sop.ui.documentSelectMetod.cameraText").innerHTML = vu.sop.msg.addDocumentCameraIconMsg;
        document.getElementById("vu.sop.ui.documentSelectMetod.fileText").innerHTML = vu.sop.msg.addDocumentFileIconMsg;
        vu.sop.ui.show("vu.sop.ui.documentSelectUploadMetod");
        vu.sop.audio.play(vu.sop.audio.addDocumentBottomText)
        vu.sop.ui.showBottomText(vu.sop.msg.addDocumentBottomText)
    });
    return promise;
}

vu.sop.steps.takePictureDocument = async function() {
    vu.sop.ui.hide("vu.sop.ui.documentSelectUploadMetod");
    vu.sop.ui.hideBottomText();
    await vu.sop.steps.takePictureDocumentFront();
    await vu.sop.steps.takePictureDocumentBack();
    vu.sop.steps.documentPromiseResolve(true)
};

vu.sop.steps.uploadFrontDocumentPicture = async function() {
    vu.sop.ui.hide("vu.sop.ui.documentSelectUploadMetod");
    vu.sop.ui.hideBottomText();
    vu.sop.ui.show("vu.sop.ui.documentFileUploadFront");
    vu.sop.audio.play(vu.sop.audio.addFrontDocumentFileUploadBottomMsg)
    vu.sop.ui.showBottomText(vu.sop.msg.addFrontDocumentFileUploadBottomMsg);
    //vu.sop.steps.documentPromiseResolve(true)
};

vu.sop.steps.uploadFrontDocumentPictureResolve = async function(file) {
    while (true) {
        try {
            console.log(file);
            // Show faceLoad
            if (file.length < 1){
                break
            }
            frontDocumentImg = await vu.sop.getBase64(file[0]);
            vu.sop.ui.addFrontImg = frontDocumentImg;
            await vu.sop.ui.showWhiteLoading();
            response = await vu.sop.api.addFront(vu.sop.userNameValue,
                vu.sop.operationIdValue,
                frontDocumentImg);
            if (response.code != 909) {
                if (response.code === 910) {
                    throw new Error('addFrontApiErrorAntiSpoofing')
                } else if (response.code === 911) {
                    throw new Error('addFrontApiErrorFrontAlreadyExist')
                } else {
                    throw new Error('addFrontApiError')
                }
            }
            console.log(response)

            vu.sop.ui.addFrontResponse = response
            if ("addBackRequired" in response) {
                if (response.addBackRequired){
                    console.log("addBack is Required")
                    vu.sop.addBackRequired = response.addBackRequired;
                }
            }
            if ("addDocumentPictureRequired" in response) {
                if (response.addDocumentPictureRequired) {
                    console.log("addDocumentPicture is Required")
                    if (!response.documentPictureDetected) {
                        face = await vu.sop.document.face.do(vu.sop.ui.addFrontImg)
                        if ( face !== null) {
                            response = await vu.sop.api.addDocumentImage(vu.sop.userNameValue,
                                                                         vu.sop.operationIdValue,
                                                                         face);
                            console.log("face Resp",response)
                            if (response.code != 938) {
                                throw new Error('documentPictureNotDetected')
                            }
                        } else {
                            throw new Error('documentPictureNotDetected')
                        }
                    }
                }
            }
            if (vu.sop.barcodeOptional === false) {
                if ("containsBarcode" in response) {
                    if (response.containsBarcode) {
                        console.log("barcode is Required")
                        if (!response.barcodeDetected) {
                            throw new Error('documentBarcodeNotDetected')
                        }
                    }
                }
            }
            await vu.sop.ui.hideWhiteLoading();
            await vu.sop.steps.uploadBackDocumentPicture();
            break
        } catch (e) {
            document.getElementById('documentFileUploadFrontInput').value = null;
            document.getElementById('documentFileUploadBackInput').value = null;

            await vu.sop.ui.hideWhiteLoading()
            console.log('vu.sop.ui.addFront', e)
            if (e.message === 'addFrontApiError') {
                vu.sop.audio.play(vu.sop.audio.addFrontDocumentComunicationError)
                await vu.sop.ui.alert(vu.sop.msg.addFrontDocumentComunicationError)
            } else if (e.message === 'documentPictureNotDetected'){
                vu.sop.audio.play(vu.sop.audio.addFrontDocumentPictureNotDetected)
                await vu.sop.ui.alert(vu.sop.msg.addFrontDocumentPictureNotDetected)
            } else if (e.message === 'documentBarcodeNotDetected'){
                vu.sop.audio.play(vu.sop.audio.addFrontDocumentBarcodeNotDetected)
                await vu.sop.ui.alert(vu.sop.msg.addFrontDocumentBarcodeNotDetected)
            } else if (e.message === 'addFrontApiErrorAntiSpoofing'){
                vu.sop.audio.play(vu.sop.audio.addFrontApiErrorAntiSpoofing)
                await vu.sop.ui.alert(vu.sop.msg.addFrontApiErrorAntiSpoofing)
            } else if (e.message === 'addFrontApiErrorFrontAlreadyExist'){
                vu.sop.audio.play(vu.sop.audio.addFrontApiErrorFrontAlreadyExist)
                await vu.sop.ui.alert(vu.sop.msg.addFrontApiErrorFrontAlreadyExist)
            } else {
                vu.sop.audio.play(vu.sop.audio.addFrontDocumentError)
                await vu.sop.ui.alert(vu.sop.msg.addFrontDocumentError)
            }
        }
    }
};

vu.sop.steps.uploadBackDocumentPicture = async function() {
    vu.sop.ui.hide("vu.sop.ui.documentFileUploadFront");
    vu.sop.ui.hideBottomText();
    vu.sop.ui.show("vu.sop.ui.documentFileUploadBack");
    vu.sop.audio.play(vu.sop.audio.addBackDocumentFileUploadBottomMsg)
    vu.sop.ui.showBottomText(vu.sop.msg.addBackDocumentFileUploadBottomMsg);
    //vu.sop.steps.documentPromiseResolve(true)
};


vu.sop.steps.uploadBackDocumentPictureResolve = async function(file) {
    while (true) {
        try {
            // Show faceLoad
            if (file.length < 1){
                break
            }
            backDocumentImg = await vu.sop.getBase64(file[0]);
            vu.sop.ui.addBackImg = backDocumentImg;
            await vu.sop.ui.showWhiteLoading()
            response = await vu.sop.api.addBack(vu.sop.userNameValue,
                vu.sop.operationIdValue,
                backDocumentImg);
            if (response.code != 912) {
                if (response.code === 913) {
                    throw new Error('addBackApiErrorAntiSpoofing')
                } else if (response.code === 914) {
                    throw new Error('addBackApiErrorFrontAlreadyExist')
                } else {
                    throw new Error('addBackApiError')
                }
            }
            if ("addDocumentPictureRequired" in response) {
                if (response.addDocumentPictureRequired){
                    console.log("addDocumentPicture is Required")
                    if(!response.documentPictureDetected) {
                        throw new Error('documentPictureNotDetected')
                    }
                }
            }
            if ( vu.sop.barcodeOptional === false ) {
                if (vu.sop.barcodeOptional === false) {
                    if ("containsBarcode" in response) {
                        if (response.containsBarcode) {
                            console.log("barcode is Required")
                            if (!response.barcodeDetected) {
                                throw new Error('documentBarcodeNotDetected')
                            }
                        }
                    }
                }
            }
            console.log(response)
            vu.sop.steps.documentPromiseResolve(true);
            await vu.sop.ui.hideWhiteLoading()
            vu.sop.ui.hide("vu.sop.ui.documentFileUploadBack");
            vu.sop.ui.hideBottomText();

            break
        } catch (e) {
            document.getElementById('documentFileUploadFrontInput').value = null;
            document.getElementById('documentFileUploadBackInput').value = null;
            await vu.sop.ui.hideWhiteLoading()
            console.log('vu.sop.ui.addBack', e)
            if (e.message === 'addBackApiError') {
                vu.sop.audio.play(vu.sop.audio.addBackDocumentComunicationError)
                await vu.sop.ui.alert(vu.sop.msg.addBackDocumentComunicationError)
            } else if (e.message === 'documentPictureNotDetected'){
                vu.sop.audio.play(vu.sop.audio.addBackDocumentPictureNotDetected)
                await vu.sop.ui.alert(vu.sop.msg.addBackDocumentPictureNotDetected)
            } else if (e.message === 'documentBarcodeNotDetected'){
                vu.sop.audio.play(vu.sop.audio.addBackDocumentBarcodeNotDetected)
                await vu.sop.ui.alert(vu.sop.msg.addBackDocumentBarcodeNotDetected)
            } else if (e.message === 'addBackApiErrorAntiSpoofing'){
                vu.sop.audio.play(vu.sop.audio.addBackApiErrorAntiSpoofing)
                await vu.sop.ui.alert(vu.sop.msg.addBackApiErrorAntiSpoofing)
            } else if (e.message === 'addBackApiErrorFrontAlreadyExist'){
                vu.sop.audio.play(vu.sop.audio.addBackApiErrorFrontAlreadyExist)
                await vu.sop.ui.alert(vu.sop.msg.addBackApiErrorFrontAlreadyExist)
            } else {
                vu.sop.audio.play(vu.sop.audio.addBackDocumentError)
                await vu.sop.ui.alert(vu.sop.msg.addBackDocumentError)
            }
        }
    }
};



// --------------------------------------------------------------------------------------------------

vu.sop.docObjectModelLoad = false;
vu.sop.docHaarLoad = false;
vu.sop.steps.loadLibsAndCamera = async function() {
    if ( vu.sop.warmUpDocModelAsync ) {
        // Load network
        vu.sop.docObjectModelLoad = vu.sop.document.objectDetection.loadModel();
        // Load HAAR
        vu.sop.docHaarLoad  = vu.sop.document.face.preLoad()
    } else {
        // Load network
        objectDetectionLoadPromise = await vu.sop.document.objectDetection.loadModel();
        // Load HAAR
        haarLoadPromise = await vu.sop.document.face.preLoad()
    }

    while (true) {
        try {
            await vu.sop.ui.showWhiteLoading();
            vu.camera.config.orientation = 'environment'
            vu.camera.config.previewResolution = 'highest'
            vu.camera.config.pictureResolution = 'highest'
            vu.camera.config.pictureForceLandscape = true;
            vu.camera.config.pictureForceLandscapeRotateClockwise = false;
            vu.camera.config.pictureFlash = true;
            vu.camera.config.pictureLessBlurry = false
            await vu.camera.start("vu.sop.ui.video");
            //vu.camera.setZoom(1.3)
            //vu.camera.setSharpness('lowest')
            //brightness = vu.camera.setBrightness('medium')

            if (vu.sop.flipDocumentCamera === 'auto') {
                if (vu.sop.ui.isMobile()) {
                    console.log('Flip Document configured to auto. Is mobile, mirroring screen')
                    vu.sop.ui.keepVideoHorizontal(vu.camera.video)
                }
            } else if (vu.sop.flipDocumentCamera) {
                console.log('Flip Document configured to true, mirroring screen')
                vu.sop.ui.flipVideoHorizontal(vu.camera.video)
            }

            vu.sop.videoResizeRules = 'doc'
            vu.sop.videoResizeObserver.observe(document.getElementById('vu.sop.ui.videoContainer'));

            break
        } catch (e) {
            await vu.sop.ui.hideWhiteLoading();
            console.log(e)
            if (e.message === 'denied') {
                vu.sop.audio.play(vu.sop.audio.cameraDenied)
                await vu.sop.ui.alert(vu.sop.msg.cameraDenied)
            } else if (e.message === 'autoplay') {
                vu.sop.audio.play(vu.sop.audio.cameraAutoplayProtection)
                await vu.sop.ui.alert(vu.sop.msg.cameraAutoplayProtection)
            } else {
                vu.sop.audio.play(vu.sop.audio.cameraError)
                await vu.sop.ui.alert(vu.sop.msg.cameraError )
            }
        }
    }
    // End Load Model
    //await objectDetectionLoadPromise;
    // Load HAAR
    //await haarLoadPromise;
}

vu.sop.steps.userInput = async function() {
    // ----------------------------------------
    // User Screen - SOP newOperation
    await vu.sop.ui.hideWhiteLoading()
    while (true){
        try {
            if (vu.sop.audio.enabled) {
                await vu.sop.ui.showBottomText(vu.sop.msg.userPleaseEnableAudio);
            }
            await vu.sop.ui.user.start();
            if (vu.sop.audio.enabled) {
                await vu.sop.ui.hideBottomText();
            }
            break
        } catch (e) {
            console.log('vu.sop.ui.user', e);
            vu.sop.audio.play(vu.sop.audio.userError);
            await vu.sop.ui.alert(vu.sop.msg.userError);
        };
    };
};

vu.sop.steps.takePictureDocumentFront = async function() {
    // ----------------------------------------
    // Document Front - SOP addFront
    //
    await vu.sop.ui.showLoading()

    if ( vu.sop.warmUpDocModelAsync ) {
        await vu.sop.docObjectModelLoad;
        await vu.sop.docHaarLoad;
    }

    // TODO mejorar esto, dirty fix
    vu.sop.document.ui.bgElement = document.getElementById('vu.sop.document.ui.background')
    vu.sop.document.ui.bgElement.style.backgroundImage = vu.sop.document.ui.bgInactive;
    vu.sop.ui.show("vu.sop.document.ui.background");
    vu.sop.audio.play(vu.sop.audio.addFrontDocumentBottomMsg)
    vu.sop.ui.showBottomText(vu.sop.msg.addFrontDocumentBottomMsg)
    await vu.sop.ui.sleep(50)
    var start = new Date();
    console.log('Warming Up Start')
    await vu.sop.document.objectDetection.predictAsync(vu.camera.video)
    var end  = new Date();
    var time = end.getTime() - start.getTime();
    console.log('Warming Up End - Time', time, 'ms')
    await vu.sop.ui.hideLoading()
    while (true) {
        try {
            // Show faceLoad
            frontDocumentImg = await vu.sop.document.ui.start('front');
            vu.sop.ui.addFrontImg = frontDocumentImg
            await vu.sop.ui.showLoading()
            response = await vu.sop.api.addFront(vu.sop.userNameValue,
                vu.sop.operationIdValue,
                frontDocumentImg);

            if (response.code != 909) {
                if (response.code === 910) {
                    throw new Error('addFrontApiErrorAntiSpoofing')
                } else if (response.code === 911) {
                    throw new Error('addFrontApiErrorFrontAlreadyExist')
                } else {
                    throw new Error('addFrontApiError')
                }
            }
            console.log(response)

            vu.sop.ui.addFrontResponse = response
            if ("addBackRequired" in response) {
                if (response.addBackRequired) {
                    console.log("addBack is Required")
                    vu.sop.addBackRequired = response.addBackRequired;
                }
            }
            if ("addDocumentPictureRequired" in response) {
                if (response.addDocumentPictureRequired) {
                    console.log("addDocumentPicture is Required")
                    if (!response.documentPictureDetected) {
                        face = await vu.sop.document.face.do(vu.sop.ui.addFrontImg)
                        if ( face !== null) {
                            response = await vu.sop.api.addDocumentImage(vu.sop.userNameValue,
                                                                         vu.sop.operationIdValue,
                                                                         face);
                            console.log("face Resp",response)
                            if (response.code != 938) {
                                throw new Error('documentPictureNotDetected')
                            }
                        } else {
                            throw new Error('documentPictureNotDetected')
                        }
                    }
                }
            }
            if ( vu.sop.barcodeOptional === false ) {
                if ("containsBarcode" in response) {
                    if (response.containsBarcode){
                        console.log("barcode is Required")
                        if(!response.barcodeDetected) {
                            throw new Error('documentBarcodeNotDetected')
                        }
                    }
                }
            }
            await vu.sop.ui.hideLoading()
            break
        } catch (e) {
            await vu.sop.ui.hideLoading()
            console.log('vu.sop.ui.addFront', e)
            if (e.message === 'addFrontApiError') {
                vu.sop.audio.play(vu.sop.audio.addFrontDocumentComunicationError)
                await vu.sop.ui.alert(vu.sop.msg.addFrontDocumentComunicationError)
            } else if (e.message === 'documentPictureNotDetected'){
                vu.sop.audio.play(vu.sop.audio.addFrontDocumentPictureNotDetected)
                await vu.sop.ui.alert(vu.sop.msg.addFrontDocumentPictureNotDetected)
            } else if (e.message === 'documentBarcodeNotDetected'){
                vu.sop.audio.play(vu.sop.audio.addFrontDocumentBarcodeNotDetected)
                await vu.sop.ui.alert(vu.sop.msg.addFrontDocumentBarcodeNotDetected)
            } else if (e.message === 'addFrontApiErrorAntiSpoofing'){
                vu.sop.audio.play(vu.sop.audio.addFrontApiErrorAntiSpoofing)
                await vu.sop.ui.alert(vu.sop.msg.addFrontApiErrorAntiSpoofing)
            } else if (e.message === 'addFrontApiErrorFrontAlreadyExist'){
                vu.sop.audio.play(vu.sop.audio.addFrontApiErrorFrontAlreadyExist)
                await vu.sop.ui.alert(vu.sop.msg.addFrontApiErrorFrontAlreadyExist)
            } else {
                vu.sop.audio.play(vu.sop.audio.addFrontDocumentError)
                await vu.sop.ui.alert(vu.sop.msg.addFrontDocumentError)
            }
        }
    }
    return true;
};

vu.sop.steps.takePictureDocumentBack = async function() {
    // ----------------------------------------
    // Document Back - SOP addBack
    //
    if (vu.sop.addBackRequired) {
        while (true) {
            try {
                backDocumentImg = await vu.sop.document.ui.start('back');
                vu.sop.ui.addBackImg = backDocumentImg;
                await vu.sop.ui.showLoading()
                response = await vu.sop.api.addBack(vu.sop.userNameValue,
                    vu.sop.operationIdValue,
                    backDocumentImg);

                if (response.code != 912) {
                    if (response.code === 913) {
                        throw new Error('addBackApiErrorAntiSpoofing')
                    } else if (response.code === 914) {
                        throw new Error('addBackApiErrorFrontAlreadyExist')
                    } else {
                        throw new Error('addBackApiError')
                    }
                }

                if ("addDocumentPictureRequired" in response) {
                    if (response.addDocumentPictureRequired) {
                        console.log("addDocumentPicture is Required")
                        if (!response.documentPictureDetected) {
                            throw new Error('documentPictureNotDetected')
                        }
                    }
                }
                if ( vu.sop.barcodeOptional === false ) {
                    if ("containsBarcode" in response) {
                        if (response.containsBarcode) {
                            console.log("barcode is Required")
                            if(!response.barcodeDetected) {
                                throw new Error('documentBarcodeNotDetected')
                            }
                        }
                    }
                }
                console.log(response)
                await vu.sop.ui.hideLoading()
                break
            } catch (e) {
                await vu.sop.ui.hideLoading()
                console.log('vu.sop.ui.addBack', e)
                if (e.message === 'addBackApiError') {
                    vu.sop.audio.play(vu.sop.audio.addBackDocumentComunicationError)
                    await vu.sop.ui.alert(vu.sop.msg.addBackDocumentComunicationError)
                } else if (e.message === 'documentPictureNotDetected'){
                    vu.sop.audio.play(vu.sop.audio.addBackDocumentPictureNotDetected)
                    await vu.sop.ui.alert(vu.sop.msg.addBackDocumentPictureNotDetected)
                } else if (e.message === 'documentBarcodeNotDetected'){
                    vu.sop.audio.play(vu.sop.audio.addBackDocumentBarcodeNotDetected)
                    await vu.sop.ui.alert(vu.sop.msg.addBackDocumentBarcodeNotDetected)
                } else if (e.message === 'addBackApiErrorAntiSpoofing'){
                    vu.sop.audio.play(vu.sop.audio.addBackApiErrorAntiSpoofing)
                    await vu.sop.ui.alert(vu.sop.msg.addBackApiErrorAntiSpoofing)
                } else if (e.message === 'addBackApiErrorFrontAlreadyExist'){
                    vu.sop.audio.play(vu.sop.audio.addBackApiErrorFrontAlreadyExist)
                    await vu.sop.ui.alert(vu.sop.msg.addBackApiErrorFrontAlreadyExist)
                } else {
                    vu.sop.audio.play(vu.sop.audio.addBackDocumentError)
                    await vu.sop.ui.alert(vu.sop.msg.addBackDocumentError)
                }
            }
        }
    }
    return true;
};

vu.sop.faceModelLoad = false;
vu.sop.steps.loadLibsAndCameraFace = async function() {
   while (true) {
        if (vu.sop.disableBiometric) { break }
        try {
            await vu.sop.ui.showLoading();
            vu.sop.videoResizeRules = 'face'
            vu.sop.videoResizeObserver.disconnect()
            vu.sop.videoResizeObserver.observe(document.getElementById('vu.sop.ui.videoContainer'));

            //vu.camera.setSharpness('lowest')
            //vu.camera.setZoom(1)
            //await faceLoadPromise;
            vu.camera.config.orientation = 'user'
            vu.camera.config.previewResolution = 'lowest'
            vu.camera.config.pictureResolution = 'lowest'
            vu.camera.config.pictureForceLandscape = false;
            vu.camera.config.pictureFlash = false;
            await vu.camera.start("vu.sop.ui.video");
            vu.sop.ui.flipVideoHorizontal(vu.camera.video)
            if (vu.sop.preCacheFaceModelAsync) {
                await vu.sop.preCacheFaceModelPromise;
            }
            await vu.face.load(vu.camera.video);
            break
        } catch (e) {
            await vu.sop.ui.hideLoading()
            if (e.message === 'denied') {
                vu.sop.audio.play(vu.sop.audio.cameraDenied)
                await vu.sop.ui.alert(vu.sop.msg.cameraDenied )
            } else if (e.message === 'autoplay') {
                vu.sop.audio.play(vu.sop.audio.cameraAutoplayProtection)
                await vu.sop.ui.alert(vu.sop.msg.cameraAutoplayProtection)
            } else if (e.message === 'registerApiError') {
                vu.sop.audio.play(vu.sop.audio.faceComunicationErrorRegister)
                await vu.sop.ui.alert(vu.sop.msg.faceComunicationErrorRegister)
            } else if (e.message === 'endOpApiError') {
                vu.sop.audio.play(vu.sop.audio.faceComunicationErrorEndOperation)
                await vu.sop.ui.alert(vu.sop.msg.faceComunicationErrorEndOperation)
            } else {
                vu.sop.audio.play(vu.sop.audio.faceError)
                await vu.sop.ui.alert(vu.sop.msg.faceError)
            }
        }
   }
};


vu.sop.steps.authFace = async function() {
    // Do face
    while (true) {
        if (vu.sop.disableBiometric) {
            break
        }
        try {
            await vu.sop.ui.hideLoading();
            if (vu.sop.useGestures) {
                await vu.face.ui.gestures.start();
                pictures = await vu.face.ui.gestures.challengeStart();
            } else {
                await vu.face.ui.start();
                pictures = await vu.face.ui.challengeStart();
            }

            await vu.sop.ui.showLoading()
            picture = pictures[pictures.length-1]
            response = await vu.sop.api.register(vu.sop.userNameValue,
                vu.sop.operationIdValue,
                picture);
            if (response.code != 932) {
                if (response.code === 935) {
                    throw new Error('faceNoDocFrontImg')
                } else if (response.code === 935) {
                    throw new Error('faceNoSelfieFrontImg')
                } else {
                    throw new Error('registerApiError')
                }
            }
            response = await vu.sop.api.endOperation(vu.sop.userNameValue,
                vu.sop.operationIdValue)

            if (response.code != 903) {
                if (response.code === 904) {
                    throw new Error('endOpApiBadScore')
                } else if (response.code === 2001) {
                    throw new Error('endOpApiBiometricFail')
                } else if (response.code === 905) {
                    throw new Error('endOpApiDocumentDataError')
                } else if (response.code === 1907) {
                    throw new Error('endOpApiDocumentBackFrontError')
                } else if (response.code === 1910) {
                    throw new Error('endOpApiDocumentBarcodeDoNotExist')
                } else if (response.code === 1911) {
                    throw new Error('endOpApiDocumentExpired')
                } else if (response.code === 1913) {
                    throw new Error('endOpApiPersonDataFail')
                } else {
                    throw new Error('endOpApiError')
                }
            }

            await vu.sop.ui.hideLoading()
            break
        } catch (e) {
            await vu.sop.ui.hideLoading()
            console.log(e)
            if (e.message === 'denied') {
                vu.sop.audio.play(vu.sop.audio.cameraDenied);
                await vu.sop.ui.alert(vu.sop.msg.cameraDenied );
            } else if (e.message === 'autoplay') {
                vu.sop.audio.play(vu.sop.audio.cameraAutoplayProtection);
                await vu.sop.ui.alert(vu.sop.msg.cameraAutoplayProtection);
            } else if (e.message === 'faceNoDocFrontImg') {
                vu.sop.audio.play(vu.sop.audio.faceNoDocFrontImg);
                await vu.sop.ui.alert(vu.sop.msg.faceNoDocFrontImg);
            } else if (e.message === 'faceNoSelfieFrontImg') {
                vu.sop.audio.play(vu.sop.audio.faceNoSelfieFrontImg);
                await vu.sop.ui.alert(vu.sop.msg.faceNoSelfieFrontImg);
            } else if (e.message === 'registerApiError') {
                vu.sop.audio.play(vu.sop.audio.faceComunicationErrorRegister);
                await vu.sop.ui.alert(vu.sop.msg.faceComunicationErrorRegister);
            } else if (e.message === 'endOpApiBadScore') {
                vu.sop.audio.play(vu.sop.audio.endOpApiBadScore);
                await vu.sop.ui.alert(vu.sop.msg.endOpApiBadScore);
            } else if (e.message === 'endOpApiDocumentDataError') {
                vu.sop.audio.play(vu.sop.audio.endOpApiDocumentDataError);
                await vu.sop.ui.alert(vu.sop.msg.endOpApiDocumentDataError);
            } else if (e.message === 'endOpApiDocumentBackFrontError') {
                vu.sop.audio.play(vu.sop.audio.endOpApiDocumentBackFrontError);
                await vu.sop.ui.alert(vu.sop.msg.endOpApiDocumentBackFrontError);
            } else if (e.message === 'endOpApiDocumentBarcodeDoNotExist') {
                vu.sop.audio.play(vu.sop.audio.endOpApiDocumentBarcodeDoNotExist);
                await vu.sop.ui.alert(vu.sop.msg.endOpApiDocumentBarcodeDoNotExist);
            } else if (e.message === 'endOpApiDocumentExpired') {
                vu.sop.audio.play(vu.sop.audio.endOpApiDocumentExpired);
                await vu.sop.ui.alert(vu.sop.msg.endOpApiDocumentExpired);
            } else if (e.message === 'endOpApiPersonDataFail') {
                vu.sop.audio.play(vu.sop.audio.endOpApiPersonDataFail);
                await vu.sop.ui.alert(vu.sop.msg.endOpApiPersonDataFail);
            } else if (e.message === 'endOpApiError') {
                vu.sop.audio.play(vu.sop.audio.faceComunicationErrorEndOperation);
                await vu.sop.ui.alert(vu.sop.msg.faceComunicationErrorEndOperation );
            } else if (e.message === 'endOpApiBiometricFail') {
                vu.sop.audio.play(vu.sop.audio.faceNoSelfieFrontImg);
                await vu.sop.ui.alert(vu.sop.msg.faceNoSelfieFrontImg );
            } else {
                vu.sop.audio.play(vu.sop.audio.faceError);
                await vu.sop.ui.alert(vu.sop.msg.faceError );
            }
            return new Error(e.message)
        }
    }
    // TODO - Testiar y mejorar
    if (vu.sop.disableBiometric) {
        response = await vu.sop.api.endOperation(vu.sop.userNameValue,
            vu.sop.operationIdValue)
        if (response.code != 1907 &&
            response.code != 903) {
            vu.sop.audio.play(vu.sop.audio.faceError)
            await vu.sop.ui.alert(vu.sop.msg.faceError)
        }
    }
    return response
};

vu.sop.steps.captureSelfie = async function() {
    b64 = [];
    try {
        // Prepara la camara y librerias para reconocimiento
        await vu.sop.steps.loadLibsAndCameraFace();
        
        // Oculta las pantallas de Loading y muestra el video
        await vu.sop.ui.hideWhiteLoading();
        await vu.sop.ui.hideLoading();
        await vu.sop.ui.showVideo();
        
        if (vu.sop.useGestures) {
            await vu.face.ui.gestures.start();
            pictures = await vu.face.ui.gestures.challengeStart();
        } else {
            await vu.face.ui.start();
            pictures = await vu.face.ui.challengeStart();
        }
        
        //Parcea para obtener el base64 limpio
        for(let picture of pictures) {
            b64.push(picture.split(",")[1])
        }      

        //Detiene la camara
        vu.camera.stream.getTracks().forEach(function(track) {
            track.stop();
        });

        return b64;

    } catch (e) {
        throw new Error(e.message)
    };
};

vu.sop.loadingImgSrcDefault = "data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJjb2ciIGNsYXNzPSJzdmctaW5saW5lLS1mYSBmYS1jb2cgZmEtdy0xNiIgcm9sZT0iaW1nIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik00ODcuNCAzMTUuN2wtNDIuNi0yNC42YzQuMy0yMy4yIDQuMy00NyAwLTcwLjJsNDIuNi0yNC42YzQuOS0yLjggNy4xLTguNiA1LjUtMTQtMTEuMS0zNS42LTMwLTY3LjgtNTQuNy05NC42LTMuOC00LjEtMTAtNS4xLTE0LjgtMi4zTDM4MC44IDExMGMtMTcuOS0xNS40LTM4LjUtMjcuMy02MC44LTM1LjFWMjUuOGMwLTUuNi0zLjktMTAuNS05LjQtMTEuNy0zNi43LTguMi03NC4zLTcuOC0xMDkuMiAwLTUuNSAxLjItOS40IDYuMS05LjQgMTEuN1Y3NWMtMjIuMiA3LjktNDIuOCAxOS44LTYwLjggMzUuMUw4OC43IDg1LjVjLTQuOS0yLjgtMTEtMS45LTE0LjggMi4zLTI0LjcgMjYuNy00My42IDU4LjktNTQuNyA5NC42LTEuNyA1LjQuNiAxMS4yIDUuNSAxNEw2Ny4zIDIyMWMtNC4zIDIzLjItNC4zIDQ3IDAgNzAuMmwtNDIuNiAyNC42Yy00LjkgMi44LTcuMSA4LjYtNS41IDE0IDExLjEgMzUuNiAzMCA2Ny44IDU0LjcgOTQuNiAzLjggNC4xIDEwIDUuMSAxNC44IDIuM2w0Mi42LTI0LjZjMTcuOSAxNS40IDM4LjUgMjcuMyA2MC44IDM1LjF2NDkuMmMwIDUuNiAzLjkgMTAuNSA5LjQgMTEuNyAzNi43IDguMiA3NC4zIDcuOCAxMDkuMiAwIDUuNS0xLjIgOS40LTYuMSA5LjQtMTEuN3YtNDkuMmMyMi4yLTcuOSA0Mi44LTE5LjggNjAuOC0zNS4xbDQyLjYgMjQuNmM0LjkgMi44IDExIDEuOSAxNC44LTIuMyAyNC43LTI2LjcgNDMuNi01OC45IDU0LjctOTQuNiAxLjUtNS41LS43LTExLjMtNS42LTE0LjF6TTI1NiAzMzZjLTQ0LjEgMC04MC0zNS45LTgwLTgwczM1LjktODAgODAtODAgODAgMzUuOSA4MCA4MC0zNS45IDgwLTgwIDgweiI+PC9wYXRoPjwvc3ZnPg==";
vu.sop.loadingImgSrc = '';
vu.sop.loadingImgStyle = '';

vu.sop.createLoadingImg = async function() {
    var imgElem = document.createElement("img");
    //Si no se asigno una imagen a la carga, asigna la imagen por defecto
    if(!vu.sop.loadingImgSrc) {
        imgElem.src = vu.sop.loadingImgSrcDefault;
        imgElem.className = "vu.sop.ui.loadingImg";
    } else {
        imgElem.src = vu.sop.loadingImgSrc;
        imgElem.style = vu.sop.loadingImgStyle;
    }
    
    //Agrega la imagen al html
    document.getElementById("vu.sop.ui.whiteLoadingImg").appendChild(imgElem);
    document.getElementById("vu.sop.ui.loadingImg").appendChild(imgElem.cloneNode());
}
