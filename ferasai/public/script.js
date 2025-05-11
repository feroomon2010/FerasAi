async function sendMessage() {
  const input = document.getElementById('user-input');
  const chatBox = document.getElementById('chat-box');
  const userMessage = input.value;
  if (!userMessage) return;

  chatBox.innerHTML += `<div><strong>You:</strong> ${userMessage}</div>`;
  input.value = '';
  
  try {
    const response = await fetch('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage })
    });
    const data = await response.json();
    chatBox.innerHTML += `<div><strong>FerasGPT:</strong> ${data.reply}</div>`;
  } catch (error) {
    chatBox.innerHTML += `<div><strong>FerasGPT:</strong> Error connecting to server.</div>`;
  }
}
