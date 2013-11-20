"use strict";

window.onload = function(){
	
	var secret = Math.floor( Math.random() * 100)+1; // Detta tal behöver bytas ut mot ett slumpat tal.
	var numberOfGuesses = 0;
	
	// I denna funktion ska du skriva koden för att hantera "spelet"
	var guess = function(number){
		console.log("Det hemliga talet: " + secret); // Du når den yttre variabeln secret innifrån funktionen.
		console.log("Du gissade: " + number); // Detta nummer är det som användaren gissade på.
		numberOfGuesses += 1;
		var correctGuess = false; // Bool som håller koll på om användaren gissade rätt eller inte.
		var message; // Sträng som tillskrivs rätt- eller felmeddelandet innan det returneras.

        if(number == secret) {
            correctGuess = true;
            message = "Grattis du vann! Det hemliga talet var " + secret + " och du behövde " + numberOfGuesses + " gissningar för att hitta det.";
        }
        
        if(number < secret) {
            message = "Det hemliga talet är högre!";
        }
        
        if(number > secret) {
            message = "Det hemliga talet är lägre!";
        }
        
        if(number < 0 || number > 100) {
            message = "Talet är utanför intervallet 0 - 100";
        }
        
        return [correctGuess, message];

		// Returnera exempelvis: 
		// [true, "Grattis du vann! Det hemliga talet var X och du behövde Y gissningar för att hitta det."]
		// [false, "Det hemliga talet är högre!"]
		// [false, "Det hemliga talet är lägre!"]
		// [false, "Talet är utanför intervallet 0 - 100"]		
	};
	
	// ------------------------------------------------------------------------------



	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#number");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		var answer = guess(input.value) // Läser in talet från textrutan och skickar till funktionen "guess"
		p.innerHTML = answer[1];		// Skriver ut texten från arrayen som skapats i funktionen.	

		if(answer[0] === true){				// Om spelet är slut, avaktivera knappen.
			submit.disabled = true;
		}
	
	});
};