function ajaxRequest(requestTag, value) {
    console.log(requestTag, value)

    if (value != 'Open this select menu') {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let requestInfo = JSON.parse(this.responseText);
                if (requestTag == 'race'){
                    formatRace(requestInfo);
                }else if (requestTag == 'class'){
                    formatClass(requestInfo)
                }
    };

};
    xmlhttp.open("GET", '/new/ajax', true);
            xmlhttp.setRequestHeader('requestInfo', (requestTag));
            xmlhttp.setRequestHeader('requestValue', value);
            xmlhttp.send();
    };
};

function formatClass(value) {
    console.log(value);

};

function formatRace(value) {
    console.log(value);

};