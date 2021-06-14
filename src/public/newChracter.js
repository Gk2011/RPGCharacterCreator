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
    };
};



function formatClass(value) {
    //clear overview
    document.getElementById('selectedOverview').innerHTML = "";
    document.getElementById('selectedOverview').append(createElement("H1", getName(value)));
    document.getElementById('selectedOverview').append(createElement("P", getProficiencies(value)));
};

function formatRace(value) {
    document.getElementById('selectedOverview').innerHTML = "";
    document.getElementById('selectedOverview').append(createElement("H1", getName(value)));
    getAbilityBonuses(value);
    calcAbilityModifier('str');
};

function abilityCalculations(dictionaryValues) {

};

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
    const abilityScoreBonuses = {};
    for (let x in value.ability_bonuses) {
        let abilityScore = value.ability_bonuses[x].ability_score.index;
        let abilitybonus = value.ability_bonuses[x].bonus;

        abilityScoreBonuses[abilityScore] = abilitybonus;
    }
    calcRace(abilityScoreBonuses);
}



function calcClass(value) {
    return pass
}

function calcRace(abilityBonuses) {
    const abiltyScores = ['str', 'int', 'cha', 'con', 'dex', 'wis'];
    abiltyScores.forEach(clearRacialTableBonus);
    for (const [key, value] of Object.entries(abilityBonuses)) {
        if (abiltyScores.includes(key)) {
            modifyAbilityTable(key, 'RacialBonus', value)
            calcAbilityModifier(key)
        }
    }
};

function clearRacialTableBonus(ability) {
    getAbilityTable(ability).rows.namedItem('RacialBonus').cells[1].innerHTML = '-';
};

function modifyAbilityTable(abilityTableName, rowName, value) {
    getAbilityTable(abilityTableName).rows.namedItem(rowName).cells[1].innerHTML = value;
};

function getAbilityTable(abilityTableName) {
    return document.getElementById(abilityTableName + 'Table');
};

function calcAbilityModifier(ability) {
    var abilityTable = getAbilityTable(ability);
    const domNames = ['baseScore', 'RacialBonus', 'abilityImprovementBonus', 'miscBonus'];
    let skillScore = 0;

    domNames.forEach(element => {
        //console.log(abilityTable.rows.namedItem(element).cells[1].innerHTML);
        if (!isNaN(abilityTable.rows.namedItem(element).cells[1].innerHTML)) {
            //console.log(abilityTable.rows.namedItem(element).cells[1].innerHTML);
            skillScore += parseInt(abilityTable.rows.namedItem(element).cells[1].innerHTML);
        }
    });
    if (skillScore > 0) {
        abilityTable.rows.namedItem('modifier').cells[1].innerHTML = Math.floor((skillScore - 10) / 2);
    };

};

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
};

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

    }

};



// Update list of availible choices, Keep old value selected
function updateStandardList(domAbilityChanged) {
    var length = domAbilityChanged.options.length;
    var currentValue = domAbilityChanged.value;
    console.log("The value on focus is, ", currentValue)
    // Readd selected valid value to availible list to be re-displayed
    if (standardNotAvailible.includes(parseInt(currentValue))) {
        console.log("This value should be readded to the availible list: ", currentValue);
        let index = standardNotAvailible.indexOf(parseInt(currentValue));
        console.log("The index of the value that needs to be readded is: ", index);
        let reAddValue = standardNotAvailible.splice(index, 1)[0];
        console.log("Value detected from nonavailible list: ", reAddValue);
        standardAvailible.push(reAddValue);
        console.log("the new list that will be made availible to the user: ", standardAvailible);
        standardAvailible.sort;
    };
    // Remove all from list
    for (i = length; i >= 0; i--) {
        domAbilityChanged.options[i] = null;
    };
    standardAvailible.forEach(element => {
        let option = document.createElement('option');
        option.text = element;
        domAbilityChanged.options.add(option);
    });
    console.log(standardAvailible);
    console.log(standardNotAvailible);
};




//on focus get update list, keep current selected value, remove already used numbers
//on change remove value from standard value list, readd old value if needed
//
function removeStandardavailible(domAbilityChanged){
    // let currentValue = parseInt(domAbilityChanged.value);
    // console.log(currentValue);
    // if ((Number.isInteger(currentValue))) {
    //     console.log(Number.isInteger(currentValue));
    //     let index = standardAvailible.indexOf(currentValue);
    //     standardNotAvailible.push(standardAvailible.splice(index, 1)[0]);
    // }
    // console.log(standardAvailible);
    // console.log(standardNotAvailible);

    let currentValue = domAbilityChanged.value;
    console.log(currentValue);
    if ((Number.isInteger(currentValue))){

    }else{
        let removeOptionIndex = standardAvailible.indexOf(parseInt(currentValue));
        console.log('index ', currentValue, removeOptionIndex)
        let removeOption = standardAvailible.splice(removeOptionIndex, 1)[0];
        console.log("This item was removed from the availible options and will be made reavailible when de-selected,", removeOption);
        standardNotAvailible.push(removeOption);
        console.log(standardAvailible);
        console.log(standardNotAvailible);
    }
}



// event liseners

document.getElementById("inputAbilityScoreDisplayPointBuy").style.display = "none";
document.getElementById("inputAbilityScoreDisplayStandard").style.display = "none";

let pointsAvailible = 27;
let standardAvailible = ["", 8, 10, 12, 13, 14, 15];
let standardNotAvailible = [];




// // old standard update code

// // Update list of availible choices, Keep old value selected
// function updateStandardList(domAbilityChanged) {
//     let currentValue = domAbilityChanged.value;
//     var length = domAbilityChanged.options.length;


//     // Remove all from list
//     for (i = length; i >= 0; i--) {
//         domAbilityChanged.options[i] = null;
//     };
//     // Add all avalible options back in
//     standardAvailible.forEach(element => {
//         let option = document.createElement('option');
//         option.text = element;
//         domAbilityChanged.options.add(option);

//     });
//     // Set old selected value as already selected option
//     let option = document.createElement('option');
//     if (!(currentValue == '')){
//         option.text = currentValue;
//         domAbilityChanged.options.add(option);
//         domAbilityChanged.value = option;
//     }else{
//         domAbilityChanged.value = domAbilityChanged.options[0];
//     };
// }




// //on focus get update list, keep current selected value, remove already used numbers
// //on change remove value from standard value list, readd old value if needed
// //

// function removeStandardavailible(domAbilityChanged){
//     let currentValue = domAbilityChanged.value;
//     if (currentValue == ''){

//     }else{
//         let index = standardAvailible.indexOf(currentValue);
//         let optionRemoved = standardAvailible.splice(index, 1);
//         console.log("Removed option: ", optionRemoved)
//     }


// }


