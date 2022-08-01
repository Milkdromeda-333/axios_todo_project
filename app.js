let url = "https://api.vschool.io/andromeda/todo/";
const form = document["myForm"];
const list = document.getElementsByClassName("list")[0];

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
        addItems(listData);
    }
};

const addItems = data => {

    let listItem = document.createElement("li");
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    listItem.prepend(checkbox);



    let result = `${data.title}`;
    if (data.description) {
        result = result.concat(": ", data.description);
    }
    if (data.price) {
        result = result.concat(" ", data.price);
    }
    let p = document.createElement("p");
    p.append(result);
    listItem.append(p);

    let itemUrl = url + data._id;

    checkbox.addEventListener("change", (e) => {
        if (e.target.checked) {
            axios.put(itemUrl, {
                completed: true
            })
                .catch(err => console.log(err));

            p.style.textDecoration = "line-through";
            p.style.textDecorationColor = "rgb(246, 94, 190)";
            checkbox.checked = true;
        }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "x";
    deleteBtn.setAttribute("style", "margin-left: 10px;");
    listItem.append(deleteBtn);

    deleteBtn.addEventListener("click", () => {
        axios.delete(itemUrl).then(res => alert(res.data.msg)).then(list.removeChild(listItem)).catch((err) => alert(err));
        console.log(itemUrl);
    });

    if (data.completed) {
        p.style.textDecoration = "line-through";
        p.style.textDecorationColor = "rgb(246, 94, 190)";
        checkbox.checked = true;
    }

    let imgUrl = data.imgUrl;
    if (imgUrl !== undefined) {
        const img = document.createElement("img");
        img.src = imgUrl;
        listItem.appendChild(img);
    }

    list.appendChild(listItem);
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
        .then(response => addItems(response.data))
        .catch(err => console.log(err));


    document.getElementById("listItem").value = "";
    document.getElementById("listDescription").value = "";
    document.getElementById("listPrice").value = "";
    document.getElementById("listImgUrl").value = "";
});
