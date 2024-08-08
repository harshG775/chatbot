export function logMessage(log, message) {
    const p = document.createElement("p");
    p.textContent = message;
    log.appendChild(p);
}
