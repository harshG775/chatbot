import { logMessage } from "./modules/log.js";
import { getChatbotResponse } from "./modules/chatbotAPI.js";
const logContainer = document.getElementById("logContainer");
const status = document.getElementById("status");

// Initialize speech recognition
const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.continuous = true;
recognition.lang = "en-US";

// Handle speech recognition results
recognition.addEventListener("result", async ({ results }) => {
    const isFinal = results[results.length - 1].isFinal;
    if (isFinal) {
        status.textContent = "Silenced";
        status.className = "status-Silenced";
        const arrayText = Array.from(results);
        const text = arrayText[arrayText.length - 1][0].transcript;
        try {
            logMessage(logContainer, `USER:${text}`, "user");
            const response = await getChatbotResponse(text);
            if (response) {
                logMessage(logContainer, `BOT:${response}`, "bot");
            } else {
                console.log(" No response received.", "bot");
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        status.textContent = "Speaking...";
        status.className = "status-Speaking";
    }
});

// initial start recognition
document.addEventListener("DOMContentLoaded", () => {
    recognition.start();
});
// Optional: Automatically restart recognition on end if required
recognition.onend = () => {
    setTimeout(() => recognition.start(), 1000);
    console.log("log", "Recognition ended.");
};
// Handle recognition errors
recognition.onerror = (event) => {
    console.log("log", `Error occurred in recognition: ${event.error}`);
};
