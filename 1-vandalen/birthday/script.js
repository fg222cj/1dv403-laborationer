"use strict";

window.onload = function(){

	
	var birthday = function(date){
	    console.log(date);
		var parts = date.split("-");
		
		// 
		if(parts.length != 3 || isNaN(parts[0]) || isNaN(parts[1]) || isNaN(parts[2])) {
		    throw "Felaktigt format på datumet!";
		}
        var year = parts[0];
        var month = parts[1] - 1; // Månad i ett Date-objekt börjar på 0 och slutar på 11, måste därför räknas ner med 1.
        var day = parts[2];
        var birthdayDate = new Date(year, month, day);
        var todaysDate = new Date();
        
        // Nollar ut alla timmar, minuter, sekunder och millisekunder i dagens värde så att det kan jämföras på lika villkor med birthdayDate.
        todaysDate.setHours(0);
        todaysDate.setMinutes(0);
        todaysDate.setSeconds(0);
        todaysDate.setMilliseconds(0);
        if(birthdayDate.getTime() < todaysDate.getTime()){
            birthdayDate.setFullYear(todaysDate.getFullYear() + 1);
        };
        
        // Skillnaden i millisekunder divideras med 1000 så det blir sekunder, därefter med 3600 så det blir timmar,
        // därefter med 24 så det blir dygn, därefter avrundas det uppåt så det blir hela dagar.
        // Det matematiska uttrycket hade kunnat förenklas ytterligare, men behålls för läsbarhet.
        return Math.ceil((birthdayDate.getTime() - todaysDate.getTime())/1000/3600/24);
	};
	// ------------------------------------------------------------------------------


	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#string");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		p.classList.remove( "error");

		try {
			var answer = birthday(input.value) // Läser in texten från textrutan och skickar till funktionen "convertString"
			var message;
			switch (answer){
				case 0: message = "Grattis på födelsedagen!";
					break;
				case 1: message = "Du fyller år imorgon!";
					break;
				default: message = "Du fyller år om " + answer + " dagar";
					break;
			}

			p.innerHTML = message;
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};