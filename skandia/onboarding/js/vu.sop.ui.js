if (typeof vu == "undefined") { vu = function() {} }

if (typeof vu.sop == "undefined") { vu.sop = function() {} }

if (typeof vu.sop.ui == "undefined") { vu.sop.ui = function() {} }

//---------------------------------------------------
// Generic
//---------------------------------------------------

vu.sop.ui.alertResolve = null
vu.sop.ui.alert = async function(msg) {
    let promise = new Promise(function(resolve, reject) {
        vu.sop.ui.show('vu.sop.ui.alert')
        document.getElementById('vu.sop.ui.alertText').innerHTML = msg
        vu.sop.ui.alertResolve = resolve
    });
    return promise
};

vu.sop.ui.alertClose = function() {
    vu.sop.ui.hide('vu.sop.ui.alert')
    vu.sop.ui.alertResolve(true)
}

vu.sop.ui.disabled =  async function(id){
    return document.getElementById(id).disabled  = true;
};

vu.sop.ui.enable =  async function(id){
    return document.getElementById(id).disabled  = false;
};

vu.sop.ui.hide =  async function(id){
    return document.getElementById(id).style.display = "none";
};

vu.sop.ui.show =  async function(id){
    return document.getElementById(id).style.display = "block";
};

vu.sop.ui.showWhiteLoading = async function() {
    return await vu.sop.ui.show('vu.sop.ui.whiteLoading');
};

vu.sop.ui.hideWhiteLoading = async function() {
    return await vu.sop.ui.hide('vu.sop.ui.whiteLoading');
};

vu.sop.ui.showLoading = async function() {
    return await vu.sop.ui.show("vu.sop.ui.loading");
};

vu.sop.ui.hideLoading = async function() {
    return await vu.sop.ui.hide("vu.sop.ui.loading");
};

vu.sop.ui.showVideo = async function() {
    return await vu.sop.ui.show("vu.sop.ui.videoContainer");
};

vu.sop.ui.showBottomText = async function(text) {
    document.getElementById("vu.sop.ui.bottomText").innerHTML = text;
    await vu.sop.ui.show("vu.sop.ui.bottomText");
};

vu.sop.ui.hideBottomText = async function() {
    return await vu.sop.ui.hide("vu.sop.ui.bottomText");
};

vu.sop.ui.bottomTextBackGroundColor = function(color) {
    document.getElementById("vu.sop.ui.bottomText").style.backgroundColor = color;
};

vu.sop.ui.bottomTextFontFamily = function(fontFamily) {
    document.getElementById("vu.sop.ui.bottomText").style.fontFamily = fontFamily;
};

vu.sop.ui.bottomTextFontSize = function(fontSize) {
    document.getElementById("vu.sop.ui.bottomText").style.fontSize = fontSize;
};

vu.sop.ui.bottomTextColor = function(color) {
    document.getElementById("vu.sop.ui.bottomText").style.color = color;
};

vu.sop.ui.flash = async function() {
    document.getElementById('vu.sop.ui.flash').style.display = "block";
    await vu.sop.ui.sleep(100)
    document.getElementById('vu.sop.ui.flash').style.display = "none";
    return true;
};

vu.sop.ui.sleep = function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

vu.sop.ui.flipVideoHorizontal = function(videoElement) {
    videoElement.style.WebkitTransform = "translate(-50%, -50%) rotateY(180deg)";
    videoElement.style.msTransform = "translate(-50%, -50%) rotateY(180deg)";
    videoElement.style.transform = "translate(-50%, -50%) rotateY(180deg) ";
};

vu.sop.ui.keepVideoHorizontal = function(videoElement) {
    videoElement.style.WebkitTransform = "translate(-50%, -50%) rotateY(0deg)";
    videoElement.style.msTransform = "translate(-50%, -50%) rotateY(0deg)";
    videoElement.style.transform = "translate(-50%, -50%) rotateY(0deg)";
};

vu.sop.ui.isMobile = function() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // true for mobile device
        return true
    } else {
        // false for not mobile device
        return false
    }
}


vu.sop.ui.isDeviceCompatible = function() {
    const gl2 = document.createElement('canvas').getContext('webgl2');
    if (gl2) {
        console.log('webgl2 works!');
        return true
    }
    const gl1 = document.createElement('canvas').getContext('webgl');
    if (gl1) {
        floatExt = gl1.getExtension("OES_TEXTURE_FLOAT");
        if (floatExt) {
            console.log('webgl1 and support OES_TEXTURE_FLOAT!');
            return true
        }
        halfFloatExt = gl1.getExtension("OES_TEXTURE_HALF_FLOAT");
        if (halfFloatExt) {
            console.log('webgl1 and support OES_TEXTURE_HALF_FLOAT!');
            return true
        }
    }
    return false
}

vu.sop.ui.isBrowserCompatible = function() {
    const { userAgent } = navigator
    if(userAgent.includes('Chrome/')) {
        var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
        chromeVersion =  raw ? parseInt(raw[2], 10) : false;
        console.log('Browser is Chrome', chromeVersion)
        if (chromeVersion < 87) {
            throw new Error('browserOldVersion')
        }
    } else if(userAgent.includes('Safari/')) {
        safariVersion = parseInt(userAgent.split('Safari/')[1])
        console.log('Browser is Safari', safariVersion)
        if (/iP(hone|od|ad)/.test(navigator.platform)) {
            var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
            iosVersion = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
            console.log('SO Version', iosVersion)
            if (iosVersion[0] > 14) {
                throw new Error('osOldVersion')
            }
            if (iosVersion[0] === 14) {
                if (iosVersion[1] > 3) {
                    throw new Error('osOldVersion')
                }
            }
        }
        if (safariVersion > 604) {
            throw new Error('browserOldVersion')
        }
    } else if(userAgent.includes('Firefox/')){
        firefoxVersion = parseInt(userAgent.split('Firefox/')[1])
        console.log('Browser is Firefox', firefoxVersion)
        if (firefoxVersion < 84) {
            throw new Error('browserOldVersion')
        }
    } else if (userAgent.includes('Edg/')) {
        edgeVersion = parseInt(userAgent.split('Edg/')[1])
        console.log('Browser is Microsoft Edge', edgeVersion)
        if (edgeVersion < 87) {
            throw new Error('browserOldVersion')
        }
    } else {
        throw new Error('browserUnsupported')
    }
}


//---------------------------------------------------
// Username
//---------------------------------------------------

if (typeof vu.sop.ui.user == "undefined") { vu.sop.ui.user = function() {} }

vu.sop.ui.user.start = async function() {
    await vu.sop.ui.show("vu.sop.ui.userContainer");
    let promise = new Promise(function(resolve, reject) {
        vu.sop.ui.user.start.resolve = resolve
        vu.sop.ui.user.start.reject = reject
    });
    return promise;
};

vu.sop.ui.user.start.resolve = null;
vu.sop.ui.user.start.reject = null;

vu.sop.ui.user.hide = async function() {
    return await vu.sop.ui.hide("vu.sop.ui.userContainer");
};

vu.sop.ui.user.do  = async function() {
    await vu.sop.ui.disabled('vu.sop.ui.userNameSendBtn');
    await vu.sop.ui.showWhiteLoading();
    let userName = document.getElementById("vu.sop.ui.userName").value;
    vu.sop.userNameValue = userName;
    try {
        response = await vu.sop.api.newOperation(userName);
    } catch (error) {
        response = {code: 0, message: vu.sop.msg.userComunicationError}
        //throw new Error(error)
    }

    await vu.sop.ui.hideWhiteLoading();
    if (response.code === 901) {
        await vu.sop.ui.enable('vu.sop.ui.userNameSendBtn')
        vu.sop.operationIdValue = response.operationId;
        await vu.sop.ui.user.hide();
        await vu.sop.ui.showVideo();
        vu.sop.ui.user.start.resolve(true)
        //return true
    } else {
        console.log('newOperation', 'error', response);
        await vu.sop.ui.enable('vu.sop.ui.userNameSendBtn')
        //await vu.sop.ui.alert(response.message);
        vu.sop.ui.user.start.reject('error')
        //throw new Error('error')
    }
};


