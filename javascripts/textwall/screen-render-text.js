async function scr(e, t) {
    function paginateText(text, max = 78, ln = 18) {
        let lines = [];
        let line = "";
        let len = 0;

        for (const ch of text) {
            if (ch === "\n") {
                lines.push(line.padEnd(78, " "));
                line = "";
                len = 0;
                continue;
            }

            if (len >= max) {
                lines.push(line);
                line = "";
                len = 0;
            }

            line += ch;
            len++;
        }

        lines.push(line.padEnd(max, " "));
        for (let e = lines.length; e < ln; e++) lines.push(" ".repeat(max))
        return lines.slice(0, ln).join("\n");
    }

    await writeTextAt(paginateText(`${e}`), t, 21, -9, 0)
}
0
