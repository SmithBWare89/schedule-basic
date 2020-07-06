// Global Variables
var items = {};
var momentTime = moment();

// AM Event Listeners
var NineAMEl = document.querySelector("#NineAM");
var TenAMEl = document.querySelector("#TenAM");
var ElevenAMEl = document.querySelector("#ElevenAM");

// PM Event Listeners
var TwelvePMEl = document.querySelector("#TwelvePM");
var OnePMEl = document.querySelector("#OnePM");
var TwoPMEl = document.querySelector("#TwoPM");
var ThreePMEl = document.querySelector("#ThreePM");
var FourPMEl = document.querySelector("#FourPM");
var FivePMEl = document.querySelector("#FivePM");

function idCapture() {
    if (buttonClicked) {
        buttonClicked = null;
    }
    return buttonClicked = $(event.target).attr('id');
};


// AM Event Listeners
NineAMEl.addEventListener("click", idCapture);
TenAMEl.addEventListener("click", idCapture);
ElevenAMEl.addEventListener("click", idCapture);

//   PM Event Listeners
TwelvePMEl.addEventListener("click", idCapture);
OnePMEl.addEventListener("click", idCapture);
TwoPMEl.addEventListener("click", idCapture);
ThreePMEl.addEventListener("click", idCapture);
FourPMEl.addEventListener("click", idCapture);
FivePMEl.addEventListener("click", idCapture);