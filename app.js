import { logMessage } from "./modules/log.js";
import { getChatbotResponse } from "./modules/chatbotAPI.js";
import { speak } from "./modules/speech.js";

const logContainer = document.getElementById("logContainer");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");

// Initialize speech recognition
const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = false;
recognition.continuous = true;
recognition.lang = "en-US";

// Handle speech recognition results
recognition.addEventListener("result", async (e) => {
    try {
        const text = e.results[e.results.length - 1][0].transcript.trim();
        logMessage(logContainer, `USER:${text}`, "user");
        const response = await getChatbotResponse(text);
        if (response) {
            logMessage(logContainer, `BOT:${response}`, "bot");
            // // Convert the response to speech
            // speak(response);
        } else {
            console.log(" No response received.", "bot");
        }
    } catch (error) {
        console.log(error);
    }
});

// Add event listeners for start and stop buttons
startBtn.addEventListener("click", () => {
    recognition.start();
    console.log("log", "Conversation started.");
});
stopBtn.addEventListener("click", () => {
    recognition.stop();
    console.log("log", "Conversation stopped.");
});
// Optional: Automatically restart recognition on end if required
recognition.onend = () => {
    recognition.start();
    console.log("log", "Recognition ended.");
};
// Handle recognition errors
recognition.onerror = (event) => {
    console.log("log", `Error occurred in recognition: ${event.error}`);
};
