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
        return this.getText().replace(/\n/g, "<br />");     // http://stackoverflow.com/questions/5076466/javascript-replace-n-with-br
    }
    
    // getDateText returnerar datumet på ett vettigt sätt
    
    Message.prototype.getDateText = function() {
        return "Kommandot skrevs "+ this.getDate().getHours() +":"+ this.getDate().getMinutes() +":"+ this.getDate().getSeconds() +" "+ this.getDate().getDay() +"/"+ this.getDate().getMonth() +"/"+ this.getDate().getFullYear();
    }
    
    Message.prototype.getTimeText = function() {
        return this.getDate().getHours() +":"+ this.getDate().getMinutes() +":"+ this.getDate().getSeconds();
    }
}
