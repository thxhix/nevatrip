import { exampleJson, checkTime, printAvailableTickets, calculate } from "./functions.js";

document.addEventListener("DOMContentLoaded", () => {
    let timeline = document.querySelector(".timeline");
    let wayChoseInput = document.querySelector("#route");

    let submitButton = document.querySelector("#submit");

    // Определяем какой сейчас маршрут, и выводим список доступных по нему часов отправления
    wayChoseInput.addEventListener("change", (e) => {
        let value = wayChoseInput.value;

        if (value == "из A в B") {
            timeline.innerHTML = "";
            printAvailableTickets(timeline, "A", exampleJson);
        } else if (value == "из B в A") {
            timeline.innerHTML = "";
            printAvailableTickets(timeline, "B", exampleJson);
        } else if (value == "из A в B и обратно в А") {
            timeline.innerHTML = "";
            printAvailableTickets(timeline, "A", exampleJson);
            printAvailableTickets(timeline, "B", exampleJson);
        }
    });

    document.addEventListener("change", (e) => {
        if (e.target.getAttribute("name") == "A" && wayChoseInput.value == "из A в B и обратно в А") {
            let time = e.target.value;
            let secondTimeSelect = document.querySelector(".timeline select[name=B]");
            secondTimeSelect.value = false;
            checkTime(time);
        }
    });

    submitButton.addEventListener("click", (e) => {
        let count = document.querySelector("#num").value;

        let hasRoute = false;
        let hasTime = false;
        let hasCount = false;

        if (count != "" && !isNaN(Number(count))) {
            hasCount = true;
        }
        if (wayChoseInput.value && wayChoseInput.value != "Выберете направление") {
            hasRoute = true;
        }
        if (wayChoseInput.value == "из A в B и обратно в А") {
            let firstTimeSelect = document.querySelector(".timeline select[name=A]");
            let secondTimeSelect = document.querySelector(".timeline select[name=B]");

            if (firstTimeSelect.value && secondTimeSelect.value) {
                hasTime = true;
            }
        } else {
            let select = document.querySelector(".timeline select") ? document.querySelector(".timeline select") : false;
            if (select && select.value) {
                hasTime = true;
            }
        }

        if (hasRoute && hasTime && hasCount) {
            calculate(count);
        } else {
            let text = "";
            if (!hasRoute) {
                text += "Выберите маршрут \n";
            }
            if (!hasTime) {
                text += "Выберите время \n";
            }
            if (!hasCount) {
                text += "Введите кол-во \n";
            }
            alert(text);
        }
    });
});
