from flask import Flask, request, render_template,jsonify
import torch
import os
from model.chatbot.kogpt2 import chatbot as ch_kogpt2
from werkzeug.exceptions import BadRequest
from kss import split_sentences
import json


app = Flask(__name__)

@app.route('/')
def hello():
    return render_template("chatbot.html")

@app.route('/res', methods=['POST'])
def ajax():
    data = request.get_json()
    print(data)
    print(type(data),data['messageText'])
    answer = ch_kogpt2.predict(data['messageText'])
    return jsonify({
        "answer": answer
    })



if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True, port=int(os.environ.get("PORT", 5000)))

