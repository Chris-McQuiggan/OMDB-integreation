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
    tr += "<td>|--------------------------- Title ---------------------------|</td><td>|-- Year --|</td><td>|----- Type -----|</td><td>|------ More Detail ------|</td></tr>";
    for (let i = 0; i < result.Search.length; i++) {
        //output to table
        let btn = document.createElement('input');
        btn.type = "button";
        btn.className = "btn";
        btn.value = "More Detail";
        // btn.onclick = moreClick(result.imdbID);
        tr += "<td>" + result.Search[i].Title + "   </td><td>" + result.Search[i].Year + "   </td><td>" + result.Search[i].Type + "   </td></tr>";
        // td.appendChild(btn);
    }
    tbody.innerHTML += tr;
   
    // for (let c in result) {
    //     let output = "Class ID:-- " + JSON.stringify(result[c].classID) + "  Trainer:-- " + JSON.stringify(result[c].trainer);
    //     let node = document.createElement("div");
    //     let textnode = document.createTextNode(output);
    //     node.setAttribute("id", "return" + c);
    //     node.appendChild(textnode);
    //     document.getElementById("results").appendChild(node);
    // }
}


function rejected(reason) {
    alert("An Error occured. Please check input.\n" + reason);
    console.log(reason);
}
