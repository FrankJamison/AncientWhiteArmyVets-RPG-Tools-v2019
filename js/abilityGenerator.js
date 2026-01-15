$(document).ready(function(){ 
    $('#calc_abilities').click(function() {
        // Roll Abilities
        var abilities = rollAbilities();

        // Display Results
        displayAssignedAbilities(abilities);
        displayOrderedAbilities(abilities);
    });
});

function rollAbility() {
    var roll = new Array();
    var ability = 0;
    var lowest = Number.MAX_SAFE_INTEGER;
    for (var ii = 0; ii < 4; ii++) {
        roll[ii] = Math.floor(Math.random() * 6 + 1);
        
        ability += roll[ii];
        
        if(roll[ii] < lowest) {
            lowest = roll[ii];
        }
    }

    return ability -= lowest;
}

function rollAbilities() {
    var abilities = new Array();
    
    for(var ii = 0; ii < 6; ii++) {
        abilities[ii] = rollAbility();
    }

    return abilities;
}

function displayAssignedAbilities(abilities) {
    $("#assignedAbilities").html(
        "<p>Strength: " + abilities[0] + " <br>" + 
        "Dexterity: " + abilities[1] + "<br>" + 
        "Constitution: " + abilities[2] + "<br>" + 
        "Intelligence: " + abilities[3] + "<br>" + 
        "Wisdom: " + abilities[4] + "<br>" +
        "Charisma: " + abilities[5] + "</p>"
    )
}

function displayOrderedAbilities(abilities) {
    abilities.sort(function(a, b){return b-a});

    $("#orderedAbilities").html(
        "<p>Roll 1: " + abilities[0] + " <br>" + 
        "Roll 2: " + abilities[1] + "<br>" + 
        "Roll 3: " + abilities[2] + "<br>" + 
        "Roll 4: " + abilities[3] + "<br>" + 
        "Roll 5: " + abilities[4] + "<br>" +
        "Roll 6: " + abilities[5] + "</p>"
    )
}