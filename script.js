
const chatBox = document.getElementById("chatBox");
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");

function addMessage(sender, text) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}`;
  messageDiv.textContent = text;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const input = userInput.value;
  if (!input) return;
  addMessage("user", input);
  userInput.value = "";

  try {
    const response = await fetch("https://gemini-api-5k0h.onrender.com/gemini/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    });

    const data = await response.json();
    const reply = data.content || data.message || data.result || "[Gagal membaca respon dari AI]";
    addMessage("bot", reply);
  } catch (err) {
    addMessage("bot", "[Terjadi kesalahan saat mengambil respon]");
  }
});
