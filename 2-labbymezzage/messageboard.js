var MessageBoard = {
    messages: [],
    
    init: function() {
    
        var buttonSubmit = document.getElementById("buttonSubmit");
        buttonSubmit.onclick = function() {
            MessageBoard.addMessage(document.getElementById("text").value);
            document.getElementById("text").value = "";
        };
        
        document.getElementById("text").onkeypress = function (event) {
            if(!e) var e = window.event;
            if (event.keyCode == 13 && !event.shiftKey) {
                MessageBoard.addMessage(document.getElementById("text").value);
                document.getElementById("text").value = "";
            };
        };
        
        // Det verkar som att det skapas en ny rad när man släpper enter-tangenten. Därav nedan lösning. Det måste finnas ett bättre sätt...
        document.getElementById("text").onkeyup = function (event) {
            if (event.keyCode == 13 && !event.shiftKey) {
                document.getElementById("text").value = "";
            };
        };
    
    },
    // Bör nedan funktioner ligga som prototypes istället?
    addMessage:function(text)
    {
        if(text == "" || text == null || text == "\n" || text == "\r") {
            return;
        }
        this.messages.push(new Message(text, new Date()));
        this.viewAllMessages();
    },
    
    removeMessage:function(messageId)
    {
        if(!confirm("Vill du verkligen ta bort det här kommandot ur loggen?")) {
            return;
        }
        this.messages.splice(messageId, 1);
        this.viewAllMessages();
    },
    
    removeAllMessages:function()
    {
        this.messages.length = 0;   // Mest effektiva sättet att rensa arrayet.
    },
    
    viewMessage:function(messageId)
    {
        var log = document.getElementById("log");
        var messageBox = document.createElement("div");
        var text = document.createElement("p");
        var date = document.createElement("p");
        var clear = document.createElement("div");
        clear.setAttribute("class", "clear");
        
        var buttonInfo = document.createElement("a");
        buttonInfo.appendChild(document.createTextNode("info"));
        buttonInfo.setAttribute("href", "#");
        
        var buttonDelete = document.createElement("a");
        buttonDelete.appendChild(document.createTextNode("x"));
        buttonDelete.setAttribute("href", "#");
        
        messageBox.setAttribute("class", "messageBox");
        text.innerHTML = this.messages[messageId].getHTMLText();
        date.innerHTML = this.messages[messageId].getTimeText();
        
        //textBox.appendChild(text); 
        /*
            Intressant bug hände här. När jag inte hade en variabel som hette text så rotade funktionen ovan fram
            min textarea (med id="text"), tog den från där den låg och lade in den i den nya diven istället. Coolt.
        */
        
        messageBox.appendChild(text);
        messageBox.appendChild(date);
        messageBox.appendChild(buttonDelete);
        messageBox.appendChild(buttonInfo);
        messageBox.appendChild(clear);
        log.appendChild(messageBox);
        
        buttonInfo.onclick = function() {
            alert(MessageBoard.messages[messageId].getDateText());
        };
        
        buttonDelete.onclick = function() {
            MessageBoard.removeMessage(messageId);
        };
    },
    
    viewAllMessages:function()
    {
        document.getElementById("log").innerHTML = "";
        for(var i = 0; i < this.messages.length; i += 1) {
            this.viewMessage(i);
        };
        var numberOfMessages = document.getElementById("numberOfCommands");
        numberOfMessages.innerHTML = this.messages.length +" commands";
    }
};

window.onload = MessageBoard.init;