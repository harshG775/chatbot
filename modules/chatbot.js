import { logMessage } from "./log.js";
import { getChatbotResponse } from "./chatbotAPI.js";
import { speak } from "./speech.js";

const log = document.getElementById("log");

// Initialize speech recognition
const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = false;
recognition.continuous = true;
recognition.lang = "en-US";

// Start speech recognition
recognition.start();

// Handle speech recognition results
recognition.onresult = async (event) => {
    const transcript =
        event.results[event.results.length - 1][0].transcript.trim();
    logMessage(log, `User: ${transcript}`);

    // Process the text and get a response
    const response = await getChatbotResponse(transcript);
    logMessage(log, `Bot: ${response}`);

    // Convert the response to speech
    speak(response);
};

// Handle recognition errors
recognition.onerror = (event) => {
    logMessage(log, `Error occurred in recognition: ${event.error}`);
};

// Restart recognition on end
recognition.onend = () => {
    recognition.start();
};
