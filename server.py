from flask import Flask
app = Flask(__name__)

from flask import render_template
from flask import request

from collections import deque

messages = deque()

import sys
sys.path.append("./..")

#LADE AIML BOT
from aiml import Kernel
import sys

kern = Kernel()

brainLoaded = False
forceReload = True
while not brainLoaded:
    if forceReload or (len(sys.argv) >= 2 and sys.argv[1] == "reload"):
        kern.bootstrap(learnFiles="std-startup.xml", commands="load aiml b")
        brainLoaded = True
        kern.saveBrain("standard.brn")
    else:
        try:
            kern.bootstrap(brainFile="standard.brn")
            brainLoaded = True
        except:
            forceReload = True

messages.append(kern.respond("start"))


#BOT FERTIG

@app.route("/")
def hello():
    return app.send_static_file('chat-index.html') 

@app.route("/sendMessage", methods = ["POST"])
def sendMessage():
    print("rein")
    print(request.form["msg"])
    messages.append(kern.respond(request.form["msg"]))
    return "nachricht" 

@app.route("/getMessages", methods = ["GET"])
def getMessages():
    print("raus")
    if len(messages) > 0:
        return messages.popleft() 
    else:
        return ""

if __name__ == "__main__":
    app.run()

