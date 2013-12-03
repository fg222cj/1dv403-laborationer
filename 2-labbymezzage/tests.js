"use strict";

window.onload = function() {
    MessageBoard.addMessage("Testmeddelande1");
    MessageBoard.addMessage("Testmeddelande2");
    MessageBoard.addMessage("Testmeddelande3");
    MessageBoard.addMessage("Testmeddelande4");
    MessageBoard.removeMessage(2);
    MessageBoard.viewAllMessages();
};