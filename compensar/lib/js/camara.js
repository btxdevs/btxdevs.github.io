navigator.mediaDevices.getUserMedia({audio: false, video: true}).then((stream)=>{
    console.log(stream)

}).catch((err)=>console.log(err))