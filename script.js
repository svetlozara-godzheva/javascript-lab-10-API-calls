let fetchButton = document.getElementById("fetch-btn");
let xhrButton = document.getElementById("xhr-btn");
fetchButton.addEventListener("click", () => {
    fetch("https://jsonplaceholder.typicode.com/posts/1").then(response => {
        if (response.status != 200) {
            alert("Server response was not 200");
        }
        return response.json();
    }).then(data => {
        console.log(data);
        displayResponse(data);
    }).catch(error => console.log("Error fetching post information", error));
});

function displayResponse(e) {
    let title = document.getElementById("title");
    title.innerHTML = e.title;
    let body = document.getElementById("body");
    body.innerHTML = e.body;


}
