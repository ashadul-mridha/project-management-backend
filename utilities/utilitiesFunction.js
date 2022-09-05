
const path = require("path");

const genarateSlug = (name) => {
    const slug = name.toLowerCase().split(" ").join("-") + "-" + Date.now();
    console.log(slug);
    return slug;
}

const uploadFileName = (fileName) => {
    const fileExt = path.extname(fileName);
    const fileNameWithoutExt =
    fileName
        .replace(fileExt, "")
        .toLowerCase()
        .split(" ")
        .join("-") +
    "-" +
    Date.now();

    const finalFileName = fileNameWithoutExt + fileExt;
    return finalFileName;
}

module.exports = { genarateSlug, uploadFileName }