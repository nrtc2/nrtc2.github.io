const data = {},
    d = document;

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

    appendOptions(data, d.getElementById("sel"))
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
