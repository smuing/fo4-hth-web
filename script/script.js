const apiUrl = 'https://api.nexon.co.kr/fifaonline4/v1.0'
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiODIyNzE0OTkxIiwiYXV0aF9pZCI6IjIiLCJ0b2tlbl90eXBlIjoiQWNjZXNzVG9rZW4iLCJzZXJ2aWNlX2lkIjoiNDMwMDExNDgxIiwiWC1BcHAtUmF0ZS1MaW1pdCI6IjUwMDoxMCIsIm5iZiI6MTY1MTY3MTE4MiwiZXhwIjoxNjY3MjIzMTgyLCJpYXQiOjE2NTE2NzExODJ9.PUcQ414weUTXEcAEA9IioWHWI1kH0SJVa5D5FYIXa5U';

const searchBtn = document.getElementById("search-btn");

function search() {

    const firstTeamInput = document.getElementById("first-team").value;
    const secondTeamInput = document.getElementById("second-team").value;
    
    searchBtn.setAttribute("disabled", true);
    searchBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>검색`;

    fetch("https://fo4-hth-api.herokuapp.com/search?first=런던토종닭&second=마네는귀요미", {
        method: 'GET',
        mode: 'no-cors'
    }).then(response => console.log(response))
    // fetch(`${apiUrl}/users?nickname=${firstTeamInput}`, {
    //     method: 'GET',
    //     headers: { 'Authorization': apiKey },
    // }).then(response => response.json()).then(result => {
    //         if (result.message) {
    //             if (result.message == "User could not found") {
    //                 alert("첫 번째 구단주를 찾을 수 없습니다.");
    //             }
    //         }
    //         fetch(`${apiUrl}/users/${result.accessId}/matches?matchtype=40&limit=30`, {
    //             method: 'GET',
    //             headers: { 'Authorization': apiKey },
    //         })
    //             .then(response => response.json())
    //             .then(async (result) => {
    //                 var matchData = [];
    //                 for (const matchId of result) {
    //                     const data = await fetch(`${apiUrl}/matches/${matchId}`, {
    //                         method: 'GET',
    //                         headers: { 'Authorization': apiKey },
    //                     }).then(response => response.json())
    //                     if (data.matchInfo[0].matchDetail.matchEndType == 0) {
    //                         if (data.matchInfo[0].nickname == secondTeamInput || data.matchInfo[1].nickname == secondTeamInput) {
    //                             let firstTeamData = data.matchInfo[data.matchInfo[0].nickname == secondTeamInput ? 1 : 0];
    //                             let secondTeamData = data.matchInfo[data.matchInfo[0].nickname == secondTeamInput ? 0 : 1];
    //                             if (firstTeamData.shoot.goalTotalDisplay == secondTeamData.shoot.goalTotalDisplay) {
    //                                 matchData.push({
    //                                     id: data.matchId,
    //                                     matchResult: firstTeamData.matchDetail.matchResult,
    //                                     firstTeamGoal: firstTeamData.shoot.goalTotalDisplay,
    //                                     secondTeamGoal: secondTeamData.shoot.goalTotalDisplay,
    //                                     shootOut: true,
    //                                     firstTeamShootOutGoal: firstTeamData.shoot.shootOutScore,
    //                                     secondTeamShootOutGoal: secondTeamData.shoot.shootOutScore,
    //                                 })
    //                             } else {
    //                                 matchData.push({
    //                                     id: data.matchId,
    //                                     matchResult: firstTeamData.matchDetail.matchResult,
    //                                     firstTeamGoal: firstTeamData.shoot.goalTotalDisplay,
    //                                     secondTeamGoal: secondTeamData.shoot.goalTotalDisplay
    //                                 })
    //                             }
    //                         }
    //                     }
    //                 }
    //                 console.log(matchData);
    //                 let win = 0;
    //                 let draw = 0;
    //                 let lose = 0;
    //                 document.getElementById("score").innerHTML = ``
    //                 matchData.map((match) => {
    //                     if (match.matchResult == "승") {
    //                         win++;
    //                     } else if (match.matchResult == "패") {
    //                         lose++;
    //                     } else {
    //                         draw++;
    //                     }
    //                     if (match.shootOut) {
    //                         document.getElementById("score").innerHTML += `${match.firstTeamGoal} - ${match.secondTeamGoal} ( Pen ${match.firstTeamShootOutGoal} - ${match.secondTeamShootOutGoal} ) <br/>`
    //                     } else {
    //                         document.getElementById("score").innerHTML += `${match.firstTeamGoal} - ${match.secondTeamGoal} <br/>`
    //                     }
    //                 })
    //                 document.getElementById("search-btn").removeAttribute("disabled");
    //                 document.getElementById("search-btn").innerHTML = `검색`;
    //                 let odds = [Math.round(win / matchData.length * 100), Math.round(draw / matchData.length * 100), Math.round(lose / matchData.length * 100)]
    //                 document.querySelector('.progress').innerHTML = `
    //                         <div class="progress-bar progress-bar-striped" role="progressbar" style="width: ${odds[0]}%;" aria-valuenow="${odds[0]}" aria-valuemin="0" aria-valuemax="100"></div>
    //                         <div class="progress-bar progress-bar-striped bg-secondary" role="progressbar" style="width: ${odds[1]}%;" aria-valuenow="${odds[1]}" aria-valuemin="0" aria-valuemax="100"></div>
    //                         <div class="progress-bar progress-bar-striped bg-danger" role="progressbar" style="width: ${odds[2]}%;" aria-valuenow="${odds[2]}" aria-valuemin="0" aria-valuemax="100"></div>`
    //                 document.getElementById("result").innerHTML = `
    //                         <button type="button" class="btn btn-primary">${win}</button><span>${odds[0]}%</span>
    //                         <button type="button" class="btn btn-secondary">${draw}</button><span>${odds[1]}%</span>
    //                         <button type="button" class="btn btn-danger">${lose}</button><span>${odds[2]}%</span>
    //                         `
    //             })
    //             .catch(error => console.log('error', error))
    //     })
    //     .catch(error => console.log('error', error));
}
