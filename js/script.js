let display = document.getElementById("display");
let historyList = document.getElementById("historyList");
let isResultShown = false;

function appendValue(value) {
    if (isResultShown) {
        display.value = "";
        isResultShown = false;
    }
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        let originalExp = display.value;

        let expression = originalExp
            .replace(/sin/g, "Math.sin")
            .replace(/cos/g, "Math.cos")
            .replace(/tan/g, "Math.tan")
            .replace(/√/g, "Math.sqrt");

        let result = eval(expression);

        display.value = result;
        isResultShown = true;

        addToHistory(originalExp, result);

    } catch {
        display.value = "Error";
        isResultShown = true;
    }
}

function addToHistory(exp, result) {
    let li = document.createElement("li");
    li.className = "history-item";

    let text = document.createElement("span");
    text.innerText = `${exp} = ${result}`;
    text.onclick = () => {
        display.value = exp;
        isResultShown = false;
    };

    let delBtn = document.createElement("button");
    delBtn.innerText = "✖";
    delBtn.className = "history-del";
    delBtn.onclick = (e) => {
        e.stopPropagation();
        li.remove();
    };

    li.appendChild(text);
    li.appendChild(delBtn);

    historyList.prepend(li);
}
