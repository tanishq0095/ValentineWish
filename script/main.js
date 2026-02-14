const animationTimeline = () => {
    document.querySelector(".container").style.visibility = "visible";
    const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
    const hbd = document.getElementsByClassName("wish-hbd")[0];
    textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML.split("").join("</span><span>")}</span>`;
    hbd.innerHTML = `<span>${hbd.innerHTML.split("").join("</span><span>")}</span>`;

    const tl = new TimelineMax();
    tl.to(".container", 0.6, { visibility: "visible" })
      .from(".one", 0.7, { opacity: 0, y: 10 })
      .to(".one", 0.7, { opacity: 0, y: 10 }, "+=2.5")
      .from(".two", 0.4, { opacity: 0, y: 10 })
      .to(".two", 0.7, { opacity: 0, y: 10 }, "+=2.5")
      .from(".three", 0.7, { opacity: 0, y: 10 })
      .to(".three", 0.7, { opacity: 0, y: 10 }, "+=2")
      .from(".four", 0.7, { scale: 0.2, opacity: 0 })
      .add(() => {
          const music = document.getElementById("bgMusic");
          music.play().catch(e => console.warn("Music blocked or path wrong"));
      })
      .staggerTo(".hbd-chatbox span", 0.5, { visibility: "visible" }, 0.05)
      .to(".four", 0.5, { scale: 0.2, opacity: 0, y: -150 }, "+=1.5")
      .from(".idea-1", 0.7, { opacity: 0, y: -20 })
      .to(".idea-1", 0.7, { opacity: 0, y: 20 }, "+=1.5")
      // ... continue through ideas 2-5 similar to above ...
      .from(".six", 0.5, { opacity: 0, y: 30 })
      .staggerFrom(".nine p", 1, { opacity: 0, y: -20 }, 1.2);

    document.getElementById("replay").addEventListener("click", () => tl.restart());
};

const fetchData = () => {
    return fetch("customize.json")
        .then(response => response.json())
        .then(data => {
            Object.keys(data).forEach(key => {
                const el = document.getElementById(key);
                if (el) {
                    if (key === "imagePath") el.setAttribute("src", data[key]);
                    else el.innerText = data[key];
                }
            });
        }).catch(err => console.warn("Data Fetch Error:", err));
};

window.addEventListener("load", () => {
    fetchData().finally(() => animationTimeline());
});
