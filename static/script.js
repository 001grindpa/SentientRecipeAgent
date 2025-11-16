document.addEventListener('DOMContentLoaded', () => {
    if (document.body.id === "index") {
        const hi = document.querySelector(".hi");
        const ready = hi.querySelectorAll(".ready");
        const cl = hi.querySelector("#cl");

        for (let i=0; i < ready.length; i++) {
            ready[i].addEventListener("click", async () => {
                hi.style.display = "none";

                let r = await fetch("/", {
                    method: "post",
                    body: JSON.stringify({"q": "cancel"})
                })
                let data = await r.json()
                console.log(data)
            });
        };
    }
});