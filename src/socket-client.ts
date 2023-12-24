import { Manager, Socket } from "socket.io-client";

let socket: Socket;

export const connectToServer = (token: string) => {
  const manager = new Manager("http://localhost:3000/socket.io/socket.io.js", {
    extraHeaders: { authentication: token },
  });

  socket?.removeAllListeners();
  socket = manager.socket("/");
  addListeners();
};

const addListeners = () => {
  const clientsUl = document.querySelector("#clients-ul")!;
  const messageForm = document.querySelector<HTMLFormElement>("#message-form")!;
  const messageInput =
    document.querySelector<HTMLFormElement>("#message-input")!;
  const messagesUl = document.querySelector("#messages-ul")!;
  const serverStatusLabel = document.querySelector("#server-status")!;

  socket.on("connect", () => {
    serverStatusLabel.innerHTML = "Estado: Online";
  });

  socket.on("disconnect", () => {
    serverStatusLabel.innerHTML = "Estado: Disconnect";
  });

  // clients-updated
  socket.on("clients-updated", (clients: string[]) => {
    // console.log({ clients });
    // let clientsHtml = '';
    // clients.forEach(client => {
    //     clientsHtml += `<li>${client}</li>`
    // })
    clientsUl.innerHTML = `En línea: ${clients.length}`;
  });

  messageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (messageInput.value.trim().length <= 0) return;

    console.log(messageInput.value);
    socket.emit("message-from-client", {
      id: "yo",
      message: messageInput.value,
    });

    messageInput.value = "";
  });

  socket.on(
    "message-from-server",
    (payload: { fullName: string; message: string }) => {
      const newMessage = `<li><strong>${payload.fullName}: </strong><span>${payload.message}</span></li>`;
      const li = document.createElement("li");
      li.innerHTML = newMessage;
      messagesUl.append(li);
    }
  );
};
