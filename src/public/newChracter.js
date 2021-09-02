console.log('made it to the file?')

// Ajax request function to retreive data from express server for RACE and CLASS
function ajaxRequest(requestTag, value) {
    if (value != 'Open this select menu') {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let requestInfo = JSON.parse(this.responseText);
                if (requestTag == 'race') {
                    formatRace(requestInfo[0]);
                } else if (requestTag == 'class') {
                    formatClass(requestInfo[0])
                }
            };
        };
        xmlhttp.open("GET", '/new/ajax', true);
        xmlhttp.setRequestHeader('requestInfo', (requestTag));
        xmlhttp.setRequestHeader('requestValue', value);
        xmlhttp.send();
    } else {
        if (requestTag == 'race') {
            currentRaceSelected = null;
        } else if (requestTag == 'class') {
            currentClassSelected = null;
        }

    };
};


// Format UI information for the user using the current Class selected 
function formatClass(value) {
    setCardOverview('class');
    currentClassSelected = value;
    console.log(value);
    document.getElementById('currentClassName').innerHTML = currentClassSelected.name;
    document.getElementById('hitDie').innerHTML = currentClassSelected.hit_die;
    document.getElementById('proficiencies').innerHTML = currentClassSelected.proficiencies;
    proficiencies
    document.getElementById('proficiency_choices').innerHTML = currentClassSelected.proficiency_choices;
    document.getElementById('saving_throws').innerHTML = currentClassSelected.saving_throws;

    //document.getElementById('currentClassName').innerHTML = getName(value);
    //document.getElementById('hitDie').innerHTML = getHitdie(value);
    //document.getElementById('proficiencies').innerHTML = getProficiencies(value);
};

// Format UI information for the user using the current Race selected 
function formatRace(value) {
    setCardOverview('race');

    currentRaceSelected = value;

    document.getElementById('currentRaceName').innerHTML = currentRaceSelected.name;

    const bonuses = []

    const abilityList = document.getElementById('abilityBonus');
    document.getElementById('abilityBonus').innerHTML = "";
    for (x in currentRaceSelected.ability_bonuses) {
        const bonusName = currentRaceSelected.ability_bonuses[x].ability_score.name;
        const bonusValue = currentRaceSelected.ability_bonuses[x].bonus;

        const text = new String(`${bonusName}: Bonus: ${bonusValue}`)

        const listItem = document.createElement('li');

        listItem.classList.add("list-group-item");

        const textNode = document.createTextNode(text)

        listItem.appendChild(textNode);

        document.getElementById('abilityBonus').appendChild(listItem);
    }

    //document.getElementById('abilityBonus').innerHTML = bonuses;
    document.getElementById('speed').innerHTML = currentRaceSelected.speed;
    document.getElementById('age').innerHTML = currentRaceSelected.age;
    document.getElementById('language_desc').innerHTML = currentRaceSelected.language_desc;
    document.getElementById('size').innerHTML = currentRaceSelected.size;
    const availibleSubraces = [];
    for (x in currentRaceSelected.subraces) {
        availibleSubraces.push(currentRaceSelected.subraces[x].name)
    }
    document.getElementById('subraces').innerHTML = availibleSubraces.join(', ');;
    const availibleTraits = [];
    for (x in currentRaceSelected.traits) {
        availibleTraits.push(currentRaceSelected.traits[x].name)
    }
    document.getElementById('traits').innerHTML = availibleTraits.join(', ');

    //getAbilityBonuses(value);
    updateDisplayRaceMod();
}



function getProficienciesChoices(value) {
    let choiceNumber = value.proficiency_choices[0].choose;
    let y = [];
    for (var x in value.proficiency_choices[0].from) {
        y.push(value.proficiency_choices[0].from[x].name);
    }
    return choiceNumber, y;
}

function getSavingThrows(value) {
    let y = [];
    for (let x in value.saving_throws) {
        y.push(value.saving_throws[x].name);
    };
    return y;
};

function getSpellcasting(value) {
    let castAbility = value.spellcasting.spellcasting_ability.name;
    return castAbility
}

function getSubclasses(value) {
    let y = [];
    for (let x in value.subclasses) {
        y.push(value.subclasses[x].name);
    }
    return y;
}

function getHitdie(value) {
    let hitDie = value.hit_die;
    return hitDie;
}

function createElement(elm, text) {
    let textNode = document.createTextNode(text);
    let elmNode = document.createElement(elm);
    elmNode.append(textNode);
    return elmNode;
}

function getAbilityBonuses(value) {
    let abilityScoreBonuses = {};
    for (let x in value.ability_bonuses) {
        let abilityScore = value.ability_bonuses[x].ability_score.index;
        let abilitybonus = value.ability_bonuses[x].bonus;

        abilityScoreBonuses[abilityScore] = abilitybonus;
    }
    return abilityScoreBonuses;
}

function updateDisplayRaceMod() {
    const abiltyScores = ['str', 'int', 'cha', 'con', 'dex', 'wis'];
    let rowName = "RacialBonus";

    for (let ability of abiltyScores) {
        clearTableBonus(ability, rowName)
    }
    if (typeof currentRaceSelected != 'undefined') {
        for (const [key, value] of Object.entries(getAbilityBonuses(currentRaceSelected))) {
            if (abiltyScores.includes(key)) {
                modifyAbilityTable(key, rowName, value)
            }
        }
    }
    for (let ability in abiltyScores) {
        let abilityDomObject = null;
        if (document.getElementById("inputAbilityScoreDisplayStandard").style.display == "") {
            abilityDomObject = document.getElementById("standard" + abiltyScores[ability]);
        }
        if (document.getElementById("inputAbilityScoreDisplayPointBuy").style.display == "") {
            abilityDomObject = document.getElementById("point" + abiltyScores[ability]);
        }
        try {
            if (!isNaN(parseInt(abilityDomObject.value)) || (abilityDomObject.value == null)) {
                if (typeof currentRaceSelected != "undefined") {
                    modifyAbilityTable(abilityDomObject.name, "modifier", calcAbilityModifier(abilityDomObject));
                }
                modifyAbilityTable(abilityDomObject.name, "baseScore", abilityDomObject.value);
            } else {
                modifyAbilityTable(abilityDomObject.name, "modifier", "-");
                modifyAbilityTable(abilityDomObject.name, "baseScore", "-");
            }


        } catch (error) {
            console.log(error);
        }
    }
}
// Helper Function to clear row value to null
function clearTableBonus(ability, rowName) {
    getAbilityTable(ability).rows.namedItem(rowName).cells[1].innerHTML = '-';
};
// Helper function to modify a ability table with a value 
function modifyAbilityTable(abilityTableName, rowName, value) {
    getAbilityTable(abilityTableName).rows.namedItem(rowName).cells[1].innerHTML = value;
};
// Helper Function to retreive a specific table
function getAbilityTable(abilityTableName) {
    return document.getElementById(abilityTableName + 'Table');
};

// calculate ability modifier
function calcAbilityModifier(abilityDOM) {
    // get the race bonuses
    let raceBonus = getAbilityBonuses(currentRaceSelected);
    let abilityName = abilityDOM.name;
    let abilityScore = parseInt(abilityDOM.value);
    let raceAbilityBonus = 0;

    // check if race bonus is applicable for the calculation
    if (abilityDOM.name in raceBonus) {
        raceAbilityBonus = raceBonus[abilityName];
    }
    let modValue = Math.floor(((abilityScore + raceAbilityBonus) - 10) / 2);
    return modValue;

};

//// Function for updating display score values
// Change UI to reflect if the user has selected Standard or Pointbuy 
function setAbilityScoreType(value) {
    if (value == 'standard') {
        var x = document.getElementById("inputAbilityScoreDisplayPointBuy");
        var y = document.getElementById("inputAbilityScoreDisplayStandard");
        x.style.display = "none";
        y.style.display = "";

        // Being lazy about an issue that needs to be fixed...
        let pointBuychildNodes = document.getElementById('inputAbilityScoreDisplayPointBuy').getElementsByTagName('*');
        let standardChildnodes = document.getElementById('inputAbilityScoreDisplayStandard').getElementsByTagName('*');

        for (let node of pointBuychildNodes) {
            node.disabled = true;
        };

        for (let node of standardChildnodes) {
            node.disabled = false;
        };


    } else if (value == 'pointBuy') {
        var x = document.getElementById("inputAbilityScoreDisplayPointBuy");
        var y = document.getElementById("inputAbilityScoreDisplayStandard");
        x.style.display = "";
        y.style.display = "none";

        // Being lazy about an issue that needs to be fixed...
        let pointBuychildNodes = document.getElementById('inputAbilityScoreDisplayPointBuy').getElementsByTagName('*');
        let standardChildnodes = document.getElementById('inputAbilityScoreDisplayStandard').getElementsByTagName('*');

        for (let node of pointBuychildNodes) {
            node.disabled = false;
        };

        for (let node of standardChildnodes) {
            node.disabled = true;
        };

    }

    updateDisplayRaceMod();

};

function setCardOverview(value) {
    if (value == 'race') {
        var raceDisplay = document.getElementById("raceOverview");
        var classDisplay = document.getElementById("classOverview");
        raceDisplay.style.display = "";
        classDisplay.style.display = "none";
    }
    if (value == 'class') {
        var raceDisplay = document.getElementById("raceOverview");
        var classDisplay = document.getElementById("classOverview");
        raceDisplay.style.display = "none";
        classDisplay.style.display = "";
    }
}

// Update points values on change 
function updatePoints(domAbilityChanged) {
    // Get old,new,and point change values
    let oldValue = domAbilityChanged.oldValue;
    let newValue = domAbilityChanged.value;
    let pointsUsed = newValue - oldValue;

    //If points availible 0 and newvalue is increasing set to old value. don't update points
    if (pointsAvailible == 0 && newValue > oldValue) {
        domAbilityChanged.value = domAbilityChanged.oldValue;
    } else {
        // catch low value error, set to 8, and recalc points
        if (newValue <= 8) {
            newValue = 8;
            pointsUsed = newValue - oldValue;
            // catch high value error, set to 20 and recalc points
        } else if (newValue >= 20) {
            newValue = 20;
            pointsUsed = newValue - oldValue;
        }
        // If points used higher than points availible decrease newValue and pointsUsed until points would consume all availible points
        if (pointsUsed > pointsAvailible) {
            while (pointsUsed > pointsAvailible) {
                newValue--;
                pointsUsed--;
            };
        }
        // Update pointsAvailible 
        pointsAvailible -= pointsUsed;

        // Set domCard to correct value(This does basically reset to the same value if no errors are caught, just easier to set it regaurdless)
        domAbilityChanged.value = newValue;
        // Update UI Score to reflect points used vs overall 27 total
        document.getElementById('pointBuyScore').innerHTML = pointsAvailible.toString() + "/27";
        modifyAbilityTable(domAbilityChanged.name, "baseScore", newValue);
        if (typeof currentRaceSelected != "undefined") {
            modifyAbilityTable(domAbilityChanged.name, "modifier", calcAbilityModifier(domAbilityChanged));
        }
    }
};

// Update dropdown list on onfocus to show current availible choices, 
// if a value is currently selected readd to the list of availible in dropdown and autoselect null
function updateStandardList(domAbilityChanged) {
    var length = domAbilityChanged.options.length;
    var currentValue = domAbilityChanged.value;
    modifyAbilityTable(domAbilityChanged.name, "baseScore", "-");
    modifyAbilityTable(domAbilityChanged.name, "modifier", "-");
    // Readd selected valid value to availible list to be re-displayed
    if (standardNotAvailible.includes(parseInt(currentValue))) {
        let index = standardNotAvailible.indexOf(parseInt(currentValue));
        let reAddValue = standardNotAvailible.splice(index, 1)[0];
        standardAvailible.push(reAddValue);
    };
    // Remove all from list
    for (i = length; i >= 0; i--) {
        domAbilityChanged.options[i] = null;
    };
    sortSelectionBoxArray(standardAvailible);
    standardAvailible.forEach(element => {
        let option = document.createElement('option');
        option.text = element;
        domAbilityChanged.options.add(option);
    });
};

// Remove previous availiable value from standard Array
function removeStandardavailible(domAbilityChanged) {
    let currentValue = domAbilityChanged.value;
    if ((Number.isInteger(currentValue))) {
    } else {
        let removeOptionIndex = standardAvailible.indexOf(parseInt(currentValue));
        let removeOption = standardAvailible.splice(removeOptionIndex, 1)[0];
        standardNotAvailible.push(removeOption);
        domAbilityChanged.blur();
        if (currentRaceSelected) {
        }
        modifyAbilityTable(domAbilityChanged.name, "baseScore", currentValue);
        if (currentRaceSelected) {
            modifyAbilityTable(domAbilityChanged.name, "modifier", calcAbilityModifier(domAbilityChanged));
        }
    }
}

// Helper sort function to resort standard ability dropdown values
function sortSelectionBoxArray(array) {
    let firstString = array.shift();
    array.sort(function (a, b) {
        return a - b;
    })
    array.unshift(firstString);
};

// Set UI Display for standard and pointbuy to none by default, need to add css to remove this code in the future to clean-up
//const displayPointBuy = document.getElementById("inputAbilityScoreDisplayPointBuy").style.display = "none";
//const displayStandard = document.getElementById("inputAbilityScoreDisplayStandard").style.display = "";

//const raceDisplay = document.getElementById("raceOverview").style.display = "none";
//const classDisplay = document.getElementById("classOverview").style.display = "none";

// global to track points, may add feature to decrease or increase in the future
let pointsAvailible = 27;
// globals to set availible and not availible values for standard

var standardAvailible = ["", 8, 10, 12, 13, 14, 15];
var standardNotAvailible = [];

if (typeof characterData != "undefined") {
    console.log('i found a character')
    var character = JSON.parse(characterData);
    var currentRaceSelected = (charRaceData);
    
    
    if (character.generation == 'standard') {
        character.abilityScores.forEach(element => {
            console.log(element.score)
            if (standardAvailible.includes(element.score)){
                standardNotAvailible.push(element.score);

                standardAvailible.splice(standardAvailible.indexOf(element.score), 1);
                console.log(element.score)
            }
        })
        setAbilityScoreType('standard');



    };
    if (character.generation == 'point-buy'){
        character.abilityScores.forEach(element => {
            pointsAvailible += 8 - element.score ;
        })
        document.getElementById('pointBuyScore').innerHTML = pointsAvailible.toString() + "/27";
        setAbilityScoreType('pointBuy');
    }
}else{
    let currentClassSelected = 'undefined';
    let currentRaceSelected = null;
    console.log('no character found')
};


//setAbilityScoreType('standard');
