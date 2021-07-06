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
    // set a global variable for currentClassSelected may need to remove later
    currentClassSelected = value;
    //clear overview
    //console.log(value);
    document.getElementById('selectedOverview').innerHTML = "";
    document.getElementById('selectedOverview').append(createElement("H1", getName(value)));
    document.getElementById('selectedOverview').append(createElement("P", getProficiencies(value)));
};

// Format UI information for the user using the current Race selected 
function formatRace(value) {
    // set a global variable for currentRaceSelected may need to remove later
    currentRaceSelected = value;
    //console.log(value);
    document.getElementById('selectedOverview').innerHTML = "";
    document.getElementById('selectedOverview').append(createElement("H1", getName(value)));
    //getAbilityBonuses(value);
    updateDisplayRaceMod();
}

// Getters for getting values of class/race json
function getName(value) {
    let name = value.name;
    return name;
};

function getProficiencies(value) {
    let y = [];
    for (var x in value.proficiencies) {
        y.push(value.proficiencies[x].name);
    };
    return y;
};

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

function calcClass(value) {
    return pass
}

function updateDisplayRaceMod() {
    const abiltyScores = ['str', 'int', 'cha', 'con', 'dex', 'wis'];
    let rowName = "RacialBonus";

    for (let ability of abiltyScores) {
        clearTableBonus(ability, rowName)
    }
    if (currentRaceSelected){
    for (const [key, value] of Object.entries(getAbilityBonuses(currentRaceSelected))) {
        if (abiltyScores.includes(key)) {
            modifyAbilityTable(key, rowName, value)
        }
    }
    }
    for (let ability in abiltyScores) {
        let abilityDomObject = null;
        if (document.getElementById("inputAbilityScoreDisplayStandard").style.display == "") {
            //console.log("display set to standard")
            abilityDomObject = document.getElementById("standard" + abiltyScores[ability]);
        }
        if (document.getElementById("inputAbilityScoreDisplayPointBuy").style.display == "") {
            //console.log("display set to point")
            abilityDomObject = document.getElementById("point" + abiltyScores[ability]);
        }
        try {
            if (!isNaN(parseInt(abilityDomObject.value)) || (abilityDomObject.value == null)) {
                //console.log("is number")
                //console.log(parseInt(abilityDomObject.value));
                if (currentRaceSelected){
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
    //console.log(abilityDOM.name);

    // check if race bonus is applicable for the calculation
    if (abilityDOM.name in raceBonus) {
        raceAbilityBonus = raceBonus[abilityName];
    }
    let modValue = Math.floor(((abilityScore + raceAbilityBonus) - 10) / 2);
    //console.log(modValue);
    return modValue;

    //modifyAbilityTable(abilityName, "modifier", modValue);
};

//// Function for updating display score values
// Change UI to reflect if the user has selected Standard or Pointbuy 
function setAbilityScoreType(value) {
    if (value == 'standard') {
        var x = document.getElementById("inputAbilityScoreDisplayPointBuy");
        var y = document.getElementById("inputAbilityScoreDisplayStandard");
        x.style.display = "none";
        y.style.display = "";
    } else if (value == 'pointBuy') {
        var x = document.getElementById("inputAbilityScoreDisplayPointBuy");
        var y = document.getElementById("inputAbilityScoreDisplayStandard");
        x.style.display = "";
        y.style.display = "none";
    }
    
    updateDisplayRaceMod();
    
};

// Update points values on change 
function updatePoints(domAbilityChanged) {
    //console.log("run once")
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
        if (currentRaceSelected) {
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
            //console.log(domAbilityChanged.name);
        }
        modifyAbilityTable(domAbilityChanged.name, "baseScore", currentValue);
        if (currentRaceSelected){
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
document.getElementById("inputAbilityScoreDisplayPointBuy").style.display = "none";
document.getElementById("inputAbilityScoreDisplayStandard").style.display = "none";

// global to track points, may add feature to decrease or increase in the future
let pointsAvailible = 27;
// globals to set availible and not availible values for standard
let standardAvailible = ["", 8, 10, 12, 13, 14, 15];
let standardNotAvailible = [];


currentClassSelected = null;
currentRaceSelected = null;