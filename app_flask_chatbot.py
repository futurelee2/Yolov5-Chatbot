from flask import Flask, request, render_template,jsonify
import torch
import os
from Chatbot.model.chatbot.kogpt2 import chatbot as ch_kogpt2
from werkzeug.exceptions import BadRequest
from kss import split_sentences
import json
from Yolov5.kakao import kakao_message_to_friends_location as kakao


count = 0
ultra_negative_words=['자살','죽고','죽이고','살인','지옥','천국']
app = Flask(__name__)

@app.route('/')
def hello():
    return render_template("chatbot.html")

@app.route('/res', methods=['POST'])
def ajax():
    data = request.get_json()
    text = data['messageText']
    global stopwords
    global count
    for i in range(len(ultra_negative_words)):
        if ultra_negative_words[i] in text:
            count += 1
            print(count)
            if count >= 3:
                kakao.send_message_to_friends()
                count = 0
    print(data)
    print(type(data),data['messageText'])
    answer = ch_kogpt2.predict(data['messageText'])
    return jsonify({
        "answer": answer
    })



if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True, port=int(os.environ.get("PORT", 5000)))

