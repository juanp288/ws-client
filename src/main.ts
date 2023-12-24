import './style.css'
import { connectToServer } from './socket-client.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>Websocket - Client</h2>
 
    <span id="server-status">Estado: Offline</span>
    <br/>
		
    <input id="jwt-token" placeholder="Json Web Token" />
    <button id="btn-connect">Auth & Connect</button>
    
    <br/>
    <br/>
    <span id="clients-ul"></span>

    <form id="message-form">
      <input placeholder="message" id="message-input" />
    </form>

    <h3>Messages</h3>
    <ul id="messages-ul"></ul>
  </div>
`

const jwtToken = document.querySelector<HTMLInputElement>('#jwt-token')!;
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')!;

btnConnect.addEventListener('click', () => {
	if (jwtToken.value.trim().length <= 0) return alert('Enter a valid JWT');
	connectToServer(jwtToken.value.trim());
})