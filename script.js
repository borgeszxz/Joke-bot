async function getJoke() {
    const category = document.getElementById('category').value;
    const language = document.getElementById('language').value; 
    const url = `https://v2.jokeapi.dev/joke/${category}?blacklistFlags=nsfw&lang=${language}`;
    const loadingElement = document.getElementById('loading');
    const jokeCard = document.getElementById('joke-card');
    const jokeTextElement = document.getElementById('joke-text');

    try {
        loadingElement.style.display = 'flex'; 

        await new Promise(resolve => setTimeout(resolve, 1200)); 

        const response = await fetch(url);
        const data = await response.json();

        let jokeText = '';

        if (data.error) {
            jokeText = `Sorry, I couldn't find a joke for this category and language.`;
        } else if (data.type === 'single') {
            jokeText = data.joke;
        } else if (data.type === 'twopart') {
            jokeText = `${data.setup} ... ${data.delivery}`;
        } else {
            jokeText = 'Sorry, I couldn\'t find a joke for this category.';
        }

        loadingElement.style.display = 'none';
        jokeTextElement.innerText = jokeText;
        jokeCard.classList.add('active');

    } catch (error) {
        console.error('Error fetching joke:', error);
        loadingElement.style.display = 'none';
        jokeTextElement.innerText = 'Error fetching joke. Please try again later.';
        jokeCard.classList.add('active');
    }
}


function closeJokeCard() {
    const jokeCard = document.getElementById('joke-card');
    jokeCard.classList.remove('active');
}
