var MessageBoard = {
    messages: [],
    
    
    // Bör nedan funktioner ligga som prototypes istället?
    addMessage:function(text)
    {
        this.messages.push(new Message(text, new Date()));
        this.viewAllMessages();
    },
    
    removeMessage:function(messageId)
    {
        this.messages.splice(messageId, 1);
    },
    
    removeAllMessages:function()
    {
        this.messages.length = 0;   // Mest effektiva sättet att rensa arrayet.
    },
    
    viewMessage:function(messageId)
    {
        var log = document.getElementById("log");
        var messageBox = document.createElement("div");
        var text = document.createTextNode(this.messages[messageId]);
        messageBox.appendChild(text);
        log.appendChild(messageBox);
    },
    
    viewAllMessages:function()
    {
        document.getElementById("log").innerHTML = "";
        for(var i = 0; i < this.messages.length; i += 1) {
            this.viewMessage(i);
        }
    }
}

window.onload = function() {
    
    var buttonSubmit = document.getElementById("buttonSubmit");
    
    buttonSubmit.onclick = function() {
        MessageBoard.addMessage(document.getElementById("text").value);
    }
}