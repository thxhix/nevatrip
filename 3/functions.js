export let TICKET_COST = 700;
export const TIME = 50;

export let exampleJson = {
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

export function checkTime(time) {
    let minTime = "";
    let arr = time.split(":");
    let hour = arr[0];
    let minute = arr[1];

    let timeTemp = new Date();
    timeTemp.setHours(hour, minute, 0, 0);
    minTime = new Date(timeTemp.getTime() + TIME * 60000);

    let optionsList = document.querySelector(".timeline select[name=B]");
    optionsList.querySelectorAll("option").forEach((item) => {
        var d = new Date();
        d.setHours(item.value.split(":")[0], item.value.split(":")[1], 0, 0);

        if (minTime.getTime() - d.getTime() > 0) {
            item.setAttribute("disabled", true);
        } else {
            item.removeAttribute("disabled");
        }
    });
}
export function printAvailableTickets(container, way, data) {
    let itemsList = [];

    for (var key in data) {
        if (data[key].to == way) {
            let option = document.createElement("option");
            option.value = data[key].time;
            option.textContent = data[key].time + " " + getDirectionTitle(data[key].to);
            itemsList.push(option);
        } else if (way == "ALL") {
            let option = document.createElement("option");
            option.value = data[key].time;
            option.textContent = data[key].time + " " + getDirectionTitle(data[key].to);
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
export function calculate(count) {
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
