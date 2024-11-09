document.addEventListener('DOMContentLoaded', () => {
    let score = 0;

    function loadNewEmoji() {
        fetch('/random-emoji')
            .then(response => response.json())
            .then(data => {
                document.getElementById('emoji').textContent = data.emoji;
                const optionsDiv = document.getElementById('options');
                optionsDiv.innerHTML = '';
                data.options.forEach(option => {
                    const label = document.createElement('label');
                    const radio = document.createElement('input');
                    radio.type = 'radio';
                    radio.name = 'guess';
                    radio.value = option;
                    label.appendChild(radio);
                    label.append(option);
                    optionsDiv.appendChild(label);
                });
            });
    }

    document.getElementById('guessForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const guess = document.querySelector('input[name="guess"]:checked').value;
        const emoji = document.getElementById('emoji').textContent;

        fetch('/check-guess', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ guess, emoji })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('feedback').textContent = data.message;
            score += data.correct ? 1 : 0;
            document.getElementById('score').textContent = `Score: ${score}`;
            loadNewEmoji();
        });
    });

    loadNewEmoji();
});
