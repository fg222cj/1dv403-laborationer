"use strict";

var makePerson = function(persArr){
    var ages = [];          // Array som lagrar åldrarna, sorteras senare och därmed kan vi plocka ut max- och minvärden.
    var namesArray = [];    // Array som lagrar namnen, används för att sortera dem alfabetiskt.
    var agesSum = 0;        // Array som lagrar sammanlagda summan av alla åldrar, används vid medelvärdesberäkning.
    
    persArr.forEach(function(person){
        ages.push(person.age);          // push lägger till ett element till arrayet.
        namesArray.push(person.name);
        agesSum += person.age;
    });
    
    ages.sort(function(a,b){return a-b});   // Numerisk sort.
    
    namesArray.sort(function(a, b) {
    return a.localeCompare(b);  // Egen sorteringsfunktion för att med hjälp av localeCompare korrekt sortera åäö.
    // En svaghet är att den använder sig av besökarens locale, vilket kan leda till fel.
});
    
    var result = {
        names: namesArray.join(", "),  // Sätter ihop namnen till en sträng.
        minAge: ages[0],    // minAge är den första i det sorterade arrayet.
        maxAge: ages[ages.length - 1],  // maxAge är den sista i det sorterade arrayet.
        averageAge: Math.round(agesSum / ages.length)   // averageAge är det avrundade medelvärdet.
    };
    
    return result;
}


