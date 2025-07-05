// Song Request Management
document.addEventListener('DOMContentLoaded', function() {
    const songRequestsContainer = document.getElementById('song-requests-container');
    const addSongBtn = document.getElementById('add-song-request');
    let songRequestCount = 1; // Start with 1 (the required field)
    const maxSongRequests = 5;

    // Show the add button initially
    addSongBtn.style.display = 'inline-flex';

    addSongBtn.addEventListener('click', function() {
        if (songRequestCount < maxSongRequests) {
            songRequestCount++;
            
            // Create new song request row
            const songRequestRow = document.createElement('div');
            songRequestRow.className = 'song-request-row';
            
            const input = document.createElement('input');
            input.type = 'text';
            input.id = `SongRequest${songRequestCount}`;
            input.name = `Song Request ${songRequestCount}`;
            input.maxLength = '100';
            input.placeholder = `Song Request ${songRequestCount} (optional)`;
            
            const removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.className = 'remove-song-btn';
            removeBtn.innerHTML = '×';
            removeBtn.setAttribute('aria-label', `Remove song request ${songRequestCount}`);
            
            // Add remove functionality
            removeBtn.addEventListener('click', function() {
                songRequestRow.remove();
                songRequestCount--;
                
                // Show add button if we're below max
                if (songRequestCount < maxSongRequests) {
                    addSongBtn.style.display = 'inline-flex';
                }
                
                // Update remaining field IDs and names
                updateFieldNumbers();
            });
            
            songRequestRow.appendChild(input);
            songRequestRow.appendChild(removeBtn);
            songRequestsContainer.appendChild(songRequestRow);
            
            // Hide add button if we've reached max
            if (songRequestCount >= maxSongRequests) {
                addSongBtn.style.display = 'none';
            }
            
            // Focus the new input
            input.focus();
        }
    });

    function updateFieldNumbers() {
        const songRequestRows = songRequestsContainer.querySelectorAll('.song-request-row');
        songRequestRows.forEach((row, index) => {
            const input = row.querySelector('input');
            const removeBtn = row.querySelector('.remove-song-btn');
            const newNumber = index + 2; // +2 because we start counting from 2 (1 is the required field)
            
            input.id = `SongRequest${newNumber}`;
            input.name = `Song Request ${newNumber}`;
            input.placeholder = `Song Request ${newNumber} (optional)`;
            removeBtn.setAttribute('aria-label', `Remove song request ${newNumber}`);
        });
    }
});

document.getElementById('rsvpForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading message
    const messageDiv = document.querySelector('.form-message');
    messageDiv.innerHTML = '<p class="alert">Submitting your RSVP...</p>';
    
    // Get reCAPTCHA response
    const recaptchaResponse = grecaptcha.getResponse();
    if (!recaptchaResponse) {
        messageDiv.innerHTML = '<p class="alert error">Please complete the reCAPTCHA verification.</p>';
        return;
    }
    
    // Get form data
    const formData = new FormData(this);
    formData.append('g-recaptcha-response', recaptchaResponse);
    
    // Add IP address (optional, your script handles if not present)
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => formData.append('ip', data.ip))
        .catch(error => {
            console.log('IP fetch error:', error);
            // Continue without IP if fetch fails
            submitForm(formData);
        })
        .finally(() => submitForm(formData));

    function submitForm(formData) {
        // Convert FormData to URL-encoded string
        const data = Array.from(formData.entries())
            .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
            .join('&');

        fetch('https://script.google.com/macros/s/AKfycbwzxcSl0dkjCCRHOoutOp06VmqyxKBmwJ2nPqfC9xZV9MlOdBPUL7WcjzKix91pEsZD/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: data
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.result === 'success') {
                messageDiv.innerHTML = '<p class="alert success">Thank you! Your RSVP has been recorded.</p>';
                document.getElementById('rsvpForm').reset();
                grecaptcha.reset(); // Reset reCAPTCHA
            } else {
                throw new Error(data.message || 'Something went wrong');
            }
        })
        .catch(error => {
            console.error('Error!', error.message);
            messageDiv.innerHTML = 
                `<p class="alert error">${error.message || 'Sorry, there was an error submitting your RSVP. Please try again.'}</p>`;
            grecaptcha.reset(); // Reset reCAPTCHA
        });
    }
}); 