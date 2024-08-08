async function getChatbotResponse(text) {
    const apiUrl = "YOUR_CHATBOT_API_ENDPOINT";
    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer YOUR_API_KEY`,
        },
        body: JSON.stringify({ query: text }),
    });
    const data = await response.json();
    return data.response;
}
