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
  var hasStorage = localStorage.getItem("schedule");
  if (!hasStorage) {
    localStorage.setItem("schedule", JSON.stringify(hours));
  }

  $("button").on("click", function () {
    var timeBlockId = $(this).parent().attr("id");
    var hourValue = timeBlockId.split("-")[1];
    // console.log(hourValue);
    var storedValue = JSON.parse(localStorage.getItem("schedule"));
    // console.log(storedValue);
    var userInput = $(this).siblings("textarea").val().trim();
    storedValue[hourValue] = userInput;
    localStorage.setItem("schedule", JSON.stringify(storedValue));
  });

  var storedValue = JSON.parse(localStorage.getItem("schedule"));

  $(".time-block").each(function () {
    var hourValue = $(this).attr("id").split("-")[1];
    var textArea = $(this).find("textarea");

    if (storedValue && storedValue[hourValue]) {
      textArea.val(storedValue[hourValue]);
    }
  });

  $(".time-block").each(function () {
    var hour = parseInt($(this).attr("id").split("-")[1]);
    var currentHour = dayjs().format("HH");
    var timeBlockColor = $(this).find("textarea");

    if (hour < currentHour) {
      timeBlockColor.addClass("past");
    } else if (hour === currentHour) {
      timeBlockColor.addClass("present");
    } else {
      timeBlockColor.addClass("future");
    }
  });

  $("#currentDay").text(dayjs().format("MMMM D[th], YYYY"));
});
