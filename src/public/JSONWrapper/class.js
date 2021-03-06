const value = {
    "index": "druid",
    "name": "Druid",
    "hit_die": 8,
    "proficiency_choices": [
        {
            "choose": 2,
            "type": "proficiencies",
            "from": [
                {
                    "index": "skill-animal-handling",
                    "name": "Skill: Animal Handling",
                    "url": "/api/proficiencies/skill-animal-handling"
                },
                {
                    "index": "skill-arcana",
                    "name": "Skill: Arcana",
                    "url": "/api/proficiencies/skill-arcana"
                },
                {
                    "index": "skill-insight",
                    "name": "Skill: Insight",
                    "url": "/api/proficiencies/skill-insight"
                },
                {
                    "index": "skill-medicine",
                    "name": "Skill: Medicine",
                    "url": "/api/proficiencies/skill-medicine"
                },
                {
                    "index": "skill-nature",
                    "name": "Skill: Nature",
                    "url": "/api/proficiencies/skill-nature"
                },
                {
                    "index": "skill-perception",
                    "name": "Skill: Perception",
                    "url": "/api/proficiencies/skill-perception"
                },
                {
                    "index": "skill-religion",
                    "name": "Skill: Religion",
                    "url": "/api/proficiencies/skill-religion"
                },
                {
                    "index": "skill-survival",
                    "name": "Skill: Survival",
                    "url": "/api/proficiencies/skill-survival"
                }
            ]
        }
    ],
    "proficiencies": [
        {
            "index": "light-armor",
            "name": "Light armor",
            "url": "/api/proficiencies/light-armor"
        },
        {
            "index": "medium-armor",
            "name": "Medium armor",
            "url": "/api/proficiencies/medium-armor"
        },
        {
            "index": "shields",
            "name": "Shields",
            "url": "/api/proficiencies/shields"
        },
        {
            "index": "clubs",
            "name": "Clubs",
            "url": "/api/proficiencies/clubs"
        },
        {
            "index": "daggers",
            "name": "Daggers",
            "url": "/api/proficiencies/daggers"
        },
        {
            "index": "javelins",
            "name": "Javelins",
            "url": "/api/proficiencies/javelins"
        },
        {
            "index": "maces",
            "name": "Maces",
            "url": "/api/proficiencies/maces"
        },
        {
            "index": "quarterstaffs",
            "name": "Quarterstaffs",
            "url": "/api/proficiencies/quarterstaffs"
        },
        {
            "index": "sickles",
            "name": "Sickles",
            "url": "/api/proficiencies/sickles"
        },
        {
            "index": "spears",
            "name": "Spears",
            "url": "/api/proficiencies/spears"
        },
        {
            "index": "darts",
            "name": "Darts",
            "url": "/api/proficiencies/darts"
        },
        {
            "index": "slings",
            "name": "Slings",
            "url": "/api/proficiencies/slings"
        },
        {
            "index": "scimitars",
            "name": "Scimitars",
            "url": "/api/proficiencies/scimitars"
        },
        {
            "index": "herbalism-kit",
            "name": "Herbalism Kit",
            "url": "/api/proficiencies/herbalism-kit"
        }
    ],
    "saving_throws": [
        {
            "index": "int",
            "name": "INT",
            "url": "/api/ability-scores/int"
        },
        {
            "index": "wis",
            "name": "WIS",
            "url": "/api/ability-scores/wis"
        }
    ],
    "starting_equipment": [
        {
            "equipment": {
                "index": "leather",
                "name": "Leather",
                "url": "/api/equipment/leather"
            },
            "quantity": 1
        },
        {
            "equipment": {
                "index": "explorers-pack",
                "name": "Explorer's Pack",
                "url": "/api/equipment/explorers-pack"
            },
            "quantity": 1
        }
    ],
    "starting_equipment_options": [
        {
            "choose": 1,
            "type": "equipment",
            "from": [
                {
                    "equipment": {
                        "index": "shield",
                        "name": "Shield",
                        "url": "/api/equipment/shield"
                    },
                    "quantity": 1
                },
                {
                    "equipment_option": {
                        "choose": 1,
                        "type": "equipment",
                        "from": {
                            "equipment_category": {
                                "index": "simple-weapons",
                                "name": "Simple Weapons",
                                "url": "/api/equipment-categories/simple-weapons"
                            }
                        }
                    }
                }
            ]
        },
        {
            "choose": 1,
            "type": "equipment",
            "from": [
                {
                    "equipment": {
                        "index": "scimitar",
                        "name": "Scimitar",
                        "url": "/api/equipment/scimitar"
                    },
                    "quantity": 1
                },
                {
                    "equipment_option": {
                        "choose": 1,
                        "type": "equipment",
                        "from": {
                            "equipment_category": {
                                "index": "simple-weapons",
                                "name": "Simple Weapons",
                                "url": "/api/equipment-categories/simple-weapons"
                            }
                        }
                    }
                }
            ]
        },
        {
            "choose": 1,
            "type": "equipment",
            "from": [
                {
                    "equipment_category": {
                        "index": "druidic-foci",
                        "name": "Druidic Foci",
                        "url": "/api/equipment-categories/druidic-foci"
                    }
                }
            ]
        }
    ],
    "class_levels": "/api/classes/druid/levels",
    "subclasses": [
        {
            "index": "land",
            "name": "Land",
            "url": "/api/subclasses/land"
        }
    ],
    "spellcasting": {
        "info": [
            {
                "desc": [
                    "At 1st level, you know two cantrips of your choice from the druid spell list. You learn additional druid cantrips of your choice at higher levels, as shown in the Cantrips Known column of the Druid table."
                ],
                "name": "Cantrips"
            },
            {
                "desc": [
                    "The Druid table shows how many spell slots you have to cast your spells of 1st level and higher. To cast one of these druid spells, you must expend a slot of the spell's level or higher. You regain all expended spell slots when you finish a long rest.",
                    "You prepare the list of druid spells that are available for you to cast, choosing from the druid spell list. When you do so, choose a number of druid spells equal to your Wisdom modifier + your druid level (minimum of one spell). The spells must be of a level for which you have spell slots.",
                    "For example, if you are a 3rd-level druid, you have four 1st-level and two 2nd-level spell slots. With a Wisdom of 16, your list of prepared spells can include six spells of 1st or 2nd level, in any combination. If you prepare the 1st-level spell cure wounds, you can cast it using a 1st-level or 2nd-level slot. Casting the spell doesn't remove it from your list of prepared spells.",
                    "You can also change your list of prepared spells when you finish a long rest. Preparing a new list of druid spells requires time spent in prayer and meditation: at least 1 minute per spell level for each spell on your list."
                ],
                "name": "Preparing and Casting Spells"
            },
            {
                "desc": [
                    "Wisdom is your spellcasting ability for your druid spells, since your magic draws upon your devotion and attunement to nature. You use your Wisdom whenever a spell refers to your spellcasting ability. In addition, you use your Wisdom modifier when setting the saving throw DC for a druid spell you cast and when making an attack roll with one."
                ],
                "name": "Spellcasting Ability"
            },
            {
                "desc": [
                    "You can cast a druid spell as a ritual if that spell has the ritual tag and you have the spell prepared."
                ],
                "name": "Ritual Casting"
            },
            {
                "desc": [
                    "You can use a druidic focus (see chapter 5, \"Equipment\") as a spellcasting focus for your druid spells."
                ],
                "name": "Spellcasting Focus"
            }
        ],
        "level": 1,
        "spellcasting_ability": {
            "index": "wis",
            "name": "WIS",
            "url": "/api/ability-scores/wis"
        }
    },
    "spells": "/api/classes/druid/spells",
    "url": "/api/classes/druid"
}

function getIndex(value){
    return value.index;
};

function getName(value){
    value.name;
};

function getHitdie(value){
    value.hit_die;
};

function getproficiencychoicesNames(value){
    let profChoiceNames = []
    for (choice in value.proficiency_choices[0].from){
        profChoiceNames.push(value.proficiency_choices[0].from[choice].name);
    };
    return profChoiceNames;
};

function getproficiencychoicesObject(value){
    return value.proficiency_choices;
};


function getproficienciesNames(value){
    let profNames = []
    for (choice in value.proficiencies){
        profNames.push(value.proficiencies[choice].name);
    };
    return profNames;
    
};

function getproficienciesObject(value){
    return value.proficiencies
}


function getSavingthrowsObject(value){
    return value.saving_throws
};


function getStartingequipmentObject(value){
    return value.starting_equipment
};


function getStartingequipmentoptionsObject(value){
    return value.starting_equipment_options;

};

function getStartingEquipentOption(getStartingequipmentObject){
    return getStartingequipmentObject[0].from;
};




function getClass_levels(value){

};


function getSubclasses(value){

};

function getSpellcasting(value){

};

function getSpells(value){

};


function get(value){

};

const newValue = getStartingequipmentoptionsObject(value)

