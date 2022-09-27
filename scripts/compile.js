const { exec } = require("child_process");
const fs = require("fs");

exec("tsc -m es2022", () => {
    const files = getAllFiles("./dist");
    files.forEach((file) => {
        if (file.endsWith("d.ts")) return;
        console.log(file);
        fs.rename(file, "." + file.split(".")[1] + ".mjs", () => {
            exec("tsc");
        });
    });
});

const getAllFiles = (directory) => {
    let fileArray = [];
    const files = fs.readdirSync(directory);

    for (const file of files) {
        if (fs.statSync(`${directory}/${file}`).isDirectory()) fileArray.push(...getAllFiles(`${directory}/${file}`));
        else fileArray.push(`${directory}/${file}`);
    }

    return fileArray;
};