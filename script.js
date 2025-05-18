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
    
    updateFieldsVisibility();
    
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
    
    function validate() {
        const age = document.getElementById('age').value; 
        const bagGrade = document.getElementById('bag_grade').value;
        
        if (bagGrade === '' || bagGrade === null || bagGrade.trim() === '') {
            errorMessageElement.textContent = "Please enter your Bagrut grade.";
            errorMessageElement.style.display = 'block';
            bagGradeInput.focus(); 
            return false;
        }
        
        if (parseInt(age) > 30) {
            errorMessageElement.textContent = "You are eligible for admission to any faculty you choose.";
            errorMessageElement.style.display = 'block';
            successMessageElement.style.display = 'none';
            return false;
        }
        
        errorMessageElement.style.display = 'none';
        return true;
    }
    
    form.addEventListener('submit', function(event) {
        event.preventDefault(); 
        
        if (!validate()) {
            return false; 
        }
        

        
 
        return true;
    });
});