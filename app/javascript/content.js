document.addEventListener("DOMContentLoaded", function() {
    let contentsContainer = document.getElementById("contents-container");

    // Make AJAX request to fetch JSON data
    let request = new XMLHttpRequest();
    request.open("GET", "news.json", true);
    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
            let contents = JSON.parse(request.responseText);

            // Render JSON content on the page
            contentsContainer.innerText = JSON.stringify(contents);
        }
    };
    request.send();
});