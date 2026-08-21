!async function() {
    async function writeTextAt2(char, color, x, y, del = 0) {
        let curX = x,
            curY = y,
            strArr = char.toString().split("\n");
        for (let iy = 0; iy < strArr.length; iy++) {
            for (let ix = 0; ix < strArr[iy].length; ix++) {
                const charInfo = getCharInfoXY(curX, curY);
                const dec = charInfo.deco;
                const curChr = strArr[iy].charAt(ix);
                const fmt = prsFmt(color)
                if (null === charInfo) continue;
                if (curChr == " ") {
                    curX++;
                    continue
                };

                if (charInfo.char !== curChr || charInfo.color !== fmt.color || dec.bold !== fmt.bold || dec.italic !== fmt.italic || dec.underline !== fmt.underline || dec.strike !== fmt.strikethrough) {
                    if (curChr !== " " || charInfo.char !== " ") writeCharAt(curChr, curChr !== " " ?
                        (Array.isArray(color) ?
                            String(color[ix + iy * strArr.length]).startsWith("#") ?
                            hexToRGBArr(color[ix + iy * strArr.length]) :
                            color[ix + iy * strArr.length] :
                            color) :
                        0, curX, curY);
                    if (del > 0 && isFinite(del)) {
                        await delay(del);
                    }
                }
                curX++
            }
            curX = x, curY++
        }
    }
    const pos = [
        [
            ` o
/|\\
> \\`,
            `   
 o 
_|\\`,
            `<o>
 |
/ \\`,
            ` o
/|\\
/ \\`
        ],
        [
            `o _
-\\ 
/ <`,
            ` o
/|\\
/ \\`,
            `   
 o 
_|\\`,
            ` o 
/|\\
> \\`
        ],
        [
            ` o 
/|\\ 
/ \\`,
            `   
 o 
_|\\`,
            `   
   
[╍]`,
            `o _
-\\ 
/ <`
        ],
        [
            `   
   
[╍]`,
            `o _
-\\ 
/ <`,
            `   
   
[╍]`,
            ` o 
/|\\
> \\`
        ]
    ];
    const cler = [
        [
            [0, "#C2F687", 0, "#E5D158", "#E5D158", "#E5D158", "#6DA132", 0, "#6DA132"],
            [0, 0, 0, 0, "#C2F687", 0, "#6DA132", "#E5D158", "#E5D158"],
            ["#E5D158", "#C2F687", "#E5D158", 0, "#E5D158", 0, "#6DA132", 0, "#6DA132"],
            [0, "#73DF94", 0, "#43AEC2", "#73DF94", "#43AEC2", "#2C663D", 0, "#2C663D"]
        ],
        [
            ["#C2F687", 0, "#E5D158", "#E5D158", "#E5D158", 0, "#6DA132", 0, "#6DA132"],
            [0, "#73DF94", 0, "#43AEC2", "#73DF94", "#43AEC2", "#2C663D", 0, "#2C663D"],
            [0, 0, 0, 0, "#C2F687", 0, "#6DA132", "#E5D158", "#E5D158"],
            [0, "#C2F687", 0, "#E5D158", "#E5D158", "#E5D158", "#6DA132", 0, "#6DA132"]
        ],
        [
            [0, "#73DF94", 0, "#43AEC2", "#73DF94", "#43AEC2", "#2C663D", 0, "#2C663D"],
            [0, 0, 0, 0, "#C2F687", 0, "#6DA132", "#E5D158", "#E5D158"],
            [0, 0, 0, 0, 0, 0, "#3B6F4B", "#68F692", "#3B6F4B"],
            ["#C2F687", 0, "#E5D158", "#E5D158", "#E5D158", 0, "#6DA132", 0, "#6DA132"]
        ],
        [
            [0, 0, 0, 0, 0, 0, "#3B6F4B", "#68F692", "#3B6F4B"],
            ["#C2F687", 0, "#E5D158", "#E5D158", "#E5D158", 0, "#6DA132", 0, "#6DA132"],
            [0, 0, 0, 0, 0, 0, "#3B6F4B", "#68F692", "#3B6F4B"],
            [0, "#C2F687", 0, "#E5D158", "#E5D158", "#E5D158", "#6DA132", 0, "#6DA132"]
        ]
    ];
    for (let sct = 0; sct < pos.length; sct++) {
        writeTextAt(Array(3).fill(" ".repeat(48)).join("\n"), 0, -99, -8).catch(console.error);

        for (let posC = 0; posC < pos[sct].length; posC++) {
            for (let e = 0; e < 4; e++) {
                writeTextAt2(pos[sct][posC], cler[sct][posC], -99 + e * 2 + posC * 8, -8);
                await delay(400)
            }
        }
    }
}()
