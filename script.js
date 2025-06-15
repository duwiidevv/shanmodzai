
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const input = document.querySelector("input");
  const chatContainer = document.querySelector(".chat-container");

  const apiUrl = "https://gemini-api-5k0h.onrender.com/gemini/chat";

  function addMessage(role, content) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", role);
    messageElement.textContent = content;
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userMessage = input.value.trim();
    if (!userMessage) return;

    addMessage("user", userMessage);
    input.value = "";
    addMessage("bot", "Sedang mengetik...");

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userMessage })
      });

      const result = await response.json();

      const botMessages = document.querySelectorAll(".bot");
      if (botMessages.length > 0) {
        botMessages[botMessages.length - 1].remove();
      }

      if (result.success && result.content) {
        addMessage("bot", result.content);
      } else {
        addMessage("bot", "[Gagal membaca respon dari AI]");
      }
    } catch (error) {
      const botMessages = document.querySelectorAll(".bot");
      if (botMessages.length > 0) {
        botMessages[botMessages.length - 1].remove();
      }
      addMessage("bot", "[Terjadi kesalahan jaringan atau server down]");
    }
  });
});
