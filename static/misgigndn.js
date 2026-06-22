const data = {},
    d = document;

const misogLevels = [
    [0, "no misogin", "#00CC78"],
    [5, "low misogin", "#FFD635"],
    [20, "mid misogin", "#FF4500"],
    [80, "high misogin", "#BE0039"],
    [250, "TOO MISOGIN", "#515252"],
    [500, "WTFQY8 syndrome", "#ABCDEF"]
];

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
    d.getElementById("sel").addEventListener("input", function (e) {
        const va = e.target.value,
            a = getThresoldValue(data[va], misogLevels)n;
        d.title = `How misogin is ${va}`
        d.getElementsByTagName("p")[0].style.color = a[1]
        d.getElementsByTagName("p")[0].innerText = `${a[0]} (${data[va]} Misogin Essence)`
    })
}

init();

function appendOptions(obj, elm) {
    for (let k in obj) {
        const o = d.createElement("option");
        o.value = k;
        o.innerText = k;
        elm.appendChild(o)
    }
}
