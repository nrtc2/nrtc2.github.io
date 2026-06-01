const sel = new RegionSelection
sel.onSelection(function(sx, sy, ex, ey) {
    const d = Date.now()
    let s = 0
    let c = 0
    for (let y = sy; y <= ey; y++) {
        for (let x = sx; x <= ex; x++) {
            if (getCharInfoXY(x, y).char !== " ") {
                s = writeCharAt(" ", 0, x, y)
                if (s !== 0) {
                    c += 1
                }
            }
        }
    }
    w.showToast(`Region voided: ${sx}, ${-sy} to ${ex}, ${-ey}
Time taken: ${(Date.now()-d)/1000} seconds
Chars successfully cleared: ${c}/${(ex-sx+1)*(ey-sy+1)}`, 1500)
})
sel.startSelection()
