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
