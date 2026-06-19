function ESver() {
    const u = String(void 0),
        p = "prototype";
    return typeof Temporal !== u ? "ES2026" :
        typeof Set[p].union !== u ? "ES2025" :
        typeof String[p].isWellFormed !== u ? "ES2024" :
        typeof Array[p].toSorted !== u ? "ES2023" :
        typeof Array[p].at !== u ? "ES2022" :
        typeof String[p].replaceAll !== u ? "ES2021" :
        typeof BigInt !== u ? "ES2020" :
        typeof Object.fromEntries !== u ? "ES2019" :
        typeof Promise[p].finally !== u ? "ES2018" :
        typeof Object.values !== u ? "ES2017" :
        typeof Array[p].includes !== u ? "ES2016" :
        typeof Symbol !== u ? "ES2015/6" :
        typeof Object.keys !== u ? "ES2009/5" : "ES1999/3 or below (what the fuck)"
}
