const toggler = document.querySelector(".chatbot-toggler");
const chatbot = document.querySelector(".chatbot");
const chatbox = document.querySelector(".chatbox");
const sendBtn = document.getElementById("send-btn");
const textarea = document.querySelector("textarea");

// API Key and URL
const apiKey = "jXiMKDch4XGUssT6dErBW8CpYkOQLji9";
const apiUrl = "https://codestral.mistral.ai/v1/chat/completions";

// Event Listeners
toggler.addEventListener("click", () => {
  document.body.classList.toggle("show-chatbot");
});

sendBtn.addEventListener("click", () => {
  sendMessage();
});

textarea.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});

// Send Message Function
async function sendMessage() {
  const message = textarea.value;
  if (message.trim() !== "") {
    // Add user message to chatbox
    const outgoingMessage = document.createElement("li");
    outgoingMessage.classList.add("chat", "outgoing");
    outgoingMessage.innerHTML = `<p>${message}</p>`;
    chatbox.appendChild(outgoingMessage);

    // Send message to API
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: message,
        max_tokens: 256,
        temperature: 0.7,
      }),
    });

    // Get response from API
    const data = await response.json();
    const botResponse = data.choices[0].text;

    // Add bot response to chatbox
    const incomingMessage = document.createElement("li");
    incomingMessage.classList.add("chat", "incoming");
    incomingMessage.innerHTML = `<span class="material-symbols-outlined">smart_toy</span><p>${botResponse}</p>`;
    chatbox.appendChild(incomingMessage);

    // Scroll to bottom of chatbox
    chatbox.scrollTop = chatbox.scrollHeight;

    // Clear textarea
    textarea.value = "";
  }
}

// Initialize chatbox
chatbox.scrollTop = chatbox.scrollHeight;