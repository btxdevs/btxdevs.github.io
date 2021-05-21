if (typeof vu == "undefined") { vu = function() {} }

if (typeof vu.face == "undefined") { vu.face = function() {} }

if (typeof vu.face.auth == "undefined") { vu.face.auth = function() {} }

if (typeof vu.sop == "undefined") { vu.sop = function() {} }

if (typeof vu.sop.audio == "undefined") { vu.sop.audio = function() {} }

vu.face.auth.userNameValue;

vu.face.lang  = 'es';
vu.face.auth.warmUpFaceModelAsync = false;
vu.face.auth.faceOrientationModelWeights = 'BEST';        // VERYLIGHT LIGHT NORMAL BEST

//vu.face.useGestures = false;

vu.face.auth.load = async function(basePath) {
    try {
        let webRTCadapter = vu.face.auth.loadJs(basePath + '/js/libs/webrtc/adapter-latest.js');

        /* Pre conf */
        if (vu.face.useGestures) {
            vu.face.nncPath = basePath + '/js/libs/face/'
        } else {
            console.log('Challenge orientation model', vu.face.auth.faceOrientationModelWeights)
            if ( vu.face.auth.faceOrientationModelWeights == 'VERYLIGHT' ) {
                vu.face.nncPath = basePath + '/js/libs/face/NN_VERYLIGHT_0.json';
            } else if ( vu.face.auth.faceOrientationModelWeights == 'LIGHT' ) {
                vu.face.nncPath = basePath + '/js/libs/face/NN_DEFAULT.json';
            } else if ( vu.face.auth.faceOrientationModelWeights == 'NORMAL' ) {
                vu.face.nncPath = basePath + '/js/libs/face/NN_LIGHT_0.json';
            }  else  {
                vu.face.nncPath = basePath + '/js/libs/face/NN_WIDEANGLES_0.json';
            }
        }

        if ( vu.sop.audio.enabled == false ) {
            console.log("Audio Load is disabled by conf");
            loadAudioLang = false
        } else {
            console.log("Audio Load is enabled by conf");
            loadAudioLang = true
        }

        /* ----------------------------------------------------------------------------- */
        if (loadAudioLang) {
            audioLangLoad =  vu.face.auth.loadJs(basePath + '/js/vu.sop.audio.'+ vu.face.lang +'.js');
        }
        let msgs =  vu.face.auth.loadJs(basePath + '/js/vu.sop.msg.'+ vu.face.lang +'.js');
        let audioLoad =  vu.face.auth.loadJs(basePath + '/js/vu.sop.audio.js');
        let htmlLoad = vu.face.auth.loadHtml(basePath + '/html/face.html');
        let cameraLoad =  vu.face.auth.loadJs(basePath + '/js/vu.camera.js');
        let blurDetectionLoad =  vu.face.auth.loadJs(basePath + '/js/libs/inspector-bokeh/dist/measure_blur.js');
        let sopUILoad =  vu.face.auth.loadJs(basePath + '/js/vu.sop.ui.js');
        let apiLoad =  vu.face.auth.loadJs(basePath + '/js/vu.sop.api.js');
        let faceUiLoad =  vu.face.auth.loadJs(basePath + '/js/vu.face.ui.js');
        
        if (vu.face.useGestures) {
            console.log('Loading challenge gestures')
            faceLoad =  vu.face.auth.loadJs(basePath + '/js/vu.face.gestures.js');
            faceUiGesturesLoad =  vu.face.auth.loadJs(basePath + '/js/vu.face.ui.gestures.js');
            faceLibLoad = vu.face.auth.loadJs(basePath + '/js/libs/face/jeelizFaceTransfer.js');
        } else {
            console.log('Loading challenge orientation')
            faceLoad =  vu.face.auth.loadJs(basePath + '/js/vu.face.orientation.js');
            faceLibLoad = vu.face.auth.loadJs(basePath + '/js/libs/face/jeelizFaceFilter.js');
        }
        /* ----------------------------------------------------------------------------- */

        document.getElementById('vu.sop').innerHTML = await htmlLoad;

        await webRTCadapter;
        await msgs;
        await cameraLoad;
        await blurDetectionLoad;
        await sopUILoad;
        await apiLoad;
        await faceLoad;
        await faceUiLoad;
        await faceLibLoad;
        await audioLoad;
        if (vu.face.useGestures) {
            await faceUiGesturesLoad;
        }
        if (loadAudioLang) {
            await audioLangLoad;
        }

        document.getElementById('vu.sop.ui.userName').placeholder = vu.sop.msg.userInputPlaceholder
        document.getElementById('vu.sop.ui.userNameSendBtn').innerHTML = vu.sop.msg.userSendBtn

        vu.sop.ui.bottomTextBackGroundColor("rgba(0, 0, 0, 0.4)");
        await vu.face.auth.createLoadingImg();

    } catch (e) {
        console.log('Network Loading Error')
        console.log(e)
        throw new Error('NETWORK_ERROR');
    }

    try {
        if (!vu.sop.ui.isDeviceCompatible()) {
            vu.sop.audio.play(vu.sop.audio.deviceNotSupported)
            await vu.sop.ui.alert(vu.sop.msg.deviceNotSupported)
        }
        vu.sop.ui.isBrowserCompatible()
    } catch (e) {
        console.log(e)
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
    };
}

vu.face.auth.loadJs = function(url) {
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

vu.face.auth.loadHtml = function(url) {
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


vu.face.auth.videoResizeObserver = new ResizeObserver(entries => {
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
});

/**************************************/


vu.face.auth.userDo  = async function() {
    await vu.sop.ui.disabled('vu.sop.ui.userNameSendBtn');
    await vu.sop.ui.showWhiteLoading();
    let userName = document.getElementById("vu.sop.ui.userName").value;
    vu.face.auth.userNameValue = userName;
    vu.sop.ui.user.start.resolve(true)
};

vu.face.auth.faceModelLoad = false;
vu.face.auth.start = async function() {
    while (true) {
        try {
            await vu.sop.ui.showWhiteLoading();
            vu.face.auth.videoResizeObserver.observe(document.getElementById('vu.sop.ui.videoContainer'));
            vu.camera.config.orientation = 'user'
            await vu.camera.start("vu.sop.ui.video");
            vu.sop.ui.flipVideoHorizontal(vu.camera.video)
            console.log('Warming Up Start')
            if ( vu.face.auth.warmUpFaceModelAsync ) {
                vu.face.auth.faceModelLoad = vu.face.load(vu.camera.video);
            } else {
                await vu.face.load(vu.camera.video);
            }
            break
        } catch (e) {
            await vu.sop.ui.hideWhiteLoading();
            console.log(e)
            if (e.message === 'denied') {
                vu.sop.audio.play(vu.sop.audio.cameraDenied)
                await vu.sop.ui.alert(vu.sop.msg.cameraDenied )
            } else if (e.message === 'autoplay') {
                vu.sop.audio.play(vu.sop.audio.cameraAutoplayProtection)
                await vu.sop.ui.alert(vu.sop.msg.cameraAutoplayProtection)
            } else {
                vu.sop.audio.play(vu.sop.audio.cameraError)
                await vu.sop.ui.alert(vu.sop.msg.cameraError)
            }
        }
    }


    while (true){
        try {
            await vu.sop.ui.hideLoading();
            await vu.sop.ui.hideWhiteLoading()
            await vu.sop.ui.user.start()
            if ( vu.face.auth.warmUpFaceModelAsync ) { await vu.face.auth.faceModelLoad };
            await vu.sop.ui.user.hide()
            break
        } catch (e) {
            console.log('vu.sop.ui.user', e)
            vu.sop.audio.play(vu.sop.audio.faceComunicationErrorRegister)
            await vu.sop.ui.alert(vu.sop.msg.faceComunicationErrorRegister)
        }
    }

    // ----------------------------------------
    // FACE
    //
    // Do face
    while (true) {
        try {
            await vu.sop.ui.hideLoading();
            await vu.sop.ui.hideWhiteLoading()

            await vu.sop.ui.showVideo()
            if (vu.face.useGestures) {
                await vu.face.ui.gestures.start();
                pictures = await vu.face.ui.gestures.challengeStart();
            } else {
                await vu.face.ui.start();
                pictures = await vu.face.ui.challengeStart();
            }

            await vu.sop.ui.showLoading()
            lastPic = pictures[(pictures.length - 1)]

            response = await vu.sop.api.faceLogin(vu.face.auth.userNameValue,
                lastPic);

            if (response.code == '2003'){
                await vu.sop.ui.hideLoading()
                //await vu.sop.ui.alert('Autenticado! confianza ' + Math.round(response.confidence * 100) + '%')
            }

            await vu.sop.ui.hideLoading()
            break
        } catch (e) {
            await vu.sop.ui.hideLoading()
            console.log(e)
            if (e.code == 1001) {
                vu.sop.audio.play(vu.sop.audio.faceErrorUserNotExist)
                await vu.sop.ui.alert(vu.sop.msg.faceErrorUserNotExist)
            }
            //
            if (e.code === 2001) {
                vu.sop.audio.play(vu.sop.audio.faceErrorFailAuth)
                await vu.sop.ui.alert(vu.sop.msg.faceErrorFailAuth)
            }

            if (e.message === 'denied') {
                vu.sop.audio.play(vu.sop.audio.cameraDenied)
                await vu.sop.ui.alert(vu.sop.msg.cameraDenied)
            }
        }
    }
    //vu.sop.ui.show('vu.sop.ui.endScreen')
    return response

}

vu.face.auth.loadingImgSrcDefault = "data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJjb2ciIGNsYXNzPSJzdmctaW5saW5lLS1mYSBmYS1jb2cgZmEtdy0xNiIgcm9sZT0iaW1nIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik00ODcuNCAzMTUuN2wtNDIuNi0yNC42YzQuMy0yMy4yIDQuMy00NyAwLTcwLjJsNDIuNi0yNC42YzQuOS0yLjggNy4xLTguNiA1LjUtMTQtMTEuMS0zNS42LTMwLTY3LjgtNTQuNy05NC42LTMuOC00LjEtMTAtNS4xLTE0LjgtMi4zTDM4MC44IDExMGMtMTcuOS0xNS40LTM4LjUtMjcuMy02MC44LTM1LjFWMjUuOGMwLTUuNi0zLjktMTAuNS05LjQtMTEuNy0zNi43LTguMi03NC4zLTcuOC0xMDkuMiAwLTUuNSAxLjItOS40IDYuMS05LjQgMTEuN1Y3NWMtMjIuMiA3LjktNDIuOCAxOS44LTYwLjggMzUuMUw4OC43IDg1LjVjLTQuOS0yLjgtMTEtMS45LTE0LjggMi4zLTI0LjcgMjYuNy00My42IDU4LjktNTQuNyA5NC42LTEuNyA1LjQuNiAxMS4yIDUuNSAxNEw2Ny4zIDIyMWMtNC4zIDIzLjItNC4zIDQ3IDAgNzAuMmwtNDIuNiAyNC42Yy00LjkgMi44LTcuMSA4LjYtNS41IDE0IDExLjEgMzUuNiAzMCA2Ny44IDU0LjcgOTQuNiAzLjggNC4xIDEwIDUuMSAxNC44IDIuM2w0Mi42LTI0LjZjMTcuOSAxNS40IDM4LjUgMjcuMyA2MC44IDM1LjF2NDkuMmMwIDUuNiAzLjkgMTAuNSA5LjQgMTEuNyAzNi43IDguMiA3NC4zIDcuOCAxMDkuMiAwIDUuNS0xLjIgOS40LTYuMSA5LjQtMTEuN3YtNDkuMmMyMi4yLTcuOSA0Mi44LTE5LjggNjAuOC0zNS4xbDQyLjYgMjQuNmM0LjkgMi44IDExIDEuOSAxNC44LTIuMyAyNC43LTI2LjcgNDMuNi01OC45IDU0LjctOTQuNiAxLjUtNS41LS43LTExLjMtNS42LTE0LjF6TTI1NiAzMzZjLTQ0LjEgMC04MC0zNS45LTgwLTgwczM1LjktODAgODAtODAgODAgMzUuOSA4MCA4MC0zNS45IDgwLTgwIDgweiI+PC9wYXRoPjwvc3ZnPg==";
vu.face.auth.loadingImgSrc = '';
vu.face.auth.loadingImgStyle = '';

vu.face.auth.createLoadingImg = async function() {
    var imgElem = document.createElement("img");
    
    //Si no se asigno una imagen a la carga, asigna la imagen por defecto
    if(!vu.face.auth.loadingImgSrc) {
        imgElem.src = vu.face.auth.loadingImgSrcDefault;
        imgElem.className = "vu.sop.ui.loadingImg";
    } else {
        imgElem.src = vu.face.auth.loadingImgSrc;
        imgElem.style = vu.face.auth.loadingImgStyle;
    }
    
    //Agrega la imagen al html
    document.getElementById("vu.sop.ui.whiteLoadingImg").appendChild(imgElem);
    document.getElementById("vu.sop.ui.loadingImg").appendChild(imgElem.cloneNode());
}