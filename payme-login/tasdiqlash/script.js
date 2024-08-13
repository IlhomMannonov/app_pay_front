const sended_phone = localStorage.getItem('send_sms_phone')
if (!sended_phone){
    window.location.href = '../index.html';
}

console.log(localStorage.getItem('send_sms_phone'));

document.getElementById('send_phone').value = "asd";


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