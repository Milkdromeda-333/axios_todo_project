const axios = require('axios');

const form = document["myForm"];
const ul = document.getElementsByTagName("ul")[0];

let toDoList = axios.get("https://api.vschool.io/anjanique/todo")
    .then(response => console.log(response.data));