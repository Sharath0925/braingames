from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["brain_games_db"]
scores = list(db["scores"].find({}))

for s in scores:
    print(s)
