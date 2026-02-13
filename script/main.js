// Animation Timeline
const animationTimeline = () => {
  // Reveal the container immediately when the function is called
  document.querySelector(".container").style.visibility = "visible";

  const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
  const hbd = document.getElementsByClassName("wish-hbd")[0];

  textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
    .split("")
    .join("</span><span>")}</span>`;

  hbd.innerHTML = `<span>${hbd.innerHTML
    .split("")
    .join("</span><span>")}</span>`;

  const ideaTextTrans = {
    opacity: 0,
    y: -20,
    rotationX: 5,
    skewX: "15deg",
  };

  const ideaTextTransLeave = {
    opacity: 0,
    y: 20,
    rotationY: 5,
    skewX: "-15deg",
  };

  const tl = new TimelineMax();

  tl.to(".container", 0.1, {
    visibility: "visible",
  })
  .from(".one", 0.7, {
    opacity: 0,
    y: 10,
  })
  // ... (Keep the rest of your timeline code exactly as you have it)
  .to(".last-smile", 0.5, {
    rotation: 90,
  }, "+=1");

  const replyBtn = document.getElementById("replay");
  replyBtn.addEventListener("click", () => {
    tl.restart();
  });
};

// Updated FetchData with Error Handling
const fetchData = () => {
  return fetch("customize.json")
    .then((response) => {
      if (!response.ok) throw new Error("customize.json not found");
      return response.json();
    })
    .then((data) => {
      Object.keys(data).forEach((customData) => {
        if (data[customData] !== "") {
          const element = document.getElementById(customData);
          if (element) {
            if (customData === "imagePath") {
              element.setAttribute("src", data[customData]);
            } else {
              element.innerText = data[customData];
            }
          }
        }
      });
    })
    .catch((error) => {
      // Log the error but don't stop the animation!
      console.warn("JSON Load failed, using HTML defaults:", error);
    });
};

// The execution trigger
window.addEventListener("load", () => {
  fetchData().finally(() => {
    // .finally() ensures the animation runs even if the fetch fails
    animationTimeline();
  });
});
