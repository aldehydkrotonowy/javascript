function processImgs(content, path) {
    return processSVGs(content, path);
}

function processSVGs(content, path) {

    const rgxSvgExt = /\.svg$/;
    const rgxSvgId = /.*\\(.*\\.*)\.svg$/; // takes svg name and deepest/last subfolder
    // Auto id SVGs by their names
    if (rgxSvgExt.test(path)) {
        let contentStr = content.toString();
        const match = rgxSvgId.exec(path);
        if (match && match[1]) {
            const svgID = match[1].replace('\\', '-');
            contentStr = contentStr.replace('<svg', `<svg id="${svgID}"`);
            return contentStr;
        }
    }
    return content; // Nothing processed return what was pased into incase it was binary buffer
}

module.exports = processImgs;