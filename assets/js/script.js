// GIVEN I am using a daily planner to create a schedule
// WHEN I open the planner
// THEN the current day is displayed at the top of the calendar
// WHEN I scroll down
// THEN I am presented with timeblocks for standard business hours
// WHEN I view the timeblocks for that day
// THEN each timeblock is color coded to indicate whether it is in the past, present, or future
// WHEN I click into a timeblock
// THEN I can enter an event
// WHEN I click the save button for that timeblock
// THEN the text for that event is saved in local storage
// WHEN I refresh the page
// THEN the saved events persist
var items = {};
var buttonClicked;
var text;
var hourClicked;
var quarterHourClicked;
var time;

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

function loadItems(){
    items = JSON.parse(localStorage.getItem("items"));
    
    if(!items){
        items = {
            NineAM: [],
            TenAM: [],
            ElevenAM: [],
            TwelvePM: [],
            OnePM: [],
            TwoPM: [],
            ThreePM: [],
            FourPM: [],
            FivePM: [],
        };
    }
}

function createItems(itemText, itemButton) {
    var itemLi = $("<li>").addClass("list-group-item w-100");
    var itemP = $("<p>")
        .addClass("m-1")
        .text(itemText);

    itemLi.append(itemP);

    $("#item-" + itemButton).append(itemLi);
}

function idCapture() {
    if (buttonClicked) {
        buttonClicked = null;
    }
    return buttonClicked = $(event.target).attr('id');
}

$(".list-group").on("click", "p", function() {
    // Convert p tag into javascript object
    text = $(this)
      .text()
      .trim();
    // creating dynamic elements
    var textInput = $("<textarea>")
      .addClass("form-control")
      .val(text);
      // Replaces the p from Add Task with textarea element
    $(this).replaceWith(textInput);
    // Adds blue blur around input textarea
    textInput.trigger("focus");
    // // Selects all of the innerHTML text
    textInput.trigger("select");
  });

  $(".list-group").on("blur", "textarea", function(){
    // get the textarea's current value/text when it's clicked on
    text = $(this)
      .val()
      .trim();
  
    // get the parent ul's id attribute
    var status = $(this)
      .closest(".list-group")
      .attr("id")
      .replace("item-", "");
  
    var index = $(this)
      .closest(".list-group-item")
      .index();
  
    items[status][index].item = text;
    
        $(".saveBtn").on("click", function() {
        // Converts textarea back into a p element
        console.log(text)
        var taskP = $("<p>")
        .addClass("m-1")
        .text(text);

    // replace textArea with recreated p element
    $("textarea").replaceWith(taskP);
    })

    // saveTasks();
  });

// modal was triggered
$("#item-form-modal").on("show.bs.modal", function() {
    // clear values
    $("#modalItemDescription").val("");
    $("#hourModal").text("Hour");
    $("#minutesModal").text("Minutes");

    // If the modal hours dropdown's ul length > 0
    if ($(".hour-dropdown").children().length > 0) {
        // remove the child li with id hourSelected
        $("#hourSelected").remove();
    }
});

// modal is fully visible
$("#item-form-modal").on("shown.bs.modal", function() {
    // highlight textarea
    $("#modalItemDescription").trigger("focus");

    // create new Li for hours option
    var hourOption = $("<li>").addClass("dropdown-item");
    hourGenerator(hourOption);

    // replace text "hour" with the hour selected from the dropdown
    $(".dropdown-menu #hourSelected").click(function(){
        $("#hourModal").text($(this).text()) = hourClicked;
    });

    // Replaces text of modal minutes dropdown
    function handler(event) {
        // set variable to equal the li clicked
        var target = $(event.target);
        // replace dropdown text with the text of the li clicked
        $("#minutesModal").text($(target).text()) = quarterHourClicked;
    }

    // Listens for click on minutes option
    $(".dropdown-menu #topHour").click(handler);
    $(".dropdown-menu #quarterPast").click(handler);
    $(".dropdown-menu #halfPast").click(handler);
    $(".dropdown-menu #quarterTo").click(handler);


});

// Drop down that appends options based on the button clicked

// save button in modal was clicked
$("#item-form-modal .btn-save").click(function() {
        // get form values
        var itemText = $("#modalItemDescription").val();
        time = hourClicked + quarterHourClicked;
        // var hourClicked = 
        // var time = 
        if (itemText) {
        createItems(itemText, time, buttonClicked);
    
        // close modal
        $("#item-form-modal").modal("hide");
    
        // save in tasks array
        items[buttonClicked].push({
            item: itemText,
            timestamp: time                         
        });
    
        //   saveTasks();
        }
    });

function hourGenerator(hourOption) {
    if (buttonClicked === "NineAM") {
        hourOption.text("9").attr('id', 'hourSelected');
        return $(".hour-dropdown").append(hourOption);
    } else if (buttonClicked === "TenAM") {
        hourOption.text("10").attr('id', 'hourSelected');
        return $(".hour-dropdown").append(hourOption);
    } else if (buttonClicked === "ElevenAM") {
        hourOption.text("11").attr('id', 'hourSelected');
        return $(".hour-dropdown").append(hourOption);
    } else if (buttonClicked === "TwelvePM") {
        hourOption.text("12").attr('id', 'hourSelected');
        return $(".hour-dropdown").append(hourOption);
    } else if (buttonClicked === "OnePM") {
        hourOption.text("1").attr('id', 'hourSelected');
        return $(".hour-dropdown").append(hourOption);
    } else if (buttonClicked === "TwoPM") {
        hourOption.text("2").attr('id', 'hourSelected');
        return $(".hour-dropdown").append(hourOption);
    } else if (buttonClicked === "ThreePM") {
        hourOption.text("3").attr('id', 'hourSelected');
        return $(".hour-dropdown").append(hourOption);
    } else if (buttonClicked === "FourPM") {
        hourOption.text("4").attr('id', 'hourSelected');
        return $(".hour-dropdown").append(hourOption);
    } else if (buttonClicked === "FivePM") {
        hourOption.text("5").attr('id', 'hourSelected');
        return $(".hour-dropdown").append(hourOption);
    }
}
  loadItems();

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