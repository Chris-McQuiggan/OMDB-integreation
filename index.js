function buttonGet() {
    let reqType = "GET";
    let search = document.getElementById("searchTerm").value;
    let url = "http://www.omdbapi.com/?s=" + search + "&apikey=5d3ead47";
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
    let node = document.createElement("tbody");
    node.setAttribute("id", "tbody");
    document.getElementById("results").appendChild(node);
    let tr = "<tr>";
    tr += "<td>|--------------------------- Title ---------------------------|</td><td>|-- Year --|</td><td>|----- Type -----|</td><td>|---- More Detail ----|</td></tr>";
    for (let i = 0; i < result.Search.length; i++) {
        //output to table
        console.log(result.Search[i].imdbID);
        let btn = '<input class="btn btn-info btn-sm col-6" type="button" id=result' + i + " value='More Details' onclick = 'moreButton("+ '"' + result.Search[i].imdbID +'"'+ ")' >";
        tr += "<td>" + result.Search[i].Title + "   </td><td>" + result.Search[i].Year + "   </td><td>" + result.Search[i].Type + "   </td><td>" + btn + "</td></tr>";
    }
    tbody.innerHTML += tr;
}


function rejected(reason) {
    alert("An Error occured. Please check input.");
    console.log(reason);
}

function moreButton(imdbID) {
    sessionStorage.setItem('result', imdbID);
    document.location.href = 'result.html';
}
