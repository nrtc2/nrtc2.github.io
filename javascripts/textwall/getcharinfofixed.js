window.getCharInfoFixed = function (e, t, r = 0, a = 0) {
    if (e === undefined || t === undefined || r === undefined || a === undefined) {
        [e, t, r, a] = window.cursorCoords;
    }

    const Qm = Tile.get(e, t);
    if (!Qm) return null;

    const Nw = 20;
    const Xv = 10;

    if (r < 0) {
        e -= Math.ceil(Math.abs(r) / Nw);
        r = (r % Nw + Nw) % Nw;
    }
    if (a < 0) {
        t -= Math.ceil(Math.abs(a) / Xv);
        a = (a % Xv + Xv) % Xv;
    }

    const Pd = a * Nw + r;
    const Uf = Qm.txt[Pd];
    const Jy = Qm.clr[Pd];
    const Zu = Array.isArray(Jy);
    const Gh = Zu ? Jy.slice(0, 3) : Jy % 31;
    return {
        tileCoords: [e, t, r, a],
        char: Uf,
        color: Gh,
        deco: getCharDecorationFixed(Zu)
    };
};

window.getCharInfoXYFixed = function (e, t) {
    const Rd = Math.floor(e / 20) * 20;
    const Bs = Math.floor(t / 10) * 10;
    const Qp = e % 20;
    const Lk = t % 10;
    return getCharInfoFixed(Rd, Bs, Qp, Lk);
};

window.getCharDecorationFixed = function (e) {

    const Lj = Array.isArray(e) ? e[3] : Math.floor(e / 31);
    return {

        bold: (Lj & 8) == 8,
        italic: (Lj & 4) == 4,
        underline: (Lj & 2) == 2,
        strike: (Lj & 1) == 1
    };
};

window.getCharColorFixed = function (e, t, r = 0, a = 0) {
    if (e === undefined || t === undefined || r === undefined || a === undefined) {
        [e, t, r, a] = window.cursorCoords;
    }

    const Vz = Tile.get(e, t);
    if (!Vz) return null;

    const Rn = 20;
    const Bw = 10;

    if (r < 0) {
        e -= Math.ceil(Math.abs(r) / Rn);
        r = (r % Rn + Rn) % Rn;
    }
    if (a < 0) {
        t -= Math.ceil(Math.abs(a) / Bw);
        a = (a % Bw + Bw) % Bw;
    }

    const Kf = a * Rn + r;
    const Og = Vz.clr[Kf]
    return Array.isArray(Og) ? Og.slice(0, 3) : Og % 31;
};
