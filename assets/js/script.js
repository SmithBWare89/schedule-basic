// Global Variables
var items = {};
var buttonClicked;
var text;
var hourClicked;
var quarterHourClicked;
var time;
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

function loadItems(){
    $("#dailyMoment").text(momentTime.format("dddd, MMMM Do YYYY"));
    
    // Parse items key from localStorage
    items = JSON.parse(localStorage.getItem("items"));    
    // If there are no items in localStorage then define items
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

    if (momentTime.format("MMMM Do YYYY") > items.momentTime){
        $(".card .list-group").remove("li");
        localStorage.clear();
    }

    $.each(items, function(list, arr, index){
        console.log(list, arr);
        arr.forEach(function(items){
            createItems(items.item, items.timestamp, list);
        });
    });

    // $(".card .list-group").each(function(){
    //     auditItems(this);
    // });
};

function saveItems() {
    localStorage.setItem("items", JSON.stringify(items));
}

function createItems(itemText, time, itemButton) {
    var itemLi = $("<li>")
        .attr("class", "list-group-item w-100 border-dark");
    var itemP = $("<p>")
        .attr("class", "m-1 w-75 item-text")
        .text(itemText);
    var itemSpan = $("<span>")
        .attr("class", "badge badge-dark")
        .attr('id', 'item-time')
        .text(time);
    var trashCanButton = $("<button>")
        .attr("class", "btn btn-danger")
        .attr("id", "trashCan");
    var trashCanIcon = $("<span>")
        .addClass("oi oi-trash");
    
    trashCanButton.append(trashCanIcon)

    itemLi.append(itemSpan, itemP, trashCanButton);

    $("#item-" + itemButton)
        .append(itemLi);

    // Save Item
    saveItems();
    return auditNewItem();
};

function idCapture() {
    if (buttonClicked) {
        buttonClicked = null;
    }
    return buttonClicked = $(event.target).attr('id');
};

$(".card .list-group").on("click", "p", function() {
    // Convert p tag into javascript object
    text = $(this)
      .text()
      .trim();
    // creating dynamic elements
    var textInput = $("<textarea>")
      .addClass("form-control w-75 edit-text")
      .val(text);
      // Replaces the p from Add Task with textarea element
    $(this).replaceWith(textInput);
    // Adds blue blur around input textarea
    textInput.trigger("focus");
    // // Selects all of the innerHTML text
    textInput.trigger("select");
  });

$(".card .list-group").on("blur", "textarea", function(){
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

    // Converts textarea back into a p element
    console.log(text)
    var taskP = $("<p>")
    .addClass("m-1 w-75 item-text")
    .text(text);

// replace textArea with recreated p element
$(".list-group textarea").replaceWith(taskP);

//     $(".saveBtn").on("click", function() {
// })

saveItems();
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
        $("#hourModal").text($(this).text());
        hourClicked = $("#hourModal").text();
    });

    // Replaces text of modal minutes dropdown
    function handler(event) {
        // set variable to equal the li clicked
        var target = $(event.target);
        // replace dropdown text with the text of the li clicked
        $("#minutesModal").text($(target).text());
        quarterHourClicked = $("#minutesModal").text();
    }

    // Listens for click on minutes option
    $(".dropdown-menu #topHour").click(handler);
    $(".dropdown-menu #quarterPast").click(handler);
    $(".dropdown-menu #halfPast").click(handler);
    $(".dropdown-menu #quarterTo").click(handler);
});

// save button in modal was clicked
$("#item-form-modal .btn-save").click(function() {
        // get form values
        var itemText = $("#modalItemDescription").val();
        time = moment().set('hour', hourClicked).set('minute', quarterHourClicked);
        var date = moment().format("MMMM Do YYYY")
        var itemTime = time.format("h:mm A");

        if (itemText) {
        createItems(itemText, itemTime, buttonClicked);
    
        // close modal
        $("#item-form-modal").modal("hide");
    
        // save in tasks array
        items[buttonClicked].push({
            item: itemText,
            timestamp: itemTime,
            momentTime: date
        });
    
          saveItems();
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
        hourOption.text("13").attr('id', 'hourSelected');
        return $(".hour-dropdown").append(hourOption);
    } else if (buttonClicked === "TwoPM") {
        hourOption.text("14").attr('id', 'hourSelected');
        return $(".hour-dropdown").append(hourOption);
    } else if (buttonClicked === "ThreePM") {
        hourOption.text("15").attr('id', 'hourSelected');
        return $(".hour-dropdown").append(hourOption);
    } else if (buttonClicked === "FourPM") {
        hourOption.text("16").attr('id', 'hourSelected');
        return $(".hour-dropdown").append(hourOption);
    } else if (buttonClicked === "FivePM") {
        hourOption.text("17").attr('id', 'hourSelected');
        return $(".hour-dropdown").append(hourOption);
    }
}

function auditNewItem() {
    var item = $(".card .list-group");
    var itemLi = (item.find("li"));
    var itemTime = $(item).find("span").text().trim();
    var itemMoment = moment(itemTime, "h:mm A");
    var currentTime = moment();

    if (currentTime.subtract(30, 'minutes') <= itemMoment) {
        itemLi.addClass("future");
    } else if (currentTime.subtract(30, 'minutes') >= itemMoment) {
        itemLi.addClass("present");
    } else if (currentTime.isAfter(itemMoment)) {
        itemLi.addClass("past");
    }
}

// function auditItems(itemEl) {
//     var itemTime = $(itemEl).find("span").text().trim();
//     var itemMoment = moment(itemTime, "h:mm A");
//     var currentTime = moment();

//     var itemLi = $(itemEl).find("li");

//     if (currentTime.subtract(30, 'minutes') <= itemMoment) {
//         itemLi.addClass("future");
//     } else if (currentTime.isBefore(itemMoment)){
//         itemLi.addClass("present");
//     } else {
//         itemLi.addClass("past");
//     }
// }

setInterval(function() {
    $(".card .list-group").each(function(){
        var itemTime = $(".card .list-group").find("span").text().trim();
        var itemMoment = moment(itemTime, "h:mm A");
        var currentTime = moment();
    
        var itemLi = $(".list-group-item");

        if (currentTime.subtract(30, 'minutes') >= itemMoment) {
            if (itemLi.classList.contains("future")){
                itemLi.classList.remove("future");
                return itemLi.classList.add("present");
            } else {
                itemLi.classList.add("present");
            }
        } else if (currentTime.isAfter(itemMoment)) {
            if (itemLi.classList.contains("present")) {
                itemLi.classList.remove("present");
                return itemLi.classList.add("past");
            } else if (itemLi.classList.contains("future")) {
                itemLi.classList.remove("future");
                return itemLi.classList.add("past");
            } else {
                itemLi.classList.add("past");
            }
        }
    });
}, 1000);

loadItems();

// AM Event Listeners
  NineAMEl.addEventListener("click", idCapture);
  TenAMEl.addEventListener("click", idCapture);
  ElevenAMEl.addEventListener("click", idCapture);

// PM Event Listeners
  TwelvePMEl.addEventListener("click", idCapture);
  OnePMEl.addEventListener("click", idCapture);
  TwoPMEl.addEventListener("click", idCapture);
  ThreePMEl.addEventListener("click", idCapture);
  FourPMEl.addEventListener("click", idCapture);
  FivePMEl.addEventListener("click", idCapture);

// Trash Can Event Listener
    $("body").on("click", "#trashCan", function(){
        var arrName = $(this)
        .closest(".card .list-group")
        .attr("id")
        .replace("item-", "");
        console.log(arrName)

        var index = $(this)
            .closest("li")
            .index();
        console.log(index)
    
        sliceArray(index, arrName);
        $(this).closest("li").remove();
    })
    
function sliceArray (index, arrName) {
    var slicedArray;
    // if the index of the li is 0
    if (index === 0 && items[arrName].length === index) {
        // slice the first index
        slicedArray = items[arrName].slice();
        // set the new items array to equal the sliced array
        items[arrName] = slicedArray;
        return saveItems();
    }
    else if (index === 0 && items[arrName].length > 0){
        // slice everything after the first index
        slicedArray = items[arrName].slice([index + 1]);
        // set the new items array to equal the sliced array
        items[arrName] = slicedArray;
        return saveItems();
    }
    // else if the index of the li is equal to the index of the last item in the array
    else if(items[arrName].length - 1 === index) {
        // remove the last item in the array
        items[arrName].pop();
        // save the new array in localStorage
        return saveItems();
    } 
    // else if the item within the array is neither the first or last item
    else if (index > 0 && index < items[arrName].length) {
        // slice everything up until the items index
        var firstSlice = items[arrName].slice(0, index);
        // slice everything after the items index
        slicedArray = items[arrName].slice(index + 1);
        // concatenate the two new objects into one array
        var concatArray = firstSlice.concat(slicedArray);
        // set the items array to be the new concatenated array
        items[arrName] = concatArray;
        // save in localStorage
        return saveItems();
    }
}