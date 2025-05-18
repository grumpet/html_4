console.log("Admission Form");

document.addEventListener('DOMContentLoaded', function() {
    const psyAndBagRadio = document.getElementById('psy_and_bag');
    const mecAndBagRadio = document.getElementById('mec_and_bag');
    const psyGradeInput = document.getElementById('psy_grade');
    const mecGradeInput = document.getElementById('mec_grade');
    const bagGradeInput = document.getElementById('bag_grade');
    
    const errorMessageElement = document.createElement('div');
    errorMessageElement.id = 'validation-message';
    errorMessageElement.style.display = 'none';
    errorMessageElement.style.marginTop = '10px';
    errorMessageElement.style.fontWeight = 'bold';
    errorMessageElement.className = 'green';
    

    
    const form = document.querySelector('form');
    form.after(errorMessageElement);
    
    // Initial setup for form fields based on radio selection
    updateFieldsVisibility();
    
    // Add event listeners for radio buttons
    psyAndBagRadio.addEventListener('change', updateFieldsVisibility);
    mecAndBagRadio.addEventListener('change', updateFieldsVisibility);
    
    function updateFieldsVisibility() {
        if (psyAndBagRadio.checked) {
            psyGradeInput.disabled = false;
            psyGradeInput.required = true;
            bagGradeInput.disabled = false;
            bagGradeInput.required = false;
            mecGradeInput.disabled = true;
            mecGradeInput.required = false;
            mecGradeInput.value = '';
        } else if (mecAndBagRadio.checked) {
            psyGradeInput.disabled = true;
            psyGradeInput.required = false;
            psyGradeInput.value = '';
            bagGradeInput.disabled = false;
            bagGradeInput.required = false;
            mecGradeInput.disabled = false;
            mecGradeInput.required = true;
        }
    }
    
    // Validate form inputs
    function validate() {
        const age = document.getElementById('age').value; 
        const bagGrade = document.getElementById('bag_grade').value;
        
        // Check if bagrut grade is empty
        if (bagGrade === '' || bagGrade === null || bagGrade.trim() === '') {
            errorMessageElement.textContent = "Please enter your Bagrut grade.";
            errorMessageElement.style.display = 'block';
            successMessageElement.style.display = 'none';
            bagGradeInput.focus(); // Focus on the missing field
            return false;
        }
        
        // Check age
        if (parseInt(age) > 30) {
            errorMessageElement.textContent = "You are eligible for admission to any faculty you choose.";
            errorMessageElement.style.display = 'block';
            successMessageElement.style.display = 'none';
            return false;
        }
        
        // Clear error message and show success message for valid form
        errorMessageElement.style.display = 'none';
        return true;
    }
    
    // Form submission handler
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        
        // Execute validation
        if (!validate()) {
            return false; // Stop processing if validation fails
        }
        
        // Collect form data
        const age = document.getElementById('age').value;
        const admissionPath = document.querySelector('input[name="admission_path"]:checked')?.value;
        const bagGrade = bagGradeInput.value;
        
        // Ensure admission path is selected
        if (!admissionPath) {
            errorMessageElement.textContent = "Please select an admission path.";
            errorMessageElement.style.display = 'block';
            return false;
        }
        
        // Process based on the selected path
        if (admissionPath === 'psy_and_bag') {
            const psyGrade = psyGradeInput.value;
            if (!psyGrade) {
                errorMessageElement.textContent = "Please enter your Psychometric grade.";
                errorMessageElement.style.display = 'block';
                return false;
            }
        } else if (admissionPath === 'mec_and_bag') {
            const mecGrade = mecGradeInput.value;
            if (!mecGrade) {
                errorMessageElement.textContent = "Please enter your Mechina grade.";
                errorMessageElement.style.display = 'block';
                return false;
            }
        }
        
        return true;
    });
});