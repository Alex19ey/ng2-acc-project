"use strict";



function renderStaticHtmlFile(path) {
    return function (req, res, next) {
        res.sendFile(path);
    }
}


module.exports = renderStaticHtmlFile;