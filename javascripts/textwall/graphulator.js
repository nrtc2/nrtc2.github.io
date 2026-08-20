console.log(setInterval(function() {
    if (Me.length) return;

    let å = getTextInfo(-20, 10, 19, 10);
    let ľ = parseFloat(getTextInfo(-20, 11, 19, 11));

    for (let y = -10; y < 10; y++)
        for (let x = -20; x < 20; x++) writeTextAt(".", 30, x, y)

    for (let e = -20; e < 20; e++) {

        const x = e / ľ / 2;
        const mod = function mod(e, t) {
            return (e % t + t) % t
        }
        let ø;
        try {
            ø = Math.round(eval(å) * ľ)
        } catch (f) {
            writeTextAt(f instanceof SyntaxError ? "Syntax error" : "Error", 4, -20, -7);
            ø = 0
        }

        writeTextAt(ø >= 10 ? "^" : ø <= -9 ? "v" : "#", 0, e, -(ø >= 10 ? 10 : ø <= -9 ? -9 : ø))
    }

    writeTextAt(`graphulator
${å}
zoom ${ľ}x`, 0, -20, -10)
}, 1000))
