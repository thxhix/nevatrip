let exampleJson = {
    0: {
        to: "A",
        time: "18:00",
    },
    1: {
        to: "A",
        time: "18:30",
    },
    2: {
        to: "A",
        time: "18:45",
    },
    3: {
        to: "A",
        time: "19:00",
    },
    4: {
        to: "A",
        time: "19:15",
    },
    5: {
        to: "A",
        time: "21:00",
    },

    6: {
        to: "B",
        time: "18:30",
    },
    7: {
        to: "B",
        time: "18:45",
    },
    8: {
        to: "B",
        time: "19:00",
    },
    9: {
        to: "B",
        time: "19:15",
    },
    10: {
        to: "B",
        time: "19:35",
    },
    11: {
        to: "B",
        time: "21:55",
    },
};

function printAvailableTickets(container, way) {
    let itemsList = [];

    for (var key in exampleJson) {
        if (exampleJson[key].to == way) {
            let option = document.createElement("option");
            option.value = exampleJson[key].time;
            option.textContent = exampleJson[key].time + " " + getDirectionTitle(exampleJson[key].to);
            itemsList.push(option);
        } else if (way == "ALL") {
            let option = document.createElement("option");
            option.value = exampleJson[key].time;
            option.textContent = exampleJson[key].time + " " + getDirectionTitle(exampleJson[key].to);
            itemsList.push(option);
        }
    }
    let select = document.createElement("select");
    select.name = way;

    if (itemsList.length <= 0) {
        let placeholder = document.createElement("option");
        placeholder.value = "";
        placeholder.setAttribute("disabled", true);
        placeholder.setAttribute("selected", true);
        placeholder.textContent = "Нет доступных билетов";

        select.append(placeholder);
    }

    itemsList.forEach((element) => {
        select.append(element);
    });

    container.append(select);
}

function getDirectionTitle(direction) {
    switch (direction) {
        case "A":
            return "(из A в B)";
        case "B":
            return "(из B в A)";

        default:
            break;
    }
}
function num_word(value, words) {
    value = Math.abs(value) % 100;
    var num = value % 10;
    if (value > 10 && value < 20) return words[2];
    if (num > 1 && num < 5) return words[1];
    if (num == 1) return words[0];
    return words[2];
}
function printResult(count, route, startTime) {
    let result = document.querySelector("#result");

    if (Array.isArray(startTime)) {
        TICKET_COST = 1200;
        result.innerHTML = `
        <br><br>
        Вы выбрали ${count} ${num_word(count, ["билет", "билета", "билетов"])} по маршруту ${route} стоимостью ${count * TICKET_COST}. <br>
        Это путешествие займет у вас ${TIME * 2} минут. <br>
        Теплоход отправляется в ${startTime[0]}, обратный теплоход выходит в ${startTime[1]}<br>
        `;
    } else {
        result.innerHTML = `
        <br><br>
        Вы выбрали ${count} ${num_word(count, ["билет", "билета", "билетов"])} по маршруту ${route} стоимостью ${count * TICKET_COST}. <br>
        Это путешествие займет у вас ${TIME} минут. <br>
        Теплоход отправляется в ${startTime}<br>
        `;
    }
}

function calculate(count) {
    let route = document.querySelector("#route").value;

    if (route == "из A в B") {
        let time = document.querySelector(".timeline select").value;
        printResult(count, route, time);
    } else if (route == "из B в A") {
        let time = document.querySelector(".timeline select").value;
        printResult(count, route, time);
    } else if (route == "из A в B и обратно в А") {
        let time = document.querySelectorAll(".timeline select")[0].value;
        let time2 = document.querySelectorAll(".timeline select")[1].value;
        printResult(count, route, [time, time2]);
    }
}
let TICKET_COST = 700;
const TIME = 50;

document.addEventListener("DOMContentLoaded", () => {
    let timeline = document.querySelector(".timeline");
    let wayChoseInput = document.querySelector("#route");

    let submitButton = document.querySelector("#submit");

    wayChoseInput.addEventListener("change", (e) => {
        let value = wayChoseInput.value;

        if (value == "из A в B") {
            timeline.innerHTML = "";
            printAvailableTickets(timeline, "A");
        } else if (value == "из B в A") {
            timeline.innerHTML = "";
            printAvailableTickets(timeline, "B");
        } else if (value == "из A в B и обратно в А") {
            timeline.innerHTML = "";
            printAvailableTickets(timeline, "A");
            printAvailableTickets(timeline, "B");
        }
    });

    document.addEventListener("change", (e) => {
        if (e.target.getAttribute("name") == "A" && wayChoseInput.value == "из A в B и обратно в А") {
            let time = e.target.value;
            let secondTimeSelect = document.querySelector(".timeline select[name=B]");

            function checkTime(time) {
                let arr = time.split(":");
                let hour = arr[0];
                let minute = arr[1];

                if (minute > 10) {
                    let calc = ((+minute + +TIME) % 60) + "";
                    minTime = +hour + 1 + ":" + calc.padStart(2, "0");
                } else {
                    minTime = hour + ":" + (+minute + +TIME);
                }

                minDate = new Date();
                minDate.setHours(minTime.split(":")[0], minTime.split(":")[1], 0, 0);

                let optionsList = document.querySelector(".timeline select[name=B]");
                optionsList.querySelectorAll("option").forEach((item) => {
                    var d = new Date();
                    d.setHours(item.value.split(":")[0], item.value.split(":")[1], 0, 0);

                    if (minDate.getTime() - d.getTime() > 0) {
                        item.setAttribute("disabled", true);
                    } else {
                        item.removeAttribute("disabled");
                    }
                });
            }

            secondTimeSelect.value = false;
            checkTime(time);
        }
    });

    submitButton.addEventListener("click", (e) => {
        let count = document.querySelector("#num").value;
        calculate(count, TICKET_COST);
    });
});
