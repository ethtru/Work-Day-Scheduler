

$(document).ready(function () {
  var today = dayjs().format("dddd, MMMM D, YYYY h:mm A");
  $("#currentDay").text(today);

  $(".saveBtn").on("click", function () {
    console.log("clicked");
    var description = $(this).prev(".description").val();
    var time = $(this).parent().attr("id");
    localStorage.setItem(time, description); // key value pair
  });
  for (var i = 9; i < 18; i++) {
    $("#hour-" + i + " .description").val(localStorage.getItem("hour-" + i));
  }
});

function createTimeBlock(hour, isAM, displayHour) {
  var timeBlock = document.createElement("div");
  timeBlock.id = `hour-${hour}`;
  timeBlock.className = `row time-block ${getTimeBlockClass(hour)}`;

  var hourLabel = document.createElement("div");
  hourLabel.className = "col-2 col-md-1 hour text-center py-3";
  hourLabel.textContent = `${displayHour}${isAM ? "AM" : "PM"}`;

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

console.log(getTimeBlockClass("9"));
function createTimeBlocks() {
  var timeBlockContainer = document.getElementById("time-block-container");

  for (let hour = 9; hour <= 17; hour++) {
    // 9 AM to 5 PM
    var isAM = hour < 12;
    var displayHour = hour <= 12 ? hour : hour - 12;
    var timeBlock = createTimeBlock(hour, isAM, displayHour);
    timeBlockContainer.appendChild(timeBlock);
  }
}
setInterval(createTimeBlocks, 30000);
// Call the function to create time blocks when the page loads
document.addEventListener("DOMContentLoaded", createTimeBlocks);

//try google co-pilot and attach to vs code 
