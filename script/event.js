const wrapperContainer = document.querySelector(".wrapper");
const menuContainer = document.getElementById("menu-container");
const menuBackground = document.getElementById("menu-background");
const lastSearchContainer = document.getElementById("last-search");
let lastSearch = JSON.parse(localStorage.getItem("fo4_hth_last_search"));
const firstInput = document.getElementById("first-input");
const secondInput = document.getElementById("second-input");
const limitInput = document.getElementById("limit-input");
const topBtn = document.getElementById("top-btn");
const modalContent = document.getElementById("modal-content");
const filterBtn = document.getElementsByClassName("filter-btn");
const matchBtn = document.getElementsByClassName("match-btn");

function setLastSearch() {
  lastSearch = JSON.parse(localStorage.getItem("fo4_hth_last_search"));
  if (lastSearch !== null) {
    lastSearchContainer.innerHTML = `<span>${lastSearch.first}</span><br /> VS <br /><span>${lastSearch.second}</span>`;
  } else {
    lastSearchContainer.innerHTML = "<span>최근 검색한 유저가 없음</span>";
  }
}

window.onload = () => {
  setLastSearch();
};

function menu() {
  menuContainer.classList.toggle("active");
  menuBackground.classList.toggle("active");
  wrapperContainer.scrollTo({ top: 0, behavior: "smooth" });
  wrapperContainer.classList.toggle("active");
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

wrapperContainer.addEventListener("scroll", () => {
  if (wrapperContainer.scrollTop > 300) {
    document.querySelector("#top-btn.hidden").classList.remove("disappear");
    document.querySelector("#top-btn.hidden").classList.add("appear");
  } else {
    if (topBtn.classList.contains("appear")) {
      topBtn.classList.add("disappear");
      setTimeout(function () {
        topBtn.classList.remove("appear");
      }, 1001);
    }
  }
});

topBtn.addEventListener("click", function (e) {
  e.preventDefault();
  wrapperContainer.scrollTo({ top: 0, behavior: "smooth" });
});

// 문자열 byte 구하기
String.prototype.getBytes = function () {
  const contents = this;
  let str_character;
  let int_char_count = 0;
  let int_contents_length = contents.length;

  for (k = 0; k < int_contents_length; k++) {
    str_character = contents.charAt(k);
    if (escape(str_character).length > 4) int_char_count += 2;
    else int_char_count++;
  }

  return int_char_count;
};

// 배열 n개씩 나누기
Array.prototype.division = function (n) {
  var arr = this;
  var len = arr.length;
  var cnt = Math.floor(len / n) + (Math.floor(len % n) > 0 ? 1 : 0);
  var tmp = [];

  for (var i = 0; i < cnt; i++) {
    tmp.push(arr.splice(0, n));
  }

  return tmp;
};

// 승률 구하기
function percentage({ totalMatch, totalResult }) {
  return [
    Math.round((totalResult[0] / totalMatch) * 100),
    Math.round((totalResult[1] / totalMatch) * 100),
    Math.round((totalResult[2] / totalMatch) * 100),
  ];
}

function matchFilter(result) {
  var noHide = 0;
  if (event.target.classList.contains("on")) {
    for (let i = 0; i < matchBtn.length; i++) {
      matchBtn[i].classList.remove("hide");
    }
    for (let i = 0; i < filterBtn.length; i++) {
      filterBtn[i].classList.remove("on");
    }
    resultsContainer.classList.remove("hide");
  } else {
    for (let i = 0; i < filterBtn.length; i++) {
      filterBtn[i].classList.remove("on");
    }
    for (let i = 0; i < matchBtn.length; i++) {
      if (matchBtn[i].classList.contains(result)) {
        matchBtn[i].classList.remove("hide");
        noHide++;
      } else {
        matchBtn[i].classList.add("hide");
      }
    }
    if (noHide == 0) {
      resultsContainer.classList.add("hide");
    } else {
      resultsContainer.classList.remove("hide");
    }
    event.target.classList.add("on");
  }
}
