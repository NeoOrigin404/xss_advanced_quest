// General URL settings
const url = document.location.search;
const params = new URLSearchParams(url);

// Fix vulnérabilité #1 - Sécurisation du paramètre name
const userParam = params.get("name");
let userName = "applicant";

if (userParam !== null) {
  // Utilisation de DOMPurify et textContent au lieu de innerHTML
  userName = DOMPurify.sanitize(userParam);
  const welcomeText = document.getElementById("welcome-text");
  const h1 = document.createElement("h1");
  h1.textContent = `How do you do, ${userName}?`;
  welcomeText.appendChild(h1);
}

// Fix vulnérabilité #2 - Sécurisation de l'input repas
const input = document.getElementById("fav-meal-question");
const log = document.getElementById("fav-meal-answer");

input.addEventListener("input", (e) => {
  // Utilisation de textContent au lieu de innerHTML
  log.textContent = e.target.value;
});

// Fix vulnérabilité #3 - Sécurisation de l'input HTML
const htmlInput = document.getElementById("html-input");
const htmlOutput = document.getElementById("html-output");
const showButton = document.getElementById("show-html");

showButton.addEventListener("click", () => {
  // Utilisation de DOMPurify pour permettre certaines balises HTML sûres
  htmlOutput.innerHTML = DOMPurify.sanitize(htmlInput.value, {
    ALLOWED_TAGS: ["b", "i", "em", "strong", "p", "br"],
    ALLOWED_ATTR: [],
  });
});

// Fix vulnérabilité #4 - Sécurisation de la redirection
const redir = params.get("goto");
if (redir !== null && redir !== "null") {
  // Validation de l'URL avec une whitelist de protocoles
  const url = new URL(redir, window.location.origin);
  const allowedProtocols = ["http:", "https:"];

  if (allowedProtocols.includes(url.protocol)) {
    document.location = url.href;
  }
}
