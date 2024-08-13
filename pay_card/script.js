const base_api = "http://localhost:3001/api/v1";

const provider = JSON.parse(localStorage.getItem('provider'));
document.getElementById('provider-name').textContent = provider ? provider.name : 'Provider Name';

const accountDetails = JSON.parse(localStorage.getItem('account_details'));

if (accountDetails && Array.isArray(accountDetails)) {
    const container = document.getElementById('account-details-container');
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

document.getElementById('amount').value = Number(provider.min_amount);
{
    const container = document.getElementById('min-max');

    // Create container for minimum value
    const minContainerDiv = document.createElement('div');
    minContainerDiv.classList.add('container');

    const minKey = document.createElement('div');
    minKey.textContent = "Minimum";
    minContainerDiv.appendChild(minKey);

    const minValueDiv = document.createElement('div');
    minValueDiv.textContent = Number(provider.min_amount).toLocaleString('en-US') + " so'm";
    minContainerDiv.appendChild(minValueDiv);

    container.appendChild(minContainerDiv);

    // Create container for maximum value
    const maxContainerDiv = document.createElement('div');
    maxContainerDiv.classList.add('container');

    const maxKey = document.createElement('div');
    maxKey.textContent = "Maximum";
    maxContainerDiv.appendChild(maxKey);

    const maxValueDiv = document.createElement('div');
    maxValueDiv.textContent = Number(provider.max_amount).toLocaleString('en-US') + " so'm";

    maxContainerDiv.appendChild(maxValueDiv);

    container.appendChild(maxContainerDiv);
}
const payment_type = JSON.parse(localStorage.getItem('payment-type'));
const user_id = localStorage.getItem('user_id');
const data = {
    payment_type_id: payment_type.id,
    user_id: user_id
};

fetch(`${base_api}/payment-type-cards`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
})
    .then(response => response.json())
    .then(responseData => {
        if (responseData.success) {
            const swiperWrapper = document.querySelector('.swiper-wrapper');
            responseData.data.forEach(card => {
                const swiperSlide = document.createElement('div');
                swiperSlide.classList.add('swiper-slide');

                const creditCardDiv = document.createElement('div');
                creditCardDiv.classList.add('credit-card');

                const cardFront = document.createElement('div');
                cardFront.classList.add('card-front');

                const cardLogo = document.createElement('div');
                cardLogo.classList.add('card-logo');
                const logoImg = document.createElement('img');
                logoImg.src = "humo.webp";  // Replace with dynamic logo URL if available
                logoImg.alt = "Card Logo";
                logoImg.style.width = "20%";
                cardLogo.appendChild(logoImg);
                cardFront.appendChild(cardLogo);

                const cardNumber = document.createElement('div');
                cardNumber.classList.add('card-number');
                cardNumber.innerHTML = `<p>${card.number}</p>`;
                cardFront.appendChild(cardNumber);

                const cardDetails = document.createElement('div');
                cardDetails.classList.add('card-details');
                cardDetails.innerHTML = `
                    <div class="card-name"><p>${card.name}</p></div>
                    <div class="card-expiry"><p>${card.expire.slice(0, 2)}/${card.expire.slice(2)}</p></div>
                `;
                cardFront.appendChild(cardDetails);

                const cardBalance = document.createElement('div');
                cardBalance.classList.add('card-balance');
                card.balance = card.balance/100;
                cardBalance.innerHTML = `<p>${card.balance.toLocaleString('en-US')} so'm</p>`;
                cardFront.appendChild(cardBalance);

                creditCardDiv.appendChild(cardFront);
                swiperSlide.appendChild(creditCardDiv);
                swiperWrapper.appendChild(swiperSlide);
            });

            // Initialize Swiper after cards are added
            new Swiper('.swiper-container');
        } else {
            console.error('Failed to fetch payment type cards.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

{
    // Initialize Swiper

}