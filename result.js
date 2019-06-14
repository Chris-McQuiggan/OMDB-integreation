function showDetails(){
    let reqType = "GET";
    let search = sessionStorage.getItem("result");
    let url = "http://www.omdbapi.com/?i=" + search + "&apikey=5d3ead47";
    makeRequest(reqType, url);
}

function makeRequest(reqType, url, body) {
    let req = new XMLHttpRequest();
    req.onload = function () {
        const el = document.getElementById('results');
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
        promises(req);
    }
    req.open(reqType, url);
    req.send(body);
}

function promises(req) {
    const createPromise = new Promise(
        function (res, rej) {
            if (req.status === 200) {
                let result = JSON.parse(req.responseText);
                res(result);
            } else {
                const reason = new Error(req.status);
                rej(reason);
            }
        }
    )
    createPromise
        .then(result => resolved(result))
        .catch(error => rejected(error))
}

function resolved(result) {
    //create table tags and headings
    console.log(result);
    let textnode = document.createTextNode("Title:- "+result.Title);
    let node = document.createElement("div");
    node.setAttribute("id", "title");
    node.appendChild(textnode);
    document.getElementById("results").appendChild(node);
    textnode = document.createTextNode("Released:- "+result.Year);
    node = document.createElement("div");
    node.setAttribute("id", "year");
    node.appendChild(textnode);
    document.getElementById("results").appendChild(node);
    textnode = document.createTextNode("Rated:- "+result.Rated);
    node = document.createElement("div");
    node.setAttribute("id", "rated");
    node.appendChild(textnode);
    document.getElementById("results").appendChild(node);
    node = document.createElement("br");
    document.getElementById("results").appendChild(node);
    node = document.createElement("img");
    node.setAttribute("id", "image");
    node.setAttribute("src", result.Poster);
    node.setAttribute("alt", "Poster for "+result.Title);
    document.getElementById("results").appendChild(node);
}

function rejected(reason) {
    alert("An Error occured. Please check input.");
    console.log(reason);
}
showDetails();