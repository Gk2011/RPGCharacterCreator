const fs = require('fs');
const Race = require('../../models/race');
const Class = require('../../models/class');

const { PDFDocument } = require('pdf-lib');


module.exports.dnd5E = async(characterModel) => {
    const orginal = fs.readFileSync('src/services/pdfService/templates/5E_CharacterSheet_Fillable.pdf');
    var pdfDoc = await PDFDocument.load(orginal);

    // PDF field name Strings saved to a variable to avoid consistency issue.
    const characterNameString = 'CharacterName';
    const abilityScoresTextArray = ['STR', 'INT', 'CON', 'DEX', 'CHA', 'WIS'];
    const abilityModTextArray = ['STRmod', 'INTmod', 'CONmod', 'DEXmod ', 'CHamod', 'WISmod'];
    const speedString = 'Speed';
    const hitdie = 'HD';
    const raceString = 'Race ';
    const playerNameString = 'PlayerName';
    const backgroundString = 'Background';
    const clasLevelString = 'ClassLevel';
    
    // Create the Form
    var form = pdfDoc.getForm();

    // Get the text Fields for the forms, feed in string variables
    const characterNameField = form.getTextField(characterNameString);
    const speedField = form.getTextField(speedString);
    const playerNameField = form.getTextField(playerNameString);
    const hitDieField = form.getTextField(hitdie);
    const backgroundField = form.getTextField(backgroundString);
    const raceField = form.getField(raceString);
    const classLevelField = form.getField(clasLevelString)

    // Get Race and Class using character data
    const race = await Race.findOne({index: characterModel.race.index});
    const charClass = await Class.findOne({index: characterModel.class.index});

    
    // Set field text
    console.log(characterModel.level[0].class.index);
    classLevelField.setText(`${characterModel.level[0].class.index}`);
    backgroundField.setText(characterModel.background.name);
    hitDieField.setText(`D${charClass.hit_die}`);
    speedField.setText(`${race.speed}`);
    characterNameField.setText(characterModel.name);
    raceField.setText(characterModel.race.name);


    // race abilitybonus data
    const newRaceAbilityBonusScores = race.ability_bonuses;

    // Loop over character scores 
    let i = 0;
    while (i < characterModel.abilityScores.length){
        raceAbilityScoreBonus = 0;
        // Get and set score field data
        const abilityfield = form.getTextField(abilityScoresTextArray[i]);
        abilityfield.setText(String(characterModel.abilityScores[i].score));

        // Get mod field for score
        const modField = form.getTextField(abilityModTextArray[i]);
        // Check if race has a score mod and set to that bonus
        newRaceAbilityBonusScores.forEach(element => {
            if(element.name == abilityScoresTextArray[i]){
                const raceAbilityScoreBonus = element.bonus;
            }
        });
        // Calculate ability mod 
        let modValue = Math.floor(((characterModel.abilityScores[i].score + raceAbilityScoreBonus) - 10) / 2);
        // Set mod 
        modField.setText(String(modValue));
        i++;
    };

    // Weird Express issue reguarding buffer, must return data as a buffer of a buffer for libray to work. 
	var pdfBytes = await pdfDoc.save();
    var pdfBuffer = Buffer.from(pdfBytes.buffer, 'binary');
	return pdfBuffer;
};

