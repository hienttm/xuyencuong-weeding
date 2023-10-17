var express = require("express");
var router = express.Router();
var fs = require("fs");

/* GET all wish. */
router.get("/listWish", function (req, res, next) {
  let data = fs.readFileSync("./data.JSON");
  data = JSON.parse(data);
  res.send(data);
});

//Save a wish
router.post("/sendWish", function (req, res, next) {
  let newWish = req.body;
  let data = fs.readFileSync("./data.JSON");
  data = JSON.parse(data);
  data.unshift(newWish);
  data = JSON.stringify(data);
  fs.writeFileSync("data.JSON", data);
  res.redirect("/listWish");
});

//Khách mời
router.get("/guest", function (req, res, next) {
  let data = fs.readFileSync("./guest.JSON");
  data = JSON.parse(data);
  res.render("guest/index.ejs", { guests: data });
});
//getjsonguest
router.get("/guestjson", function (req, res, next) {
  let data = fs.readFileSync("./guest.JSON");
  data = JSON.parse(data);
  res.send(data);
});
router.post("/guest/add", function (req, res, next) {
  let newGuest = req.body;
  let data = fs.readFileSync("./guest.JSON");
  data = JSON.parse(data);
  let length = data.length + 1;
  newGuest.id = length;
  data.push(newGuest);
  data = JSON.stringify(data);
  fs.writeFileSync("guest.JSON", data);
  res.redirect("/guest");
});

router.post("/guest/edit/:id", function (req, res, next) {
  let id = req.params.id;
  let data = fs.readFileSync("./guest.JSON");
  data = JSON.parse(data);
  const updatedData = data.map((item) => {
    if (item.id == id) {
      item.name = req.body.name;
      return item;
    }
    return item;
  });
  data = JSON.stringify(data);
  fs.writeFileSync("guest.JSON", data);
  res.redirect("/guest");
});

router.get("/guest/delete/:id", function (req, res, next) {
  let id = req.params.id;
  let data = fs.readFileSync("./guest.JSON");
  data = JSON.parse(data);
  data = data.filter((item) => {
    return item.id != id;
  });
  data = JSON.stringify(data);
  fs.writeFileSync("guest.JSON", data);
  res.redirect("/guest");
});

/* GET home page. */
router.get("/:id?", function (req, res, next) {
  var id = req.params.id;
  var guest = null;
  if (id != null) {
    let data = fs.readFileSync("./guest.JSON");
    data = JSON.parse(data);
    for (const element of data) {
      if (element.id == id) {
        guest = element;
        break;
      }
    }
  }
  res.render("index", { guest: guest });
});

module.exports = router;
