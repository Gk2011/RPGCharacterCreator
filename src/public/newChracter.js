function ajaxRequest(requestTag, value) {
    console.log(requestTag, value)

    if (value != 'Open this select menu') {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let requestInfo = JSON.parse(this.responseText);
                return requestInfo
                //document.getElementById('currentRaceName').innerHTML = `Race: ${myJson[0].name}`;
                //document.getElementById('raceAge').innerHTML = `Age: ${myJson[0].age}`;
                //document.getElementById('launguages').innerHTML = `Known Laungauges: ${myJson[0].languages[0].name}, ${myJson[0].languages[1].name}`;
    };

};

    xmlhttp.open("GET", '/new/ajax', true);
            xmlhttp.setRequestHeader('requestInfo', (requestTag));
            xmlhttp.setRequestHeader('requestValue', value);
            xmlhttp.send();
    };
};

function getClass(value) {
    let classInfo = (ajaxRequest('class', value));
    console.log(classInfo);

};

function getRace(value) {
    let raceInfo = ajaxRequest('race', value);
    console.log(raceInfo);

};