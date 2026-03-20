window.addEventListener("load", () => {
    const overlay = document.getElementById("onload");
    if (overlay) overlay.classList.add("is-hidden");
    document.body.classList.remove("is-loading");
});
