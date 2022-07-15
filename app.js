let url = "https://api.vschool.io/andromeda/todo";
const form = document["myForm"];
const ul = document.getElementsByTagName("ul")[0];
const submitBtn = document.getElementsByTagName("button")[0];
let toDo = document.getElementById("listItem").value;
let toDoDescription = document.getElementById("listDescription").value;
// this adds the current list to the screen on loading
let getData = axios.get(url)
    .then(response => addCurrentList(response.data))
    .catch(err => console.log(err));


// this updates the list to have all of the current items

const addCurrentList = (data) => {
    // this allows there to be a notification that there is no data yet if ther is none. 
    if (!data) {
        return;
    }

    ul.innerHTML = "";
    for (let listData of data) {
        let listItem = document.createElement("li");
        listItem.innerHTML = listData.title + ": " + listData.description;
        if (listData.completed === true) {
            listItem.style.textDecoration = "line-through";
            listItem.style.textDecorationColor = "rgb(246, 94, 190)";
        }

        let imgUrl = listData.imgUrl;
        if (imgUrl !== undefined) {
            const img = document.createElement("img");
            img.src = imgUrl;
            // img.setAttribute("style", "float: ;");
            listItem.appendChild(img);
        }

        ul.appendChild(listItem);
    }
};

const addNewItem = data => {

    let listItem = document.createElement("li");
    listItem.innerHTML = `${data.title}: ${data.description}`;

    if (data.completed === true) {
        listItem.style.textDecoration = "line-through";
        listItem.style.textDecorationColor = "rgb(246, 94, 190)";
    }

    let imgUrl = data.imgUrl;
    if (imgUrl !== undefined) {
        const img = document.createElement("img");
        img.src = imgUrl;
        // img.setAttribute("style", "float: ;");
        listItem.appendChild(img);
    }

    ul.appendChild(listItem);
};

// This adds the item after being submitted
form.addEventListener("submit", e => {
    e.preventDefault(); // prevent refresh of the page
    let toDoTitle = document.getElementById("listItem").value;
    let toDoDescription = document.getElementById("listDescription").value;

    const listItem = {
        title: toDoTitle,
        description: toDoDescription
    };

    axios.post(url, listItem)
        .then(response => addNewItem(response.data));

    document.getElementById("listItem").value = "";
    document.getElementById("listDescription").value = "";

    // 
});
