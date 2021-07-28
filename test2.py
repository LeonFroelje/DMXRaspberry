import requests
from base64 import *


header = {
    "Authorization": b"Basic " + b64encode(("f2f0f6c736554bc782ab8009760bf450" + ":" + "22c8d24214184f50819108ed97dd7ca5").encode())
}
body = {
    'Content-Type': 'application/x-www-form-urlencoded',
    "grant_type" : "client_credentials"
}

res = requests.post("https://accounts.spotify.com/api/token", headers=header, data=body)
access_token = res.json()["access_token"]

print(access_token)

r_head = {
    "Accept" : "application/json",
    "Content-Type" : "application/json",
    "Authorization" : "Bearer " + access_token
}

res = requests.get("https://api.spotify.com/v1/audio-analysis/0KzAbK6nItSqNh8q70tb0K", headers=r_head)
print(res.json()["beats"])