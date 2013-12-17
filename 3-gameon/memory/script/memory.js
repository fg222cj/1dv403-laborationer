var Memory = {
    
    cols: 3,            // Antal kolumner i memory-spelet. Denna kan ändras, dock maximalt så högt att produkten av cols och rows blir 16.
    rows: 4,            // Antal rader i memory-spelet. Denna kan ändras, dock maximalt så högt att produkten av cols och rows blir 16.
    
    memories: [],       // Array innehållande de värden som motsvarar spelbrickorna.
    guessesTotal: 0,    // Totalt antal gissningar spelaren har gjort. Att vända upp två brickor räknas som en gissning.
    guessesCurrent: 0,  // Håller koll på om det finns en pågående gissning, dvs att en bricka är uppvänd.
    guessesCorrect: 0,  // Hur många rätt gissningar spelaren har gjort. Används för att kontrollera när spelet har vunnits.
    lastGuess: -1,      // Lagrar array-indexet/brick-id:t för den senaste gissningen.
    
    init: function() {
        Memory.memories = RandomGenerator.getPictureArray(Memory.cols, Memory.rows);    // Slumpa in värden i arrayet.
        Memory.createTable();   // Rita upp brädet på skärmen.
    },
    
    createTable: function() {
        var brickId = 0;    // Används i loopen nedan, representerar aktuellt index i arrayet.
        
        var table = document.createElement("table");
        
        // Nedan loopas rader och kolumner för att fylla ut tabellen.
        for(var i = 0; i < Memory.rows; i += 1) {
            var tr = document.createElement("tr");
            
            for(var x = 0; x < Memory.cols; x += 1) {
                tr.appendChild(Memory.createTd(brickId));
                brickId += 1;
            }
            
            table.appendChild(tr);
        }
        document.getElementById("gameboard").appendChild(table);
    },
    
    createTd: function(brickId) {
        var td = document.createElement("td");
        var a = document.createElement("a");
        var img = document.createElement("img");
        
        a.setAttribute("href", "#");
        
        img.setAttribute("src", "pics/0.png");
        img.setAttribute("id", brickId);
        
        a.onclick = function() {
            Memory.flipBrick(brickId);
        }
        
        a.appendChild(img);
        td.appendChild(a);
        
        return td;
    },
    
    flipBrick: function(brickId) {
        var img = document.getElementById(brickId);
        if(img.getAttribute("src") == "pics/0.png") {
            img.setAttribute("src", "pics/" + Memory.memories[brickId] + ".png");
            Memory.guessesCurrent += 1;
            if(Memory.guessesCurrent == 2) {
                Memory.guessesTotal += 1;
                if(Memory.memories[Memory.lastGuess] != Memory.memories[brickId]) {
                    Memory.flipBack(img, document.getElementById(Memory.lastGuess));
                }
                else {
                    Memory.guessesCorrect += 1;
                }
                
                Memory.guessesCurrent = 0;
            }
            else {
                Memory.lastGuess = brickId;
            }
            if(Memory.guessesCorrect == Memory.memories.length / 2) {
                setTimeout(function(){
                    alert("Grattis! Du vann!\nDet tog dig bara " + Memory.guessesTotal + " försök.\nFan vad duktig du är!\nBra jobbat!");
                    }, 500);
            }
        }
        
    },
    
    flipBack: function(brickFirst, brickSecond) {
        setTimeout(function() {
            brickFirst.setAttribute("src", "pics/0.png");
            brickSecond.setAttribute("src", "pics/0.png");
        }, 1000);
    }
};

window.onload = Memory.init;