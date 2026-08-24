(function() {
    function convertFormat(inp) {
        function tokenize(inp) {
            let e = [...inp];
            var result = [];
            var i = 0;
            while (i < e.length) {
                if (e[i] === "[") {
                    var token = "";
                    i++;
                    while (i < e.length && e[i] !== "]") {
                        token += e[i];
                        i++;
                    }
                    if (i < e.length && e[i] === "]") {
                        result.push(token);
                        i++;
                    }
                } else {
                    result.push(e[i]);
                    i++;
                }
            }
            return result;
        }

        const colorSet = ["#000000", "#898D90", "#D4D7D9", "#FF99AA", "#FF4500", "#FFA800", "#9C6926", "#FFD635", "#7EED56", "#00CC78", "#51E9F4", "#3690EA", "#2450A4", "#B44AC0", "#811E9F", "#BE0039", "#00A368", "#00756F", "#009EAA", "#493AC1", "#6A5CFF", "#FF3881", "#6D482F", "#6D001A", "#FFF8B8", "#00CCC0", "#94B3FF", "#E4ABFF", "#DE107F", "#FFB470", "#515252"];
        const split = inp.split("\x1B");
        if (!split[1]) return split[0];
        const splitString = [...split[0]],
            splitCodes = tokenize(split[1]);
        return splitString.map(e => e).join("")
    }

    navigator.clipboard.readText().then(e => console.log(convertFormat(e))).catch(console.error)
})()

let f = `ÉÉÔÉÀÉÉÉÉÉÉ�ÀÀÀÀÀÀÀÀÀÀÀ�ÀÀÀÀÀÀÀÀÀÀÀ�[ÀÀÃÙÀÀÀ][ÀÀÃÙÀÀÀ][ÀÀÃÙÀÀÀ]À[ÀÀÃÙÀÀÀ][ÀÀÃÙÀÀÀ][ÀÀÃÙÀÀÀ][ÀÀÃÙÀÀÀ][ÀÀÃÙÀÀÀ][ÀÀÃÙÀÀÀ]À�[ÀÀÃÙÀÀÀ][ÀÀÃÙÀÀÀ][ÀÀÃÙÀÀÀ][ÀÀÃÙÀÀÀ][ÀÀÃÙÀÀÀ][ÀÀÃÙÀÀÀ][ÀÀÃÙÀÀÀ][ÀÀÃÙÀÀÀ][ÀÀÃÙÀÀÀ][ÀÀÃÙÀÀÀ][ÀÀÃÙÀÀÀ]`;
let s = f.split("\ufffd");

const tokenize = function tokenize(inp) {
            let e = [...inp];
            var result = [];
            var i = 0;
            while (i < e.length) {
                if (e[i] === "[") {
                    var token = "";
                    i++;
                    while (i < e.length && e[i] !== "]") {
                        token += e[i];
                        i++;
                    }
                    if (i < e.length && e[i] === "]") {
                        result.push(token);
                        i++;
                    }
                } else {
                    result.push(e[i]);
                    i++;
                }
            }
            return result;
        };

s.map(e => tokenize(e).map(e => e.codePointAt() - 192))
