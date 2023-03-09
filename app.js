const buttons = document.querySelectorAll(".button");
const categories = document.querySelectorAll(".category");
const currentHours = document.querySelectorAll(".current-hours");
const previousHours = document.querySelectorAll(".previous-hours");

function activateButton(button) {
  buttons.forEach((button) => button.classList.remove("active"));
  button.classList.add("active");
}

function updateCategories(activity, clickedOption) {
  categories.forEach((category, index) => {
    if (
      category.classList.contains(
        activity.title.toLowerCase().replace(" ", "-")
      )
    ) {
      currentHours[
        index
      ].innerHTML = `${activity.timeframes[clickedOption].current}hrs`;
      previousHours[
        index
      ].innerHTML = `Last Week - ${activity.timeframes[clickedOption].previous}hrs`;
    }
  });
}

async function getData(clickedOption) {
  const url = "data.json";
  const response = await fetch(url);
  const data = await response.json();
  data.forEach((activity) => {
    updateCategories(activity, clickedOption);
  });
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    activateButton(button);
    const clickedOption = button.dataset.option;
    getData(clickedOption);
  });
});
