var ws = new WebSocket("wss://ws.blockchain.info/inv"),
    api = "https://blockchain.info/es/rawtx/$tx_index&cors=true";
    
ws.onopen = function wsonopen(){
    
}

ws.onmessage = function wsonmessage(event) {
    console.log(event.data);
}

ws.onclose = function wsonclose() {
    
    
}
    
function onTransaction() {
    if (xhr.readyState === 4 && xhr.status > 100 && xhr.status < 400) {
        return transaction(JSON.parse(xhr.responseText));
    } else {
        // TODO: PROCESAR ERROR
    }
}

function transaction(transaction) {
}

function init() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = onTransaction;
    xhr.open('GET', api, true);
    xhr.send();
}