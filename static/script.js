function appendHtml(el, str) {
  var div = document.createElement('div');
  div.innerHTML = str;
  while (div.children.length > 0) {
    el.appendChild(div.children[0]);
  }
}

function messageToHTML(msg, user){
  console.log(user);
  if (user == "deruser"){
    return '<li class="deruser"><div class="profilbild"><img src="http://webbucket.de/studo/cg/bender.jpg" draggable="false"/></div><div class="nachricht"><p>'+ msg +'</p></div></li>';
  }
  else {
    return '<li class="chatbot"><div class="profilbild"><img src="http://webbucket.de/studo/cg/prof.jpg" draggable="false"/></div><div class="nachricht"><p>'+ msg +'</p></div></li>';
  }
}

function addMessageToView(msg,user){
  console.log(document.getElementById("chat"));
  appendHtml(document.getElementById("chat"), messageToHTML(msg,user));
}

function sendMessage() {
  function reqListener () {
    console.log(this.responseText);
  }

  var msg = document.getElementById("dastextfeld").value;
  if (msg == "") return;
  document.getElementById("dastextfeld").value = "";

  var Req = new XMLHttpRequest();
  Req.addEventListener("load", reqListener);
  Req.open("POST", "/sendMessage");
  Req.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
  Req.send("msg=" + encodeURIComponent(msg));

  addMessageToView(msg,"deruser");

  setTimeout(getMessages,3000);
}

function getMessages() {
  function reqListener () {
    console.log(this.responseText);
    if(this.responseText != "")
      addMessageToView(this.responseText,"chatbot");
  }

  var Req = new XMLHttpRequest();
  Req.addEventListener("load", reqListener);
  Req.open("GET", "/getMessages");
  Req.send();

}

function keydown(e) {
  if (13 == e.keyCode) {
    sendMessage()
  }
}

document.addEventListener("DOMContentLoaded", function(event) {
  console.log("hodor");
  document.getElementById("derknopf").addEventListener("click", sendMessage);
  document.getElementById("dastextfeld").addEventListener("keypress", keydown);

  setTimeout(getMessages,2000);
});
