console.log("Admission Form");

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get references to all relevant elements
    const psyAndBagRadio = document.getElementById('psy_and_bag');
    const mecAndBagRadio = document.getElementById('mec_and_bag');
    const psyGradeInput = document.getElementById('psy_grade');
    const mecGradeInput = document.getElementById('mec_grade');
    const bagGradeInput = document.getElementById('bag_grade');
    
    // Create message elements for validation 
    const errorMessageElement = document.createElement('div');
    errorMessageElement.id = 'validation-message';
    errorMessageElement.style.display = 'none';
    errorMessageElement.style.marginTop = '10px';
    errorMessageElement.style.fontWeight = 'bold';
    errorMessageElement.className = 'green';
    
    // Create success message element
    const successMessageElement = document.createElement('div');
    successMessageElement.id = 'success-message';
    successMessageElement.className = 'green'; 
    successMessageElement.style.display = 'none';
    successMessageElement.style.marginTop = '10px';
    successMessageElement.style.fontWeight = 'bold';
    successMessageElement.style.padding = '10px';
    
    // Insert the message elements after the form
    const form = document.querySelector('form');
    form.after(errorMessageElement);
    form.after(successMessageElement);
    
    // Initial state - disable fields based on default selection
    updateFieldsVisibility();
    
    // Add event listeners to radio buttons
    psyAndBagRadio.addEventListener('change', updateFieldsVisibility);
    mecAndBagRadio.addEventListener('change', updateFieldsVisibility);
    
    // Function to update fields visibility based on selected option
    function updateFieldsVisibility() {
        if (psyAndBagRadio.checked) {
            // Enable psychometric and bagrut, disable mechina
            psyGradeInput.disabled = false;
            psyGradeInput.required = true;
            bagGradeInput.disabled = false;
            bagGradeInput.required = true;
            mecGradeInput.disabled = true;
            mecGradeInput.required = false;
            mecGradeInput.value = '';
        } else if (mecAndBagRadio.checked) {
            // Enable mechina and bagrut, disable psychometric
            psyGradeInput.disabled = true;
            psyGradeInput.required = false;
            psyGradeInput.value = '';
            bagGradeInput.disabled = false;
            bagGradeInput.required = true;
            mecGradeInput.disabled = false;
            mecGradeInput.required = true;
        }
    }

    function validate(){
        const age = document.getElementById('age');        
        if (age.value > 30){
            errorMessageElement.textContent = "You are eligible for admission to any faculty you choose.";
            errorMessageElement.style.display = 'block';

            
            return false;
        } 
    }
    
    // Handle form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Validate the form first
        if (!validate()) {
            return; // Stop form processing if validation fails
        }
        
        // Get values
        const age = document.getElementById('age').value;
        const admissionPath = document.querySelector('input[name="admission_path"]:checked').value;
        let psyGrade = '';
        let mecGrade = '';
        const bagGrade = bagGradeInput.value;
        
        if (admissionPath === 'psy_and_bag') {
            psyGrade = psyGradeInput.value;
            successMessageElement.textContent = `Success! Age: ${age}, Psychometric: ${psyGrade}, Bagrut: ${bagGrade}`;
            console.log(`Admission Path: ${admissionPath}, Age: ${age}, Psychometric: ${psyGrade}, Bagrut: ${bagGrade}`);
        } else if (admissionPath === 'mec_and_bag') {
            mecGrade = mecGradeInput.value;
            successMessageElement.textContent = `Success! Age: ${age}, Mechina: ${mecGrade}, Bagrut: ${bagGrade}`;
            console.log(`Admission Path: ${admissionPath}, Age: ${age}, Mechina: ${mecGrade}, Bagrut: ${bagGrade}`);
        }
    });
});