# 나에게 위치 템플릿으로 보내기

import kakao_utils

KAKAO_TOKEN_FILENAME = "./kakao_code.json" # "<kakao_token.json 파일이 있는 경로를 입력하세요.>"
KAKAO_APP_KEY = "6188bf2cdc11ad8bb911d6ef9e0bcd46"
tokens = kakao_utils.update_tokens(KAKAO_APP_KEY, KAKAO_TOKEN_FILENAME)

template = {
    "object_type": "location",
        "content": {
            "title": "흥국빌딩 2층 아시아경제 교육센터",
            "description": "흥국빌딩 2층 아시아경제 교육센터 위치입니다.",
            "image_url": "https://i.esdrop.com/d/f/NXl6YkfhTU/XQLAPVtc95.png",
            "image_width": 800,
            "image_height": 800,
            "link": {
                "web_url": "https://developers.kakao.com",
                "mobile_web_url": "https://developers.kakao.com/mobile",
                "android_execution_params": "platform=android",
                "ios_execution_params": "platform=ios"
            }
        },
        "buttons": [
            {
                "title": "웹으로 보기",
                "link": {
                    "web_url": "https://developers.kakao.com",
                    "mobile_web_url": "https://developers.kakao.com/mobile"
                }
            }
        ],
        "address": "서울 중구 퇴계로 166",
        "address_title": "흥국빌딩 2층 아시아경제 교육센터"
}

res = kakao_utils.send_message(KAKAO_TOKEN_FILENAME, template)
if res.json().get('result_code') == 0:
    print('텍스트 메시지를 성공적으로 보냈습니다.')
else:
    print('텍스트 메시지를 보내지 못했습니다. 오류메시지 : ', res.json())
