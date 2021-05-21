/* Autogenerado por el script update_speech_files.py */
if (typeof vu == "undefined") {vu = function() {}}
if (typeof vu.sop == "undefined") {vu.sop = function() {}}
if (typeof vu.sop.audio == "undefined") {vu.sop.audio = function() {}}

if (typeof vu.sop.audio == "undefined") {
    vu.sop.audio.enabled = true
}

vu.sop.audio.snd = new Audio("data:audio/mp3;base64,"+vu.sop.audio.userError);
vu.sop.audio.play = function (base64) {
   if (vu.sop.audio.enabled) {
       vu.sop.audio.snd.pause();
       vu.sop.audio.snd = new Audio("data:audio/mp3;base64,"+base64);
       vu.sop.audio.snd.play();
   }
}
