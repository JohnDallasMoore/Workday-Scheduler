//object for local storage
var hours = {
  9: "",
  10: "",
  11: "",
  12: "",
  13: "",
  14: "",
  15: "",
  16: "",
  17: "",
};

$(function () {
  //Checks for existing items in local storage or uses hours object
  var hasStorage = localStorage.getItem("schedule");
  if (!hasStorage) {
    localStorage.setItem("schedule", JSON.stringify(hours));
  }

  //saves user input from text area to local storage when save button is clicked
  $("button").on("click", function () {
    var timeBlockId = $(this).parent().attr("id");
    var hourValue = timeBlockId.split("-")[1];
    var storedValue = JSON.parse(localStorage.getItem("schedule"));
    var userInput = $(this).siblings("textarea").val().trim();
    storedValue[hourValue] = userInput;
    localStorage.setItem("schedule", JSON.stringify(storedValue));
  });

  //retrieves user input from local storage and places into text area
  var storedValue = JSON.parse(localStorage.getItem("schedule"));

  $(".time-block").each(function () {
    var hourValue = $(this).attr("id").split("-")[1];
    var textArea = $(this).find("textarea");

    if (storedValue && storedValue[hourValue]) {
      textArea.val(storedValue[hourValue]);
    }
  });

  //evaluates current time to change text area color based on past, present or future time blocks
  $(".time-block").each(function () {
    var hour = parseInt($(this).attr("id").split("-")[1]);
    var currentHour = parseInt(dayjs().format("HH"));
    var timeBlockColor = $(this).find("textarea");

    if (hour < currentHour) {
      timeBlockColor.addClass("past");
    } else if (hour === currentHour) {
      timeBlockColor.addClass("present");
    } else {
      timeBlockColor.addClass("future");
    }
  });

  //sets the current date under page title
  $("#currentDay").text(dayjs().format("MMMM D[th], YYYY"));
});
