var lastIndex = 0;
showData();
$("#sendWish").submit(function (e) {
  e.preventDefault();
  var name = $("#name").val();
  var content = $("#contentWish").val();
  var data = {
    name: name,
    content: content,
  };
  $("#thanks").fadeIn(500);
  setTimeout(() => {
    var firstDiv = $("#wishWrapper div:first-child");
    if (firstDiv.hasClass("bg")) {
      $("#wishWrapper div:first-child").before(`<div class="wish-box-item">
																<strong>${name}</strong>
																<p>${content}</p>
															</div>`);
    } else {
      $("#wishWrapper div:first-child").before(`<div class="wish-box-item bg">
																<strong>${name}</strong>
																<p>${content}</p>
															</div>`);
    }
    $("#name").val("");
    $("#contentWish").val("");
  }, 500);
  $.ajax({
    type: "post",
    url: "/sendWish",
    data: data,
    success: function (response) {},
  });
});

function showData() {
  $("#wishWrapper").html("");
  $.ajax({
    type: "get",
    url: "/listWish",
    success: function (response) {
      let stringResult = "";
      response.forEach((item, index) => {
        if (index % 2 == 0) {
          stringResult += `<div class="wish-box-item">
															<strong>${item.name}</strong>
															<p>${item.content}</p>
														</div>`;
        } else {
          stringResult += `<div class="wish-box-item bg">
															<strong>${item.name}</strong>
															<p>${item.content}</p>
														</div>`;
        }
      });
      $("#wishWrapper").html(stringResult);
    },
  });
}
