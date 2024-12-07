// Array of Greek phrases to use in the app (expandable with more phrases)
const greekPhrases = [
    "Γνῶθι σεαυτόν",
    "Παν μέτρον άριστον",
    "Η γνώση είναι δύναμη",
    "Μολών λαβέ",
    "Άνθρωπος εἶναι το μέτρον"
];

// Function to fetch a translation of a Greek phrase using the LibreTranslate API
async function translateGreekPhrase(greekPhrase) {
    try {
        // Making a POST request to the LibreTranslate API for translation
        const response = await fetch("https://libretranslate.com/translate", {
            method: "POST",
            body: JSON.stringify({
                q: greekPhrase,           // The Greek phrase to translate
                source: "auto",           // Auto-detect source language
                target: "en",             // Translate to English
                format: "text",           // Text format
                api_key: ""               // No API key is needed
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        // Parsing the JSON response
        const data = await response.json();

        // Return the translated text or an error message if response is not valid
        if (data && data.translatedText) {
            return data.translatedText;
        } else {
            throw new Error("Translation failed.");
        }
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
