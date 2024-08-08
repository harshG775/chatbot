export function logMessage(log, message, className) {
    const p = document.createElement("p");
    p.textContent = message;
    p.className = className;
    log.appendChild(p);
}
