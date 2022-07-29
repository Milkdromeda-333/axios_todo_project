let url = "https://api.vschool.io/andromeda/todo";
const form = document["myForm"];
const list = document.getElementsByClassName("list")[0];
const submitBtn = document.getElementsByTagName("button")[0];
let toDo = document.getElementById("listItem").value;
let toDoDescription = document.getElementById("listDescription").value;

// this adds the current list to the screen on loading
let getData = axios.get(url)
    .then(response => addCurrentList(response.data))
    .catch(err => console.log(err));


// this updates the list to have all of the current items

const addCurrentList = (data) => {
    // this allows there to be a notification that there is no data yet if there is none. 
    if (!data) {
        return;
    }

    list.innerHTML = "";
    for (let listData of data) {
        let listItem = document.createElement("li");
        let checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        listItem.prepend(checkbox);


        let p = document.createElement("p");
        p.textContent = listData.title;
        listItem.append(p);

        if (listData.completed === true) {
            p.style.textDecoration = "line-through";
            p.style.textDecorationColor = "rgb(246, 94, 190)";
        }

        let imgUrl = listData.imgUrl;
        if (imgUrl !== undefined) {
            const img = document.createElement("img");
            img.src = imgUrl;
            listItem.appendChild(img);
        }

        let result = `${listData.title}`;
        if (listData.description) {
            result.concat(": ", listData.description);
        }
        if (listData.price !== null) {
            result.concat(" ", listData.price);
        }


        list.appendChild(listItem);
        // listItem.appendChild(text);
    }
};

const addNewItem = data => {
    let listItem = document.createElement("li");
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    listItem.prepend(checkbox);


    let p = document.createElement("p");
    p.textContent = data.title;
    listItem.append(p);

    if (data.completed === true) {
        p.style.textDecoration = "line-through";
        p.style.textDecorationColor = "rgb(246, 94, 190)";
    }

    let imgUrl = data.imgUrl;
    if (imgUrl !== undefined) {
        const img = document.createElement("img");
        img.src = imgUrl;
        listItem.appendChild(img);
    }

    let result = `${data.title}`;
    if (data.description) {
        result.concat(": ", data.description);
    }
    if (data.price !== null) {
        result.concat(" ", data.price);
    }


    list.appendChild(listItem);
    //
    // let listItem = document.createElement("input");
    // listItem.setAttribute("type", "checkbox");

    // listItem.textContent = `${data.title}: ${data.description} ${data.price}`;

    // if (data.completed === true) {
    //     listItem.style.textDecoration = "line-through";
    //     listItem.style.textDecorationColor = "rgb(246, 94, 190)";
    // }

    // let imgUrl = data.imgUrl;
    // if (imgUrl !== undefined) {
    //     const img = document.createElement("img");
    //     img.src = imgUrl;
    //     listItem.appendChild(img);
    // }

    // list.appendChild(listItem);

    listItem.addEventListener("click", () => {

    });
};

// This adds the item after being submitted
form.addEventListener("submit", e => {
    e.preventDefault(); // prevent refresh of the page
    let toDoTitle = document.getElementById("listItem").value;
    let toDoDescription = document.getElementById("listDescription").value;
    let toDoPrice = document.getElementById("listPrice").value;
    let toDoImgUrl = document.getElementById("listImgUrl").value;

    const listItem = {
        title: toDoTitle,
        description: toDoDescription,
        price: toDoPrice,
        imgUrl: toDoImgUrl
    };

    axios.post(url, listItem)
        .then(response => addNewItem(response.data))
        .catch(err => console.log(err));


    document.getElementById("listItem").value = "";
    document.getElementById("listDescription").value = "";
    document.getElementById("listPrice").value = "";
    document.getElementById("listImgUrl").value = "";
});
