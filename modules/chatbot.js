import { logMessage } from "./log.js";
import { getChatbotResponse } from "./chatbotAPI.js";
import { speak } from "./speech.js";

const log = document.getElementById("log");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");

// Initialize speech recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = false;
recognition.continuous = true;
recognition.lang = "en-US";

// Handle speech recognition results
recognition.onresult = async (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript.trim();
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

// Add event listeners for start and stop buttons
startBtn.addEventListener("click", () => {
    recognition.start();
    logMessage(log, "Conversation started.");
});

stopBtn.addEventListener("click", () => {
    recognition.stop();
    logMessage(log, "Conversation stopped.");
});

// Optional: Automatically restart recognition on end if required
recognition.onend = () => {
    logMessage(log, "Recognition ended.");
};
