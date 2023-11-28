const express = require("express");
const router = express.Router();
const xlsx = require("node-xlsx");
const path = require("path");
const multiparty = require("multiparty");
const fs = require("fs");

/* GET home page. */
router.post("/", function (req, res, next) {
  // 表单解析
  var form = new multiparty.Form({
    uploadDir: path.join(__dirname, "../upload"),
  });
  form.parse(req);

  form.on("field", function (name, value) {
    //接收到数据参数时，触发field事件
    console.log(name, value);
  });
  form.on("file", (name, file, ...rest) => {
    // 接收到文件参数时，触发file事件
    fs.renameSync(file.path,path.join(__dirname, "../upload/test.xlsx"))
    const parsefile = xlsx.parse(path.join(__dirname, "../upload/test.xlsx"));
    res.send(parsefile[0].data);
  });

  form.on("close", () => {
    // 表单数据解析完成，触发close事件
    console.log("表单数据解析完成");
  });
});

module.exports = router;
