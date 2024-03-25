const message = document.querySelector("#message");

const room = document.querySelector("#room");
const clear = document.querySelector("#clear");

const content = document.querySelector(".content");
const sendMessage = document.querySelector(".send");

const roomButtom = document.querySelector("#room-button");

const socket = io();

socket.on("receive-msg", (message) => {
  displayMessage(message);
});

sendMessage.addEventListener("click", (e) => {
  socket.emit("send-message", message.value, room.value);

  displayMessage(message.value);

  message.value = "";
});

roomButtom.addEventListener("click", (e) => {
  e.preventDefault();
  socket.emit("join-room", room.value);
  displayMessage(room.value);
});

clear.addEventListener("click", (e) => {
  e.preventDefault();
  content.innerHTML = "";
});

const displayMessage = (message) => {
  const p = document.createElement("p");
  p.innerText = message;
  content.appendChild(p);
};
