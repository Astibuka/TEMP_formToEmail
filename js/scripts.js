'use strict';

document.addEventListener('DOMContentLoaded', function(){

    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e){
        e.preventDefault();

        let error = formValidate (form);

        let formData = new FormData(form);
        formData.append('image', formImage.files[0]);

        if (error===0){
            form.classList.add('_sending');
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });
            if (response.ok){
                let result = await response.json();
                alert (result.message);
                formPreview.innerHTML ='';
                form.reset();
                form.classList.remove('_sending');
            } else {
                alert('Error');
                form.classList.remove('_sending');
            }
        }else{
            alert('Fill the required fields correctly');
        }
    }

function formValidate (form) {
    let error = 0;
    let formReq = document.querySelectorAll('._req');

    for (let i=0; i < formReq.length; i++){
        const input = formReq[i];
        formRemoveError(input);

        if (input.classList.contains('_email')){
            if (emailTest (input)){
                formAddError (input);
                error++;
            }
        }else if(input.getAttribute('type') === 'checkbox' && input.checked === false){
            formAddError(input);
            error++;
        } else {
            if (input.value ===''){
                formAddError(input);
                error++;
            }
        }
    }
    return error;
}

function formAddError(input){
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
}

function formRemoveError(input){
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
}

function emailTest (input){
    return !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(input.value);
}

const formImage = document.getElementById('formImage');
const formPreview = document.getElementById('formPreview');

formImage.addEventListener('change', () => {
    uploadFile(formImage.files[0]);
});

function uploadFile(file){
    if (!['image/jpg', 'image/jpeg','image/png', 'image/gif'].includes(file.type)){
        alert ('Only images allowed');
        formImage.value ='';
        return;
    } else if (file.size > 2 * 1024 * 1024){
        alert ('The file must be less than 2 MB');
        return;
    }

    var reader = new FileReader();
    reader.onload = function (e) {
        formPreview.innerHTML = `<img src="${e.target.result}" alt="">`;
    };
    reader.onerror = function (e) {
        alert('Error');
    };
    reader.readAsDataURL(file);
}



});