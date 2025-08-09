let fetchButton = document.getElementById("fetch-btn");
let xhrButton = document.getElementById("xhr-btn");
let title = document.getElementById("title");
let body = document.getElementById("body");
let formId = document.getElementById("form-id");
let formTitle = document.getElementById("form-title");
let formBody = document.getElementById("form-body");
let form = document.getElementById("form");
let messages = document.getElementById("messages");

fetchButton.addEventListener("click", () => {
    fetch("https://jsonplaceholder.typicode.com/posts/1").then(response => {
        if (response.status != 200) {
            throw new Error(`Server response was not 200 but was ${response.status}`);
        } else {
            return response.json();
        }
    }).then(data => {
        console.log(data);
        displayPost(data);
    }).catch(error => displayMessage(error));
});

xhrButton.addEventListener("click", () => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://jsonplaceholder.typicode.com/posts/2", true);
    xhr.onload = () => {
        if (xhr.status === 200) {
            console.log("Response:", xhr.responseText);
            let data = JSON.parse(xhr.responseText);
            displayPost(data);
        } else {
            displayMessage(`Server response was not 200 but was ${response.status}`);
        }
    };
    xhr.onerror = () => {
        displayMessage("Error fetching post information");
    };
    xhr.send();
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!formId.value) {
        let data = {
            title: formTitle.value,
            body: formBody.value
        }
        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: JSON.stringify(data)
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Server response was not 200 but was ${response.status}`);
            } else {
                return response.json();
            }
        }).then(responseJson => {
            displayMessage(`The post was created successfully! Response: ${JSON.stringify(responseJson)}`);
            data.id = responseJson.id;
            displayPost(data);
        }).catch(error => displayMessage(error));
    } else {
        let data = {
            id: formId.value,
            title: formTitle.value,
            body: formBody.value
        }
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", `https://jsonplaceholder.typicode.com/posts/${formId.value}`, true);
        xhr.onload = () => {
            if (xhr.status === 200) {
                console.log("Response:", xhr.responseText);
                displayMessage(`The post was updated successfully! Response: ${xhr.responseText}`);
                displayPost(data);
            } else {
                displayMessage(`Server response was not 200 but was ${response.status}`);
            }
        };
        xhr.onerror = () => {
            displayMessage("Error fetching post information");
        };
        xhr.send(JSON.stringify(data));
    }
});

function displayMessage(text) {
    messages.innerHTML += `<p>${text}</p>`;
}
function displayPost(post) {
    messages.innerHTML += `<div class="post">
     <h3 id="title">${post.title}(${post.id})</h3>
     <p id="body">${post.body}</p>
    </div>`
}