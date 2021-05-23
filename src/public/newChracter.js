function ajaxRequest(requestTag, value) {
    console.log(value);

    if (value != 'Open this select menu') {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var myJson = JSON.parse(this.responseText);

                document.getElementById('currentRaceName').innerHTML = `Race: ${myJson[0].name}`;
                document.getElementById('raceAge').innerHTML = `Age: ${myJson[0].age}`;
                document.getElementById('launguages').innerHTML = `Known Laungauges: ${myJson[0].languages[0].name}, ${myJson[0].languages[1].name}`;
    };

};

xmlhttp.open("GET", '/new/raceinfo', true);
            xmlhttp.setRequestHeader('raceSelected', value);
            xmlhttp.send();
    };
};