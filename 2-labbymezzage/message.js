"use strict";

function Message(message, date){
    
    // Getters och setters
    this.getText = function() {
        return message;
    }
    
    this.setText = function(_text) {
        message = _text;
    }
    
    this.getDate = function() {
        return date;
    }
    
    this.setDate = function(_date) {
        date = _date;
    }
    
    // Överlagrar toString
    
    Message.prototype.toString = function() {
        return this.getText()+"  ("+this.getDate()+")";
    }
    
    // getHTMLText returnerar texten med radbrytningar
    
    Message.prototype.getHTMLText = function() {
        return this.getText().replace("\n","<br />");
    }
    
    // getDateText returnerar datumet på ett vettigt sätt
    
    Message.prototype.getDate = function() {
        return this.getDate().toString();
    }
}
