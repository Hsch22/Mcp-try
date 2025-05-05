document.addEventListener('DOMContentLoaded', () => {
    const attractions = document.querySelectorAll('.attraction-card');
    let currentPlayingAudio = null;
    let currentPlayingButton = null;

    attractions.forEach(attraction => {
        const header = attraction.querySelector('.attraction-header');
        const content = attraction.querySelector('.attraction-content');
        const toggleIcon = header.querySelector('.toggle-icon');
        const audioButton = attraction.querySelector('.audio-button');
        const audioElement = attraction.querySelector('audio');

        // Toggle content visibility
        if (header && content && toggleIcon) {
            header.addEventListener('click', (event) => {
                // Prevent toggling when clicking the audio button
                if (audioButton && event.target.closest('.audio-button')) {
                    return;
                }
                content.style.display = content.style.display === 'none' || content.style.display === '' ? 'block' : 'none';
                toggleIcon.classList.toggle('rotate-180');
            });
        }

        // Audio playback control
        if (audioButton && audioElement) {
            const playIcon = audioButton.querySelector('i');

            audioButton.addEventListener('click', () => {
                if (audioElement.paused) {
                    // Pause currently playing audio if different
                    if (currentPlayingAudio && currentPlayingAudio !== audioElement) {
                        currentPlayingAudio.pause();
                    }
                    audioElement.play();
                    currentPlayingAudio = audioElement;
                    currentPlayingButton = audioButton;
                } else {
                    audioElement.pause();
                }
            });

            audioElement.addEventListener('play', () => {
                playIcon.classList.remove('fa-play-circle');
                playIcon.classList.add('fa-pause-circle');
                // Update other buttons
                document.querySelectorAll('.audio-button').forEach(btn => {
                    if (btn !== audioButton) {
                        const icon = btn.querySelector('i');
                        icon.classList.remove('fa-pause-circle');
                        icon.classList.add('fa-play-circle');
                    }
                });
            });

            audioElement.addEventListener('pause', () => {
                playIcon.classList.remove('fa-pause-circle');
                playIcon.classList.add('fa-play-circle');
                if (currentPlayingAudio === audioElement) {
                    currentPlayingAudio = null;
                    currentPlayingButton = null;
                }
            });

            audioElement.addEventListener('ended', () => {
                playIcon.classList.remove('fa-pause-circle');
                playIcon.classList.add('fa-play-circle');
                currentPlayingAudio = null;
                currentPlayingButton = null;
            });
        }
    });

    // Add similar logic for surrounding attractions if they have audio
    const surroundingAttractions = document.querySelectorAll('.surrounding-attractions .attraction-header');
    surroundingAttractions.forEach(header => {
        const playIcon = header.querySelector('.play-icon');
        if (playIcon) {
            // Placeholder: Add audio functionality if needed for surrounding attractions
            playIcon.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent header click if any
                console.log('Play icon clicked for:', header.querySelector('h2').textContent);
                // Add actual audio playback logic here if required
            });
        }
    });
});