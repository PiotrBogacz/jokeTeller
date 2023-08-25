const audioElement = document.getElementById("audio");
const button = document.getElementById("button");

//Disable/Enable button
function toggleButton() {
    button.disabled = !button.disabled
}

//Passing Joke to VoiveRSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key: 'c3da9c12fca441d3aef97914c62dab38',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

//Get jokes
async function getJokes() {
    let joke = "";
    const apiUrl = "https://v2.jokeapi.dev/joke/Any";
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        //Text to speech
        tellMe(joke);
        //Disable button
        toggleButton();
    } catch (error) {
        
    }
}

//Event listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);