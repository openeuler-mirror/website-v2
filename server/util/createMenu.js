/**
 * @file createMenu
 */
const fs = require('fs');
const path = require('path');

function createMenu(dirPath) {
    let lesson = fs.readFileSync(dirPath + '/index.md', 'utf-8');
    let json = [];
    lesson.split(/\r?\n/).forEach(function (line) {
        if (line.indexOf('](./{{<') > -1) {
            if (line.indexOf('-') === 0) {
                json.push(getLineArr(line));
            }
            if (line.indexOf('-') === 4) {
                json.slice(-1)[0].children.push(getLineArr(line));
            }
            if (line.indexOf('-') === 8) {
                json.slice(-1)[0].children.slice(-1)[0].children.push(getLineArr(line));
            }
            if (line.indexOf('-') === 12) {
                json.slice(-1)[0].children.slice(-1)[0].children.slice(-1)[0].children.push(getLineArr(line));
            }
            if (line.indexOf('-') === 16) {
                json.slice(-1)[0].children.slice(-1)[0].children.slice(-1)[0].children.slice(-1)[0]
                    .children.push(getLineArr(line));
            }
            if (line.indexOf('-') === 20) {
                json.slice(-1)[0].children.slice(-1)[0].children.slice(-1)[0].children.slice(-1)[0]
                    .children.slice(-1)[0].children.push(getLineArr(line));
            }
        }
    });

    fs.writeFile(dirPath + '/menu.json', JSON.stringify(json, null, 2), 'utf-8', (err) => {
        if (err == null) {
            console.log('menu.json create success');
        } else {
            console.log(err.stack);
        }
    });
}

function getLineArr(line) {
    let arr = {
        label: line.substring(line.indexOf('[') + 1, line.indexOf(']')),
        path: line.substring(line.indexOf('"./') + 3, line.indexOf('.md')),
        children: []
    };
    return arr;
}

let dirPath = path.join('', 'menu_en');
createMenu(dirPath);