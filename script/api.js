const API_URL = "https://fo4-hth-api.herokuapp.com";
// const API_TEST_URL = "http://localhost:3000";

const searchBtn = document.getElementById("search-btn");
const cancelBtn = document.getElementById("cancel-btn");
const totalContainer = document.getElementById("total");
const resultsContainer = document.getElementById("results");

async function search() {
  const firstInputValue = firstInput.value;
  const secondInputValue = secondInput.value;
  const limitInputValue = limitInput.options[limitInput.selectedIndex].value;

  var nickLength;
  const firstInputByte = firstInputValue.getBytes();
  const secondInputByte = secondInputValue.getBytes();
  firstInputByte >= secondInputByte
    ? (nickLength = firstInputByte)
    : (nickLength = secondInputByte);

  var success = false;
  var totalData = {
    totalMatch: 0,
    totalResult: [0, 0, 0],
    totalPer: [0, 0, 0],
  };
  var matchData = [];

  if (firstInputValue == "" || secondInputValue == "") {
    alert("구단주명을 모두 입력해 주세요.");
  } else if (firstInputValue == secondInputValue) {
    alert("서로 다른 구단주명을 입력해 주세요.");
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

    for (let i = 0; i < limitInputValue; i += 10) {
      const result = await fetch(
        `${API_URL}/search?first=${firstInputValue}&second=${secondInputValue}&offset=${i}&limit=10`,
        {
          method: "GET",
          signal: abortController.signal,
        }
      ).then((res) => res.json());

      if (result) {
        if (result.message == "First user could not found") {
          alert("첫 번째 구단주를 찾을 수 없습니다.");
          success = false;
          break;
        } else if (result.message == "Second user could not found") {
          alert("두 번째 구단주를 찾을 수 없습니다.");
          success = false;
          break;
        } else if (result.message == "No last matches") {
          totalContainer.innerHTML = "";
          resultsContainer.parentNode.classList.add("active");
          resultsContainer.innerHTML = `<div class="alert alert-danger" role="alert">
                                          최근 ${limitInputValue}경기 중 같이 플레이한 경기를 찾을 수 없습니다.</div>`;
          success = false;
          break;
        } else {
          localStorage.setItem(
            "fo4_hth_last_search",
            JSON.stringify({
              first: firstInputValue,
              second: secondInputValue,
            })
          );
          setLastSearch();

          totalData.totalMatch += result.totalData.totalMatch;
          totalData.totalResult[0] += result.totalData.totalResult[0];
          totalData.totalResult[1] += result.totalData.totalResult[1];
          totalData.totalResult[2] += result.totalData.totalResult[2];
          matchData.push(...result.matchData);

          success = true;
        }
      }
    }

    if (success) {
      totalData.totalPer = percentage(totalData);

      totalContainer.classList.add("active");
      resultsContainer.parentNode.classList.add("active");

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
            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: ${totalData.totalPer[0]}%" aria-valuenow="${totalData.totalPer[0]}" aria-valuemin="0" aria-valuemax="100"></div>
            <div class="progress-bar progress-bar-striped progress-bar-animated bg-secondary" role="progressbar" style="width: ${totalData.totalPer[1]}%" aria-valuenow="${totalData.totalPer[1]}" aria-valuemin="0" aria-valuemax="100"></div>
            <div class="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar" style="width: ${totalData.totalPer[2]}%" aria-valuenow="${totalData.totalPer[2]}" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <div class="count-container">
            <div class="count grid mb-1">
              <div class="item">
                <button type="button" class="btn btn-primary">${totalData.totalResult[0]}</button>
              </div>
              <div class="item">
                <button type="button" class="btn btn-secondary">${totalData.totalResult[1]}</button>
              </div>
              <div class="item">
                <button type="button" class="btn btn-danger">${totalData.totalResult[2]}</button>
              </div>
            </div>
            <div class="count per grid">
              <small class="item">${firstInputValue}<br>${totalData.totalPer[0]}%</small>
              <small class="item">무승부<br>${totalData.totalPer[1]}%</small>
              <small class="item">${secondInputValue}<br>${totalData.totalPer[2]}%</small>
            </div>
          </div>
        </div>
      </div>
    `;

      matchData.map((match) => {
        resultsContainer.innerHTML += `
        <button type="button" id="${
          match.id
        }" class="list-group-item list-group-item-action" onclick="modal(this)">
          <p class="date mb-1">${dateFormat(new Date(match.date))}</p>
            <div class="grid result ${
              nickLength <= 8
                ? ""
                : nickLength <= 10
                ? "short"
                : nickLength <= 12
                ? "m-short"
                : nickLength <= 14
                ? "m-long"
                : nickLength <= 16
                ? "long"
                : ""
            }">
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
  }
}

searchBtn.addEventListener("click", () => {
  search();
});

function apiFinish() {
  searchBtn.removeAttribute("disabled");
  searchBtn.innerHTML = "검색";
  cancelBtn.classList.remove("api-active");
}

function modal(e) {
  const id = e.getAttribute("id");
  const firstNick = document
    .getElementById(`${id}`)
    .getElementsByClassName("nickname")[0].textContent;
  const secondNick = document
    .getElementById(`${id}`)
    .getElementsByClassName("nickname")[1].textContent;
  const score = document
    .getElementById(`${id}`)
    .getElementsByTagName("h4")[0].textContent;
  const shootOut = document
    .getElementById(`${id}`)
    .getElementsByClassName("shoot-out")[0]?.textContent;
  const position = [
    "GK",
    "SW",
    "RWB",
    "RB",
    "RCB",
    "CB",
    "LCB",
    "LB",
    "LWB",
    "RDM",
    "CDM",
    "LDM",
    "RM",
    "RCM",
    "CM",
    "LCM",
    "LM",
    "RAM",
    "CAM",
    "LAM",
    "RF",
    "CF",
    "LF",
    "RW",
    "RS",
    "ST",
    "LS",
    "LW",
  ];

  fetch(`${API_URL}/match?matchId=${id}&first=${firstNick}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((result) => {
      let firstSquad = "";
      let secondSquad = "";
      result.firstPlayers.map((player, i) => {
        if (player.spName != undefined) {
          firstSquad += `<span class="position ${
            i == 0 ? "GK" : i <= 8 ? "DF" : i <= 19 ? "MF" : "FW"
          }">${position[i]}</span> ${
            player.spName
          }&emsp;<span class="badge rounded-pill ${
            player.spRating < 6
              ? "bg-danger"
              : player.spRating < 7
              ? "usually"
              : player.spRating < 9
              ? "good"
              : "bg-primary"
          }">${player.spRating}</span> <br />`;
        }
      });
      result.secondPlayers.map((player, i) => {
        if (player.spName != undefined) {
          secondSquad += `<span class="position ${
            i == 0 ? "GK" : i <= 8 ? "DF" : i <= 19 ? "MF" : "FW"
          }">${position[i]}</span> ${
            player.spName
          }&emsp;<span class="badge rounded-pill ${
            player.spRating < 6
              ? "bg-danger"
              : player.spRating < 7
              ? "usually"
              : player.spRating < 9
              ? "good"
              : "bg-primary"
          }">${player.spRating}</span> <br />`;
        }
      });

      modalContent.innerHTML = `
        <div id="modal" class="container">
          <div class="card">
            <div class="card-header">
              상세 정보
              <button
                type="button"
                class="btn-close"
                aria-label="Close"
                onclick="modalClose()"
              ></button>
            </div>
            <ul class="list-group list-group-flush mb-2">
              <li class="list-group-item">
                <div class="grid result">
                  <p class="item nickname">${firstNick}</p>
                  <div class="item">
                    <h4>${score}</h4>
                  </div>
                  <p class="item nickname">${secondNick}</p>
                </div>
                ${
                  shootOut ? `<small class="shoot-out">${shootOut}</small>` : ``
                }
              </li>
              <li class="list-group-item">
                <div class="grid result ratings">
                  <p class="item rating"><span class="badge rounded-pill ${
                    result.firstRating < 6
                      ? "bg-danger"
                      : result.firstRating < 7
                      ? "usually"
                      : result.firstRating < 9
                      ? "good"
                      : "bg-primary"
                  }">${result.firstRating}</span></p>
                  <div class="item">
                    <h5>경기 평점</h5>
                  </div>
                  <p class="item rating"><span class="badge rounded-pill ${
                    result.secondRating < 6
                      ? "bg-danger"
                      : result.secondRating < 7
                      ? "usually"
                      : result.secondRating < 9
                      ? "good"
                      : "bg-primary"
                  }">${result.secondRating}</span></p>
                </div>
              </li>
              <li class="list-group-item">
                <div class="squad-title mb-2">
                  <div class="item">
                    <h5>스쿼드</h5>
                  </div>
                </div>
                <div class="squad">
                  <div>
                    <p class="nickname mb-2">${firstNick}</p>
                    ${firstSquad}
                  </div>
                  <div>
                    <p class="nickname mb-2">${secondNick}</p>
                    ${secondSquad}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      `;
    });
  document.querySelector("#modal-content.hidden").classList.remove("disappear");
  document.querySelector("#modal-content.hidden").classList.add("appear");
  wrapperContainer.classList.add("active");
}

function modalClose() {
  if (modalContent.classList.contains("appear")) {
    modalContent.classList.add("disappear");
    setTimeout(function () {
      modalContent.classList.remove("appear");
    }, 1001);
  }
  wrapperContainer.classList.remove("active");
  modalContent.innerHTML = ``;
}
