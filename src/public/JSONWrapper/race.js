function getIndex(value){
    return value.index
}

function getName(value){
    let name = value.name;
    return name;
};

function getAbilityBonuses(value){
    let abilityScoreBonuses = {};
    for (let x in value.ability_bonuses) {
        let abilityScore = value.ability_bonuses[x].ability_score.name;
        let abilitybonus = value.ability_bonuses[x].bonus;

        abilityScoreBonuses[abilityScore] = abilitybonus;
    }
    return abilityScoreBonuses;
};

function getAgeDescription(value){
    return value.age;   
};

function getAlignmentDescription(value){
    return value.alignment;
};

function getLanguageDescription(value){
    return value.language_desc;
}

function getLanguages(value){
    const racelanguages = [];
    for(language in value.languages){
        let x = value.languages[language].name;
        racelanguages.push(x);
    };
    return racelanguages;
};

function getSize(value){
    return value.size;
};

function getSizeDescription(value){
    return value.size_description;
};

function getSpeed(value){
    return value.speed;
};

function getStartingProficiencies(value){
    let y = [];
    for (var x in value.proficiencies) {
        y.push(value.proficiencies[x].name);
    };
    return y;
};

function getSubracesNames(value){
    const raceSubraces = [];
    for(subrace in value.subrace){
        let x = value.languages[subrace].name;
        racelanguages.push(x);
    };
    return raceSubraces;
};

function getTraitsNames(value){
    const raceTraits = [];
    for(trait in value.traits){
        let x = value.traits[trait].name;
        raceTraits.push(x);
    };
    return raceTraits;
}




