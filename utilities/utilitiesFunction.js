

const genarateSlug = (name) => {
    const slug = name.toLowerCase().split(" ").join("-") + "-" + Date.now();
    console.log(slug);
    return slug;
}

module.exports = { genarateSlug }