// const API_URL = "https://fo4-hth-api.herokuapp.com";
const API_URL = "http://localhost:3000";

const searchBtn = document.getElementById("search-btn");
const cancelBtn = document.getElementById("cancel-btn");
const totalContainer = document.getElementById("total");
const resultsContainer = document.getElementById("results");

function search() {
  const firstInputValue = firstInput.value;
  const secondInputValue = secondInput.value;
  const limitInputValue = limitInput.value;

  if (firstInputValue == "" || secondInputValue == "") {
    alert("구단주명을 모두 입력해주세요.");
  } else if (limitInputValue < 1 || limitInputValue > 100) {
    alert("경기 수는 1부터 100까지만 입력할 수 있습니다.");
  } else {
    searchBtn.setAttribute("disabled", true);
    searchBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 검색`;
    cancelBtn.classList.add("api-active");

    const abortController = new AbortController();
    cancelBtn.addEventListener(
      "click",
      () => {
        abortController.abort();
        apiFinish();
      },
      { once: true }
    );

    fetch(
      `${API_URL}/search?first=${firstInputValue}&second=${secondInputValue}&limit=${limitInputValue}`,
      {
        method: "GET",
        signal: abortController.signal,
      }
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.message == "First user could not found") {
          alert("첫번째 구단주를 찾을 수 없음");
        } else if (result.message == "Second user could not found") {
          alert("두번째 구단주를 찾을 수 없음");
        } else if (result.message == "No last matches") {
          totalContainer.innerHTML = "";
          resultsContainer.innerHTML =
            "<h3>최근 30경기 중 같이 한 경기를 찾을 수 없습니다.</h3>";
        } else {
          localStorage.setItem(
            "fo4_hth_last_search",
            JSON.stringify({
              first: firstInputValue,
              second: secondInputValue,
            })
          );
          setLastSearch();

          const totalData = result.totalData;
          const matchData = result.matchData;

          resultsContainer.innerHTML = "";

          totalContainer.innerHTML = `
            <div class="card">
              <div class="card-body">
                <div class="card-title grid">
                  <span class="item">${firstInputValue}</span>
                  <small class="item text-muted">총 ${totalData.totalMatch}경기</small>
                  <span class="item">${secondInputValue}</span>
                </div>
                <div class="progress mb-2">
                  <div class="progress-bar progress-bar" role="progressbar" style="width: ${totalData.totalPer[0]}%" aria-valuenow="${totalData.totalPer[0]}" aria-valuemin="0" aria-valuemax="100"></div>
                  <div class="progress-bar progress-bar bg-secondary" role="progressbar" style="width: ${totalData.totalPer[1]}%" aria-valuenow="${totalData.totalPer[1]}" aria-valuemin="0" aria-valuemax="100"></div>
                  <div class="progress-bar progress-bar bg-danger" role="progressbar" style="width: ${totalData.totalPer[2]}%" aria-valuenow="${totalData.totalPer[2]}" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <div class="count grid mb-1">
                    <div class="item">
                      <button type="button" class="btn btn-primary item">${totalData.totalResult[0]}</button>
                    </div>
                    <div class="item">
                      <button type="button" class="btn btn-secondary item">${totalData.totalResult[1]}</button>
                    </div>
                    <div class="item">
                      <button type="button" class="btn btn-danger item">${totalData.totalResult[2]}</button>
                    </div>
                </div>
                <div class="count grid">
                    <small class="item">${firstInputValue}<br>${totalData.totalPer[0]}%</small>
                    <small class="item">무승부<br>${totalData.totalPer[1]}%</small>
                    <small class="item">${secondInputValue}<br>${totalData.totalPer[2]}%</small>
                </div>
              </div>
            </div>
          `;

          matchData.map((match) => {
            resultsContainer.innerHTML += `
              <button type="button" id="${
                match.id
              }" class="list-group-item list-group-item-action">
                <p class="date mb-1">${dateFormat(new Date(match.date))}</p>
                  <div class="grid result">
                    <p class="item nickname">${firstInputValue}</p>
                    <div class="item">
                      <h4>${match.firstGoal} - ${match.secondGoal}</h4>
                    </div>
                    <p class="item nickname">${secondInputValue}</p>
                  </div>
                ${
                  match.shootOut
                    ? `<small class="shoot-out">(Pen ${match.firstShootOutGoal} - ${match.secondShootOutGoal})</small>`
                    : ``
                }
              </button>
            `;
          });
        }

        apiFinish();
      });
  }
}

searchBtn.addEventListener("click", () => {
  search();
});

function apiFinish() {
  searchBtn.removeAttribute("disabled");
  searchBtn.innerHTML = "검색";
  firstInput.value = "";
  secondInput.value = "";
  cancelBtn.classList.remove("api-active");
}
