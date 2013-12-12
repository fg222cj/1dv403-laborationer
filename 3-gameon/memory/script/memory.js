var Memory = {
    
    cols: 2,
    rows: 1,
    
    memories: [],
    guessesTotal: 0,
    guessesCurrent: 0,
    guessesCorrect: 0,
    lastGuess: -1,
    
    init: function() {
        Memory.memories = RandomGenerator.getPictureArray(Memory.cols, Memory.rows);
        Memory.createTable();
    },
    
    createTable: function() {
        var brickId = 0;
        
        var table = document.createElement("table");
        
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
            Memory.guessesTotal += 1;
            if(Memory.guessesCorrect == Memory.memories.length / 2) {
                setTimeout(function(){
                    alert("Grattis! Du vann!\nDet tog dig bara " + Memory.guessesCorrect + " försök.\nBra jobbat!");
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