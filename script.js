
const chatBox = document.getElementById("chatBox");

async function sendMessage() {

  const userInput = document.getElementById("userInput");

  const message = userInput.value.trim();

  if (message === "") return;

  // User Message
  const userMessage = document.createElement("div");

  userMessage.classList.add("message", "user");

  userMessage.innerText = message;

  chatBox.appendChild(userMessage);

  userInput.value = "";

  // Bot Message
  const botMessage = document.createElement("div");

  botMessage.classList.add("message", "bot");

  botMessage.innerText = "Thinking...";

  chatBox.appendChild(botMessage);

  chatBox.scrollTop = chatBox.scrollHeight;

  try {

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyB9Qqha07-WnA9WrFPzSefFcL6SIT7CYUA",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: message
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log(data);

    const reply =
      data.candidates[0].content.parts[0].text;

    botMessage.innerText = reply;

  } catch (error) {

    console.log(error);

    botMessage.innerText =
      "Error connecting to Gemini AI";
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}
