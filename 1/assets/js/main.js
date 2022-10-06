function addMoreTimeButton() {
    const MAX_ITEMS = 2;
    const LINE_HEIGHT = document.querySelector(".catalog-item .catalog-item-info-list__item--time .time-chose-list__item").clientHeight;
    let catalogItems = document.querySelectorAll(".catalog .catalog-item");

    catalogItems.forEach((item) => {
        let timeContainer = item.querySelector(".time-chose-list");

        if (timeContainer.clientHeight >= LINE_HEIGHT * 2) {
            let timeList = timeContainer.querySelectorAll(".time-chose-list__item");

            timeList.forEach((time, key) => {
                if (key + 1 > MAX_ITEMS) {
                    time.classList.add("hide");
                }
            });

            let showMoreButton = document.createElement("span");
            showMoreButton.classList.add("time-chose-list__more");
            showMoreButton.textContent = "Еще";
            timeContainer.append(showMoreButton);
        }
    });
}

function showMoreTime(target) {
    let toShow = target.querySelectorAll(".time-chose-list__item.hide");
    let moreButton = target.querySelector(".time-chose-list__more");

    toShow.forEach((item) => {
        if (item.classList.contains("hide")) {
            item.classList.remove("hide");
        }
    });
    moreButton.remove();
}

document.addEventListener("DOMContentLoaded", (e) => {
    addEventListener("resize", (event) => {
        addMoreTimeButton();
    });

    addMoreTimeButton();

    document.addEventListener("click", (e) => {
        let target = e.target;

        if (target.closest(".time-chose-list__more")) {
            showMoreTime(target.closest(".time-chose-list"));
        }
    });
});
