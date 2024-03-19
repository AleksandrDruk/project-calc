let display = document.querySelector(".display");
let buttons = Array.from(document.querySelectorAll(".button"));

buttons.map((button) => {
  button.addEventListener("click", (e) => {
    switch (e.target.innerText) {
      case "AC":
        display.innerText = "0";
        break;
      case "=":
        try {
          // Использование Function вместо eval
          const result = new Function("return " + display.innerText)();
          display.innerText =
            result.toString().length > 10 ? result.toPrecision(10) : result;
        } catch {
          display.innerText = "Error"; // Можно добавить логику для улучшения UX
        }
        break;
      case "%":
        let passedText = display.innerText + "/100";
        display.innerText = new Function("return " + passedText)();
        break;
      case "+/-":
        display.innerText = display.innerText.startsWith("-")
          ? display.innerText.substring(1)
          : "-" + display.innerText;
        break;
      default:
        if (display.innerText === "0" && e.target.innerText !== ".") {
          display.innerText = e.target.innerText;
        } else {
          // Добавление нуля перед точкой, если необходимо
          if (e.target.innerText === "." && !display.innerText.includes(".")) {
            display.innerText += ".";
          } else if (!isNaN(e.target.innerText) || e.target.innerText === ".") {
            display.innerText += e.target.innerText;
          } else if (isNaN(display.innerText.slice(-1))) {
            // Замена последнего оператора, если введён новый оператор
            display.innerText =
              display.innerText.slice(0, -1) + e.target.innerText;
          } else {
            display.innerText += e.target.innerText;
          }
        }
    }

    // Ограничение количества символов и форматирование вывода
    if (display.innerText.length > 10) {
      display.innerText = display.innerText.substring(0, 10);
    }
  });
});
