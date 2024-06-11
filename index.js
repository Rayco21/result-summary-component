const data = fetch("./data.json")
  .then((response) => {
    if (!response) {
      throw new Error("oops");
    }
    return response.json();
  })
  .then((data) => {
    let colors = [
      "hsl(0, 100%, 67%)",
      "hsl(39, 100%, 56%)",
      "hsl(166, 100%, 37%)",
      "hsl(234, 85%, 45%)",
    ];

    let styleSheet = document.getElementById("main-style");

    for (let i = 0; i < data.length; i++) {
      let item = document.createElement("i");
      let attribute = document.createElement("div");
      let score = document.createElement("div");
      let img = document.createElement("img");
      let text = document.createTextNode(data[i].category);

      item.classList.add("attribute");
      item.style.setProperty("--bar-width", `${data[i].score}%`);
      item.style.setProperty("--color", colors[i]);
      attribute.style.setProperty("color", "var(--color)");
      attribute.classList.add(`${data[i].category.toLowerCase()}`);
      score.classList.add(`attribute-score`);
      score.innerHTML = `<span class="score-number" style="font-weight: 800; color: hsl(224, 30%, 27%)"></span> / <span style="color: hsl(241, 100%, 89%)">100</span>`;
      img.src = `${data[i].icon}`;

      attribute.appendChild(img);
      attribute.appendChild(text);
      item.appendChild(attribute);
      item.appendChild(score);

      styleSheet.sheet.insertRule(`
      .attribute:nth-of-type(${i + 1})::before {
        content: "";
        background-color: var(--color);
        opacity: 0.1;
        height: 100%;
        top: 0;
        left: 0;
        position: absolute;
        border-radius: 8px;
        animation: expand 1.5s forwards;
      }
      `);

      document.querySelector(".attributes-list").appendChild(item);

      let scoreNumber = 0;
      let intervalId = setInterval(() => {
        scoreNumber === Number(data[i].score) && clearInterval(intervalId);
        scoreNumber < Number(data[i].score) && (scoreNumber += 1);

        document.querySelectorAll(".score-number")[i].innerText = scoreNumber;
      }, (1.5 / Number(data[i].score)) * 1000);
    }
  });

// console.log(data);
// let styleSheet = document.styleSheets[0];
// let styleSheet = document.getElementById("main-style").sheet;

// console.log(styleSheetWithId);
