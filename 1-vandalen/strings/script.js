"use strict";

window.onload = function(){

    // converString omvandlar versaler till gemener och vice versa. Bokstaven "a" omvandlas till "#".
	var convertString = function(str){
		var newstring = ""; // Strängen som returneras av denna metod.
		
		// Varje bokstav i strängen kollas separat och läggs därefter in i newstring enligt funktionens krav.
		for(var i = 0; i<str.length; i++){
		    switch(str.charAt(i)){
		        //"A" och "a" ersätts med "#".
		        case 'A':
		        case 'a':
		            newstring += "#";
		        break;
		        
		        // Versal ersätts med gemen.
		        case str.charAt(i).toUpperCase():
		            newstring += str.charAt(i).toLowerCase();
		            break;
		        
		        // Gemen ersätts med versal.
		        case str.charAt(i).toLowerCase():
		            newstring += str.charAt(i).toUpperCase();
		            break;
		        
		        // Övriga tecken påverkas ej, utan skjuts in utan förändring.
		        default:
		            newstring += str.charAt(i);
		    };
		};
	    return newstring;






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
			var answer = convertString(input.value) // Läser in texten från textrutan och skickar till funktionen "convertString"
			p.innerHTML = answer;		// Skriver ut texten från arrayen som skapats i funktionen.	
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};