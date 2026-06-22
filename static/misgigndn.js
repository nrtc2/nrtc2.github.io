const data = {},
    d = document;
let iId = 0;

const misogLevels = [
    [0, "no misogin", "#00CC78"],
    [5, "low misogin", "#FFD635"],
    [20, "mid misogin", "#FF4500"],
    [80, "high misogin", "#BE0039"],
    [250, "TOO MISOGIN", "#515252"],
    [500, "WTFQY8 syndrome", ["#FFD635", "#FF4500", "#FFA800", "#7EED56", "#00CC78", "#000000", "#B44AC0", "#DE107F", "#BE0039", "#3690EA", "#6A5CFF"]]
];

function dis(va) {
    clearInterval(iId);
    const a = getThresoldValue(data[va], misogLevels);
    d.title = `How misogin is ${va}`
    d.getElementsByTagName("p")[0].style.color = Array.isArray(a[1])
        ? iId = setInterval(function () {
            d.getElementsByTagName("p")[0].style.color = a[Math.floor(Math.random() * a[1].length)])
        })
        : a[1]
    d.getElementsByTagName("p")[0].innerText = `${a[0]} (${data[va]} Misogin Essence)`
}

function getThresoldValue(inputNumber, thresholdArray) {
    if (!Array.isArray(thresholdArray)) throw new TypeError("The second argument must be an array");
    if (!thresholdArray.every(function (a) {
        return a.length >= 2
    })) throw TypeError("All entries must have 2 or more values")

    const sorted = thresholdArray.toSorted(function (a, b) {
        return a[0] - b[0]
}).toReversed()

    for (const row of sorted) {
        if (row[0] <= inputNumber) {
            return row.toSpliced(0, 1);
        }
    }
    
    return null;
}

async function fetchNotReiny(path) {
    let response = await fetch(`https://api.github.com/repos/nrtc2/nrtc2.github.io/contents/${path}`);
    let data = await response.json();

    return (new TextDecoder).decode(
        new Uint8Array(
            atob(data.content)
            .split("")
            .map(e => e.codePointAt())
        )
    )
}
async function init() {
    const json = await fetchNotReiny("static/misogindata.json")
    const parsed = JSON.parse(json);
    for (let k in parsed) {
      data[k] = parsed[k];
    }

    appendOptions(data, d.getElementById("sel"));
    dis(d.getElementById("sel").value)
    d.getElementById("sel").addEventListener("input", function (e) {
        dis(e.target.value)
    })
}

/* init() */

function appendOptions(obj, elm) {
    for (let k in obj) {
        const o = d.createElement("option");
        o.value = k;
        o.innerText = k;
        elm.appendChild(o)
    }
}
