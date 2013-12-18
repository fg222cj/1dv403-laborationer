window.onload = function() {
    
    // De olika input-fälten. Om ett läggs till på sidan så behöver du lägga till en rad här, samt en onblur-event längre ner.
    var firstNameField = document.getElementById("firstName");
    var lastNameField = document.getElementById("lastName");
    var zipCodeField = document.getElementById("zipCode");
    var emailField = document.getElementById("email");
    var paymentPlanSelect = document.getElementById("paymentPlanSelect")
    
    // onblur-events. En för varje input som ska valideras.
    // Varje funktion behöver definiera två saker; Ett reguljärt uttryck (regex) som värdet i
    // input ska testas mot, samt ett felmeddelande (errorMessage) om inputen inte validerar.
    firstNameField.onblur = function() {
        var regexp = /^[a-zA-Z0-9åäöÅÄÖ]+$/; // Ej blank eller blanksteg
        var errorMessage = "Du måste fylla i ett förnamn!";
        validateField(firstNameField, regexp, errorMessage);
    };
    
    lastNameField.onblur = function() {
        var regexp = /^[a-zA-Z0-9åäöÅÄÖ]+$/; // Ej blank eller blanksteg
        var errorMessage = "Du måste fylla i ett efternamn!";
        validateField(lastNameField, regexp, errorMessage);
    };
    
    zipCodeField.onblur = function() {
        var regexp = /^(SE)*\s*\d{3}[\ \-]*\d{2}$/;
        var errorMessage = "Postnumret måste innehålla 5 siffror!";
        if(validateField(zipCodeField, regexp, errorMessage)) {
            zipCodeField.value = zipCodeField.value.replace(/\D/g, "");
        }
    };
    
    emailField.onblur = function() {
        var regexp = /^[a-zA-Z0-9åäöÅÄÖ]+@[a-zA-Z0-9åäöÅÄÖ\.]+[\.]{1}[a-zA-Z]{2,4}$/; // Svaghet: Man kan inte ange en ip-adress som domännamn.
        var errorMessage = "Du måste fylla i en korrekt e-postadress!";
        validateField(emailField, regexp, errorMessage);
    };
    
    // EFtersom det inte går att sätta en select till readonly får den istället attributet disabled.
    // Detta innebär tyvärr att formulärdatan från den inte kan skickas, varför vi har skapat en
    // input av typen hidden. I denna lagras värdet från vår select.
    paymentPlanSelect.onchange = function() {
        document.getElementById("paymentPlan").value = paymentPlanSelect.value;
    }
    
    // Fångar submit och skapar popupfönster.
    document.getElementById("buttonOrderFormSubmit").onclick = createPopup;
    
    // Funktion för att presentera lyckad validering
    function toggleValid(element) {
        element.classList.remove("invalid");
        element.classList.add("valid");
    };
    
    // Funktion för att presentera misslyckad validering
    function toggleInvalid(element) {
        element.classList.remove("valid");
        element.classList.add("invalid");
    };

    // validateField returnerar en bool som är true om valideringen lyckades.
    // Funktionen skriver även ut en hjälpande text om valideringen misslyckas.
    function validateField(inputField, regexp, errorMessage) {
        if(regexp.test(inputField.value)) {
            toggleValid(inputField);
            
            // Kollar om ett felmeddelande finns, i så fall tas det bort.
            if(document.getElementById(inputField.getAttribute("id") + "ErrorMessage") != null) {
                var error = document.getElementById(inputField.getAttribute("id") + "ErrorMessage");
                error.parentNode.removeChild(error);
            }
            return true;
        }
        else {
            toggleInvalid(inputField);
            
            // Kollar om ett felmeddelande finns, annars skrivs det ett.
            if(document.getElementById(inputField.getAttribute("id") + "ErrorMessage") == null) {
                var error = document.createElement("p");
                error.setAttribute("id", inputField.getAttribute("id") + "ErrorMessage");
                error.appendChild(document.createTextNode(errorMessage));
                inputField.parentNode.insertBefore(error, inputField.nextSibling);
            }
            return false;
        };
    };
    
    // createPopup skapar en halvgenomskinlig svart bakgrund som lägger sig över det
    // ordinarie innehållet. Därefter skapas en popup med informationen som användaren angett i formuläret.
    function createPopup() {
        
        // Skapar skuggad bakgrund.
        var overlay = document.createElement("div");
        overlay.setAttribute("id", "overlay");
        document.body.appendChild(overlay);
        
        // Loopar igenom alla inputs och sätter dem till readonly.
        var inputs = document.getElementsByTagName("input");
        for(var i = 0; i < inputs.length; i += 1) {
            inputs[i].readonly = true;
        }
        
        // Loopar igenom alla selects och sätter dem till disabled.
        var selects = document.getElementsByTagName("select");
        for(var i = 0; i < selects.length; i += 1) {
            selects[i].disabled = true;
        }
        
        // Sätter submit-knappen till disabled.
        document.querySelector("input[type=submit]").disabled = true;
        
        // Skapar popup-fönstret
        var popupWindow = document.createElement("div");
        popupWindow.setAttribute("id", "popupWindow");
        
        // Skapar h1 med hjälptext
        var header = document.createElement("h1");
        header.appendChild(document.createTextNode("Vänligen bekräfta ditt köp"));
        popupWindow.appendChild(header);
        
        // Skapar en tabell där vi lägger in all formulärdata.
        var table = document.createElement("table");
        
        // Loopar igenom alla label-taggar och skriver ut dem och värdet i deras tillhörande input-fält.
        var labels = document.getElementsByTagName("label");
        for(var i = 0; i < labels.length; i += 1) {
            var input = document.getElementById(labels[i].getAttribute("for"));
            var tr = document.createElement("tr");
            var tdLabel = document.createElement("td");
            tdLabel.appendChild(document.createTextNode(labels[i].firstChild.data));
            var tdValue = document.createElement("td");
            tdValue.appendChild(document.createTextNode(input.value))
            
            tr.appendChild(tdLabel);
            tr.appendChild(tdValue);
            table.appendChild(tr);
        }
        
        popupWindow.appendChild(table);
        
        // En ny submit-knapp till formuläret så att användaren kan bekräfta skiten.
        var buttonSubmit = document.createElement("input");
        buttonSubmit.setAttribute("type", "submit");
        buttonSubmit.setAttribute("form", "orderForm");
        buttonSubmit.setAttribute("value", "Bekräfta")
        popupWindow.appendChild(buttonSubmit);
        
        // En cancel-knapp som plockar bort popupen och låter användaren ändra skit.
        var buttonCancel = document.createElement("input");
        buttonCancel.setAttribute("type", "reset");
        buttonCancel.setAttribute("value", "Ändra");
        buttonCancel.onclick = removePopup;
        popupWindow.appendChild(buttonCancel);
        
        document.body.appendChild(popupWindow);
        return false;
    };
    
    // Tar bort popupen och återställer allt annat som ändrats i createPopup.
    function removePopup() {
        var popupWindow = document.getElementById("popupWindow");
        popupWindow.parentNode.removeChild(popupWindow);
        
        var overlay = document.getElementById("overlay");
        overlay.parentNode.removeChild(overlay);
        
        var inputs = document.getElementsByTagName("input");
        for(var i = 0; i < inputs.length; i += 1) {
            inputs[i].readOnly = false;
        }
        
        var selects = document.getElementsByTagName("select");
        for(var i = 0; i < selects.length; i += 1) {
            selects[i].disabled = false;
        }
        
        document.querySelector("input[type=submit]").disabled = false;
    }
};