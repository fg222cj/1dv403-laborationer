window.onload = function() {
    var firstNameField = document.getElementById("firstName");
    var lastNameField = document.getElementById("lastName");
    var zipCodeField = document.getElementById("zipCode");
    var emailField = document.getElementById("email");
    
    function toggleValid(element) {
        element.classList.remove("invalid");
        element.classList.add("valid");
    };
    
    function toggleInvalid(element) {
        element.classList.remove("valid");
        element.classList.add("invalid");
    };

    function validateField(inputField, regexp) {
        
        if(regexp.test(inputField.value)) {
            toggleValid(inputField);
        }
        else {
            toggleInvalid(inputField);
        };
    };
    
    firstNameField.onblur = function() {
        var regexp = new RegExp("^[^\s]*$");
        validateField(firstNameField, regexp);
    };
    
    lastNameField.onblur = function() {
        var regexp = new RegExp("^[a-zA-Z0-9åäöÅÄÖ]+$");
        validateField(lastNameField, regexp);
    };
    
    zipCodeField.onblur = function() {
        var regexp = new RegExp("^[0-9]{5}$");
        validateField(zipCodeField, regexp);
    };
    
    firstNameField.onblur = function() {
        var regexp = new RegExp("^[a-zA-Z0-9åäöÅÄÖ]+$");
        validateField(firstNameField, regexp);
    };
};