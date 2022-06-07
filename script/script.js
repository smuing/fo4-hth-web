const apiUrl = 'https://api.nexon.co.kr/fifaonline4/v1.0'
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiODIyNzE0OTkxIiwiYXV0aF9pZCI6IjIiLCJ0b2tlbl90eXBlIjoiQWNjZXNzVG9rZW4iLCJzZXJ2aWNlX2lkIjoiNDMwMDExNDgxIiwiWC1BcHAtUmF0ZS1MaW1pdCI6IjUwMDoxMCIsIm5iZiI6MTY1MTY3MTE4MiwiZXhwIjoxNjY3MjIzMTgyLCJpYXQiOjE2NTE2NzExODJ9.PUcQ414weUTXEcAEA9IioWHWI1kH0SJVa5D5FYIXa5U';

const searchBtn = document.getElementById("search-btn");

function search() {

    fetch("https://fo4-hth-api.herokuapp.com/search?first=런던토종닭&second=마네는귀요미", {
            method: 'GET'
        }).then(res => res.json()).then(result => console.log(result))
}
