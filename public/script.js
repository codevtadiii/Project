const socket = io();

function joinRoom() {
    const room = document.getElementById('roomInput').value;
    if (room) {
        socket.emit('joinRoom', room);
        document.getElementById('room-container').style.display = 'none';
        document.getElementById('chat-container').style.display = 'block';
        document.getElementById('roomName').innerText = `Room: ${room}`;
    }
}

function sendMessage() {
    const message = document.getElementById('messageInput').value;
    const room = document.getElementById('roomName').innerText.split(': ')[1];
    if (message) {
        socket.emit('chatMessage', { room, message });
        document.getElementById('messageInput').value = '';
    }
}

socket.on('message', (message) => {
    const messages = document.getElementById('messages');
    const msgElement = document.createElement('div');
    msgElement.innerText = message;
    messages.appendChild(msgElement);
    messages.scrollTop = messages.scrollHeight;
});
