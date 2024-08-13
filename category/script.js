const base_api = "http://localhost:3001/api/v1";

async function fetchProviders() {
    try {
        const response = await fetch(`${base_api}/provider-all`);
        const providers = await response.json();

        // Select the button container to update with provider names
        const buttonContainer = document.querySelector('.button-container');

        // Clear any existing content in the container
        buttonContainer.innerHTML = '';

        providers.forEach(provider => {
            // Create a new button element for each provider
            const providerButton = document.createElement('button');
            providerButton.className = 'btn'; // Keep the button styling
            providerButton.textContent = provider.name; // Set the button text to the provider's name

            providerButton.addEventListener('click', () => {
                window.location.href = `../hisobraqam?id=${provider.id}`;
                localStorage.setItem('provider', JSON.stringify(provider));
            });

            // Append the provider button to the button container
            buttonContainer.appendChild(providerButton);
        });

    } catch (error) {
        console.error("Error fetching providers:", error);
    }
}

fetchProviders();
