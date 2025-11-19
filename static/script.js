document.addEventListener('DOMContentLoaded', () => {
    if (document.body.id === "index") {
        const hi = document.querySelector(".hiCont");
        const ready = hi.querySelectorAll(".ready");
        const cl = hi.querySelector("#cl");
        const loader = document.querySelector(".loader");
        const index = document.querySelector(".index");
        const cleanForm = document.querySelector("#cleanForm");
        const ingre = document.querySelector(".ingredients");
        const qCont = document.querySelector(".query");
        const qMain = qCont.querySelector(".main")
        const q2Cont = document.querySelector(".query2");
        const analyse = qCont.querySelector(".analyse");
        const q2Form = q2Cont.querySelector(".confirm form");
        const q2FormInput = q2Cont.querySelector(".confirm #fQuery");
        const yesBtn = q2Cont.querySelector(".confirm form button");
        const noBtn = q2Cont.querySelector(".confirm span button");
        const backBtn = q2Cont.querySelector("#backBtn");
        const recoCont = document.querySelector(".recoCont");
        const recoDiv = recoCont.querySelector(".recoDiv");
        const reco = recoCont.querySelector(".reco");
        const finalForm1 = recoCont.querySelector(".recoDiv #finalForm1");
        const finalForm2 = recoCont.querySelector(".recoDiv #finalForm2");

        recoCont.addEventListener("click", () => {
            recoCont.style.display = "none";
        });
        recoDiv.addEventListener("click", (e) => {
            e.stopPropagation();
        })

        q2Form.addEventListener("submit", async (e) => {
            e.preventDefault();
            let form = new FormData(q2Form);
            let fQuery = form.get("fQuery");
            alert("Steve is thinking...");

            let r = await fetch("/recommend", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({q: fQuery})
            });
            let d = await r.json();
            console.log(d.msg);
            if (d.msg.includes("does")) {
                finalForm1.style.display = "none";
                finalForm2.style.display = "none";
            }

            if (d.msg.includes("already")) {
                finalForm1.style.display = "flex";
                finalForm2.style.display = "none";
            }
            else {
                finalForm1.style.display = "none";
                finalForm2.style.display = "block";
            }
            reco.innerHTML = d.msg;
            recoCont.style.display = "flex";
        });

        const backs = [noBtn, backBtn];

        for (let i=0; i < backs.length; i++) {
            backs[i].addEventListener("click", () => {
                q2Cont.style.display = "none";
                qCont.style.display = "block";
                qMain.style.display = "flex";
            })
        };

        cleanForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            qMain.style.display = "none";
            analyse.style.display = "block";
        
            let form = new FormData(cleanForm);
            let query = form.get("q");

            let r = await fetch("/clean", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({q: query})
            });
            let data = await r.json();
            const promise = JSON.stringify(data.msg);
            ingre.innerHTML = promise.replaceAll('"', '');
            q2FormInput.value = ingre.textContent;
            console.log(q2FormInput.value);
            const subs = ["invalid", "Invalid", "can't", "can not"]
            if (ingre.textContent === "no actual food ingredients in query" || subs.some(sub => ingre.textContent.includes(sub)) || ingre.textContent.length < 25) {
                yesBtn.style.display = "none";
                noBtn.textContent = "Go back";
            }
            else {
                yesBtn.style.display = "block";
                noBtn.textContent = "No";
            }
            setTimeout(() => {
                qCont.style.display = "none";
                analyse.style.display = "none";
            }, 2000);
            setTimeout(() => q2Cont.style.display = "flex", 2200);
        })

        window.addEventListener("load", () => {
            loader.style.display = "none";
            index.style.display = "block";
        });

        if (cl.value === "cancel") {
            hi.style.display = "none";
        }

        for (let i=0; i < ready.length; i++) {
            ready[i].addEventListener("click", async () => {
                hi.style.display = "none";

                let r = await fetch("/", {
                    method: "post",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({q: "cancel"})
                });
                let data = await r.json();
                console.log(data, cl.value);
            });
        };
    }
});