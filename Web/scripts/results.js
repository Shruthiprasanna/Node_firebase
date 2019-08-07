window.onload = function () {
    var result = sessionStorage.getItem("SEOOutput");
    sessionStorage.removeItem("SEOOutput");
    CreateTableFromJSON(JSON.parse(result));
}


function CreateTableFromJSON(jsonData) {

    var resultTableHeaders = ["Page Elements", "Client's Page Results", "Average of Competitors Results"];
    var resultRowHeaders = ["Word Count", "H1 Tag", "H2 Tag", "H3 Tag", "H4 Tag", "H5 Tag", "H6 Tag", "Img Tag Count", "Link Tag", "Keywords in Meta Tag", "Bold Tag", "Italic Tag", "Keywords in Title Tag"];
    var resultRowKeys = ["wordCount", "h1Tag", "h2Tag", "h3Tag", "h4Tag", "h5Tag", "h6Tag", "imgTag", "linkTag", "keyword", "boldTag", "italicTag", "titleTag"];


    var table = document.createElement("table");


    var tr = table.insertRow(-1);

    for (var i = 0; i < resultTableHeaders.length; i++) {
        var th = document.createElement("th");
        th.innerHTML = resultTableHeaders[i];
        tr.appendChild(th);
    }

    for (var i = 0; i < resultRowHeaders.length; i++) {

        tr = table.insertRow(-1);

        tr.insertCell(-1).innerHTML = resultRowHeaders[i];

        tr.insertCell(-1).innerHTML = "Your " + resultRowHeaders[i] + " " + "is " + jsonData.clientURLResult[resultRowKeys[i]];

        if (jsonData.competitor1URLResult) {
            tr.insertCell(-1).innerHTML = "Your competitors " + resultRowHeaders[i] + " " + "is " + jsonData.competitor1URLResult[resultRowKeys[i]];
        }

        if (jsonData.competitor2URLResult) {
            tr.insertCell(-1).innerHTML = + resultRowHeaders[i] + " " + "is " + jsonData.competitor2URLResult[resultRowKeys[i]];
        }

        if (jsonData.competitor3URLResult) {
            tr.insertCell(-1).innerHTML = jsonData.competitor3URLResult[resultRowKeys[i]];
        }

        tr.insertCell(-1).innerHTML = "Your competitors average " + resultRowHeaders[i] + " " + "is " + jsonData.average[resultRowKeys[i]];

    }

    var divContainer = document.getElementById("results");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}





