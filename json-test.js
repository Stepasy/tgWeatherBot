const fs = require("fs");
let contents = fs.readFileSync("data.json");
let jsonContent = JSON.parse(contents);
for (let i = 0; i < jsonContent.length; i++) {
    console.log(jsonContent[i].sign);
    console.log(jsonContent[i].content);
}