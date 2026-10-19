function changeText(g, color) {
    const l = document.getElementById("f");
    l.textContent = String(g);
    l.style.color = color ?? ""
}

document.getElementById("f").addEventListener("click", async function() {
    try {
        const clipboard = await navigator.clipboard.read();
        changeText(clipboard.types.join("\n"))
    } catch (e) {
        changeText(e.stack, "red")
    }
})