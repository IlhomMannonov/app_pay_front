const base_api = "http://localhost:3001/api/v1";

// Get the provider object from localStorage
const provider = JSON.parse(localStorage.getItem('provider'));

// Display the provider name in the HTML
document.getElementById('provider-name').textContent = provider.name;

// Get the form and attach an event listener for submission
const form = document.getElementById('account-form');
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting the default way

    // Get the submit button and disable it after click
    const submitButton = document.querySelector('.continue');
    submitButton.disabled = true;
    submitButton.value = "Kuting..."; // Optional: Change button text to indicate it's processing

    // Get the account number entered by the user
    const accountNumber = document.getElementById('account-number').value;

    // Create the data object to send
    const data = {
        account_id: accountNumber,
        provider_id: provider.id, // Use the correct provider ID here
    };

    // Send the data to the server via POST request
    fetch(`${base_api}/provider-details`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success === false) {
                alert(data.message);
                // Re-enable the button if the response indicates failure
                submitButton.disabled = false;
                submitButton.value = "Davom etish"; // Revert button text back to original
            } else {
                window.location.href = '../pay_card';
                // Store the response data in localStorage
                localStorage.setItem('account_details', JSON.stringify(data.data));
                console.log('Success:', data.data);
                // Optionally, redirect to another page or display a success message
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            // Re-enable the button in case of an error
            submitButton.disabled = false;
            submitButton.value = "Davom etish"; // Revert button text back to original
        });
});
