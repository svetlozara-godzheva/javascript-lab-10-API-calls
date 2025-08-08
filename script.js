let fetchButton = document.getElementById("fetch-btn");
let xhrButton = document.getElementById("xhr-btn");
let title = document.getElementById("title");
let body = document.getElementById("body");

fetchButton.addEventListener("click", () => {
    fetch("https://jsonplaceholder.typicode.com/posts/1").then(response => {
        if (response.status != 200) {
            alert("Server response was not 200");
        }
        return response.json();
    }).then(data => {
        console.log(data);
        title.innerHTML = data.title;
        body.innerHTML = data.body;
    }).catch(error => console.log("Error fetching post information", error));
});

xhrButton.addEventListener("click", () => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://jsonplaceholder.typicode.com/posts/2", true);
    xhr.onload = () => {
        if (xhr.status === 200) {
            console.log("Response:", xhr.responseText);
            let data = JSON.parse(xhr.responseText);
            title.innerHTML = data.title;
            body.innerHTML = data.body;
        } else {
            alert("Server response was not 200");
        }
    };

    xhr.onerror = () => {
        alert("Error fetching post information");
    };

    xhr.send();
});

