function showContent() {

    document.addEventListener('DOMContentLoaded', function() {
        let contentContainer = document.getElementById("content")

        // make AJAX request
        let request = new XMLHttpRequest()
        request.open('GET',"contents.json", true);
        request.onreadystatechange = function() {
            if (request.readyState === 4 && request.status === 200) {
                let contents = JSON.parse(request.responseText);

                //update id=content with JSON data
                contentContainer.innerHTML = JSON.stringify(contents);
            }
        };
        request.send();
    });

}