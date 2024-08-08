export async function getChatbotResponse(text) {
    // Here you would typically send the text to your chatbot API and get the response
    // For demo purposes, we'll just echo the input
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`You said: ${text}`);
        }, 1000);
    });
}
