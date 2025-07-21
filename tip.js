const billInput = document.querySelector("#bill");
const customTipInput = document.querySelector("#custom-tip");
const numOfPeopleInput = document.querySelector("#num");
const tipAmount = document.querySelector(".amount-number");
const totalAmount = document.querySelector(".total-number");
const tipBoxes = document.querySelector(".tip-boxes");
const tipBoxesList = document.querySelectorAll(".tip-box");
const resetButton = document.querySelector(".reset-button")
let billValue = tipPrecentge = peopleNumValue = tipValue = totalValue = 0;
setInterval(() => {
    calculateValue();
}, 100)
tipBoxesList.forEach((box) => {
    setActive(box);
})
function calculateValue() {
    if (billInput.value && numOfPeopleInput.value) {
        if (customTipInput.value > 0.05) {
            tipPrecentge = customTipInput.value / 100;
        } else {
            tipPrecentge = parseFloat(tipBoxes.querySelector(".active").getAttribute("value")) || 0;
        }
        billValue = parseFloat(billInput.value);
        peopleNumValue = parseFloat(numOfPeopleInput.value);
        tipValue = billValue * tipPrecentge / peopleNumValue;
        tipValue = tipValue == isNaN(tipValue) || !isFinite(tipValue) ? 0 : tipValue;
        tipValue = parseFloat(tipValue).toFixed(2);
        totalValue = billValue / peopleNumValue + parseFloat(tipValue);
        totalValue = totalValue == isNaN(totalValue) || !isFinite(totalValue) ? 0 : totalValue;
        totalValue = parseFloat(totalValue).toFixed(2);
        updatePageTipValues();
        enableReset();
        resetButtonFunctioning();
    }
}
function setActive(box) {
    box.addEventListener("click", (e) => {
        tipBoxesList.forEach((b) => {
            b.classList.remove("active")
        })
        if (e.target.tagName !== "INPUT") {
            e.target.classList.add("active");
            customTipInput.value = "";
        }
    })
}
function enableReset() {
    resetButton.classList.remove("invalid-button")
}
function disableReset() {
    resetButton.classList.add("invalid-button");
}
function resetButtonFunctioning() {
    resetButton.addEventListener("click", (e) => {
        tipValue = Number(0).toFixed(2);
        totalValue = Number(0).toFixed(2);
        billInput.value = numOfPeopleInput.value = customTipInput.value = "";
        updatePageTipValues();
        disableReset();
    })
}
function updatePageTipValues() {
    tipAmount.innerText = "$" + tipValue;
    totalAmount.innerText = "$" + totalValue;
}
