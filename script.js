// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});


var today = dayjs().format("dddd, MMMM D, YYYY h:mm A");
$("#currentDay").text(today);


function createTimeBlock(hour, isAM) {
  var timeBlock = document.createElement("div");
  timeBlock.id = `hour-${hour}`;
  timeBlock.className = `row time-block ${getTimeBlockClass(hour)}`;

  var hourLabel = document.createElement("div");
  hourLabel.className = "col-2 col-md-1 hour text-center py-3";
  hourLabel.textContent = `${hour}${isAM ? "AM" : "PM"}`;

  var descriptionTextarea = document.createElement("textarea");
  descriptionTextarea.className = "col-8 col-md-10 description";
  descriptionTextarea.rows = "3";

  const saveButton = document.createElement("button");
  saveButton.className = "btn saveBtn col-2 col-md-1";
  saveButton.setAttribute("aria-label", "save");
  saveButton.innerHTML = '<i class="fas fa-save" aria-hidden="true"></i>';

  timeBlock.appendChild(hourLabel);
  timeBlock.appendChild(descriptionTextarea);
  timeBlock.appendChild(saveButton);

  return timeBlock;
}


function getTimeBlockClass(hour) {
var currentHour = new Date().getHours();
  if (hour < currentHour) {
    return "past";
  } else if (hour === currentHour) {
    return "present";
  } else {
    return "future";
  }
}


function createTimeBlocks() {
  var timeBlockContainer = document.getElementById("time-block-container");

  for (let hour = 9; hour <= 17; hour++) {
    // 9 AM to 5 PM
    var isAM = hour < 12;
    var displayHour = hour <= 12 ? hour : hour - 12;
    var timeBlock = createTimeBlock(displayHour, isAM);
    timeBlockContainer.appendChild(timeBlock);
  }
}

// Call the function to create time blocks when the page loads
document.addEventListener("DOMContentLoaded", createTimeBlocks);
