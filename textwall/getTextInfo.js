function getTextInfo(e, t, r, a) {
    const aa = [];
    let bb = "";
    for (let i = t; i <= a; i++) {
        for (let j = e; j <= r; j++) {
            if (getCharInfoXY(j, i) !== null) {
                bb += getCharInfoXY(j, i).char
            } else {
                throw Error("out of range")
            }
        }
        aa.push(bb);
        bb = ""
    }
    return aa.join("\n")
}
