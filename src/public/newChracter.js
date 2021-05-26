function ajaxRequest(requestTag, value) {
    //console.log(requestTag, value)

    if (value != 'Open this select menu') {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let requestInfo = JSON.parse(this.responseText);
                if (requestTag == 'race'){
                    formatRace(requestInfo[0]);
                }else if (requestTag == 'class'){
                    formatClass(requestInfo[0])
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
    //clear overview
    document.getElementById('selectedOverview').innerHTML = "";
    document.getElementById('selectedOverview').append(createElement("H1", getName(value)));
    document.getElementById('selectedOverview').append(createElement("P", getProficiencies(value)));
};

function formatRace(value) {
    console.log(value);

};

function getName(value){
    let name = value.name;
    return name;
};

function getProficiencies(value){
    let profElm = document.createElement('UL');
    let y = [];
    for(var x in value.proficiencies){
        y.push(value.proficiencies[x].name);
    };
    return y;
};

function getProficienciesChoices(value){
    let choiceNumber = value.proficiency_choices[0].choose;
    let y = [];
    for(var x in value.proficiency_choices[0].from){
        y.push(value.proficiency_choices[0].from[x].name);
    }
    return choiceNumber, y;
}

function getSavingThrows(value){
    let y = [];
    for(let x in value.saving_throws){
        y.push(value.saving_throws[x].name);
    };
    return y;
};

function getSpellcasting(value){
    let castAbility = value.spellcasting.spellcasting_ability.name;
    return castAbility
}

function getSubclasses(value){
    let y = [];
    for(let x in value.subclasses){
        y.push(value.subclasses[x].name);
    }
    return y;
}

function getHitdie(value){
    let hitDie = value.hit_die;
    return hitDie;
}

function createElement(elm, text){
    let textNode = document.createTextNode(text);
    let elmNode = document.createElement(elm);
    elmNode.append(textNode);
    return elmNode;
}

