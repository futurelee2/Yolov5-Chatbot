// variables
let userName = null;
let state = 'SUCCESS';

 functions
////
//function greet() {
//    setTimeout(function () {
//        return sendMessage("Kochat 데모에 오신걸 환영합니다.", 'left');
//    }, 1000);
//
//    setTimeout(function () {
//        return sendMessage("오늘의 기분은 어떠신가요?", 'left');
//    }, 2000);
//}
//
//function setUserName(username) {
//
//    if (username != null && username.replace(" ", "" !== "")) {
//        setTimeout(function () {
//            return sendMessage("반갑습니다." + username + "님. 닉네임이 설정되었습니다.", 'left');
//        }, 1000);
//        setTimeout(function () {
//            return sendMessage("저는 각종 여행 정보를 알려주는 여행봇입니다.", 'left');
//        }, 2000);
//        setTimeout(function () {
//            return sendMessage("날씨, 미세먼지, 여행지, 맛집 정보에 대해 무엇이든 물어보세요!", 'left');
//        }, 3000);
//
//        return username;

//    } else {
//        setTimeout(function () {
//            return sendMessage("올바른 닉네임을 이용해주세요.", 'left');
//        }, 1000);
//
//        return null;
//    }
//}

function Message(arg) {
    this.text = arg.text;
    this.message_side = arg.message_side;

    this.draw = function (_this) {
        return function () {
            let $message;
            $message = $($('.message_template').clone().html());
            $message.addClass(_this.message_side).find('.text').html(_this.text);
            $('.messages').append($message);

            return setTimeout(function () {
                return $message.addClass('appeared');
            }, 0);
        };
    }(this);
    return this;
}
//
function getMessageText() {
    let $message_input;
    $message_input = $('.message_input');
    return $message_input.val();
}
////
function sendMessage(text, message_side) {
    let $messages, message;
    $('.message_input').val('');
    $messages = $('.messages');
    message = new Message({
        text: text,
        message_side: message_side
    });
    message.draw();
    $messages.animate({scrollTop: $messages.prop('scrollHeight')}, 300);
}

function onClickAsEnter(e) {
    if (e.keyCode === 13) {
        onSendButtonClicked()
    }
}



function requestChat(messageText) {
    var id = $('#id1').val();
    var password = $('#password1').val();
    var email = $('#email1').val();
    var postdata = {
                'messageText':messageText
            }
    $.ajax({
        url: "http://192.168.0.64:5000/res",
        type: "POST",

        data: JSON.stringify(postdata),
        dataType: "json",
        contentType: "application/json",

        success: function (data) {
            return sendMessage(data['answer'], 'left');
        },

        error: function (request, status, error) {
            console.log(error);
            return sendMessage('죄송합니다. 서버 연결에 실패했습니다.', 'left');
        }
    });
}
//

function onSendButtonClicked() {
    let messageText = getMessageText();
    sendMessage(messageText, 'right');


//    if (userName == null) {
//        userName = setUserName(messageText);
//
//    } else {
//        if (messageText.includes('안녕')) {
//            setTimeout(function () {
//                return sendMessage("안녕하세요. 저는 Kochat 여행봇입니다.", 'left');
//            }, 1000);
//        } else if (messageText.includes('고마워')) {
//            setTimeout(function () {
//                return sendMessage("천만에요. 더 물어보실 건 없나요?", 'left');
//            }, 1000);
//        } else if (messageText.includes('없어')) {
//            setTimeout(function () {
//                return sendMessage("그렇군요. 알겠습니다!", 'left');
//            }, 1000);
//
//
//        } else if (state.includes('REQUIRE')) {
//            return requestChat(messageText, 'fill_slot');
//        } else {
//            return requestChat(messageText, 'request_chat');
//        }
//    }
//}
    return requestChat(messageText);
}

