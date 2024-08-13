const accountDetails = JSON.parse(localStorage.getItem('account_details'));

// Check if account details exist
if (accountDetails && Array.isArray(accountDetails)) {
    const container = document.getElementById('account-details-container');

    // Iterate over each item in the array and create the HTML elements
    accountDetails.forEach(detail => {
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('container');

        const keyDiv = document.createElement('div');
        keyDiv.textContent = detail.key;
        containerDiv.appendChild(keyDiv);

        const valueDiv = document.createElement('div');
        valueDiv.textContent = detail.value;
        containerDiv.appendChild(valueDiv);

        container.appendChild(containerDiv);
    });
} else {
    console.error("No account details found in local storage or the data format is incorrect.");
}