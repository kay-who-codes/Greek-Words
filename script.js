// Array of Greek phrases to use in the app (expandable with more phrases)
const greekPhrases = [
    "Γνῶθι σεαυτόν",
    "Παν μέτρον άριστον",
    "Η γνώση είναι δύναμη",
    "Μολών λαβέ",
    "Άνθρωπος εἶναι το μέτρον"
];

// Function to fetch a translation of a Greek phrase
async function translateGreekPhrase(greekPhrase) {
    try {
        const response = await fetch("https://libretranslate.com/translate", {
            method: "POST",
            body: JSON.stringify({
                q: greekPhrase,
                source: "auto", // auto-detect the source language (Greek)
                target: "en",   // translate to English
                format: "text",
                alternatives: 3, // optional: request alternative translations
                api_key: ""      // LibreTranslate does not require an API key for free use
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        // If translation is successful, return the translated text
        return data.translatedText;
    } catch (error) {
        console.error("Error with translation:", error);
        return "Translation failed.";
    }
}

// Function to generate and display a random Greek phrase along with its translation
async function displayRandomPhrase() {
    // Get a random Greek phrase from the array
    const randomGreekPhrase = greekPhrases[Math.floor(Math.random() * greekPhrases.length)];

    // Fetch the translation from the LibreTranslate API
    const translatedText = await translateGreekPhrase(randomGreekPhrase);

    // Display the Greek phrase and its English translation
    document.getElementById("greek-phrase").innerText = randomGreekPhrase;
    document.getElementById("english-translation").innerText = translatedText;
}

// Add event listener to the button to generate a new phrase when clicked
document.getElementById("generate-btn").addEventListener("click", displayRandomPhrase);

// Initially, nothing is displayed; only when the button is clicked, the phrase is shown
