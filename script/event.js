const menuContainer = document.getElementById("menu-container");
const lastSearchContainer = document.getElementById("last-search");
let lastSearch = JSON.parse(localStorage.getItem("fo4_hth_last_search"));
const firstInput = document.getElementById("first-input");
const secondInput = document.getElementById("second-input");

function setLastSearch() {
  lastSearch = JSON.parse(localStorage.getItem("fo4_hth_last_search"));
  if (lastSearch !== null) {
    lastSearchContainer.innerHTML = `<span>${lastSearch.first}</span> VS <span>${lastSearch.second}</span>`;
  } else {
    lastSearchContainer.innerHTML = "<span>최근 검색한 유저가 없음</span>";
  }
}

window.onload = () => {
  setLastSearch();
};

function menu() {
  menuContainer.classList.toggle("active");
}

lastSearchContainer.addEventListener("click", () => {
  if (lastSearch !== null) {
    firstInput.value = lastSearch.first;
    secondInput.value = lastSearch.second;
    menu();
    search();
  }
});

function dateFormat(date) {
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  month = month >= 10 ? month : "0" + month;
  day = day >= 10 ? day : "0" + day;
  hour = hour >= 10 ? hour : "0" + hour;
  minute = minute >= 10 ? minute : "0" + minute;
  second = second >= 10 ? second : "0" + second;

  return (
    date.getFullYear() +
    "년 " +
    month +
    "월 " +
    day +
    "일 " +
    hour +
    ":" +
    minute
  );
}
