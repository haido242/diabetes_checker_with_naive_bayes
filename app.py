from fastapi import FastAPI
from naive_bayes import predict as nb_predict, summarize_by_class, dataset
from pymongo import MongoClient
from fastapi.middleware.cors import CORSMiddleware
from bson import ObjectId
origins = [
    "*",
    "http://localhost:4200",
]
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["naivebayesinfo"]
collection = db["info"]

model = summarize_by_class(dataset)

@app.get("/")
async def root():
    # get all data from MongoDB
    data = collection.find().sort("_id", -1)
    # Convert ObjectId to string for serialization
    data_resp = [{**x, "_id": str(x["_id"])} for x in data]
    print("data: ", data_resp)
    return data_resp

@app.post("/predict")
async def predict(data: dict):
    #validate one of field data is not empty
    print("data: ", data)
    if data['prgnancies'] == '' or data['blood_pressure'] == '' or data['insulin'] == '' or data['diabetes'] == '' or data['gluco'] == '' or data['skin'] == '' or data['bim'] == '' or data['age'] == '' or data["prgnancies"] == None or data["blood_pressure"] == None or data["insulin"] == None or data["diabetes"] == None or data["gluco"] == None or data["skin"] == None or data["bim"] == None or data["age"] == None: 
        return {"message": "data is empty",
                "status" : "error"}

    if data is None:
        return {"message": "data is empty",
                "status" : "error"}
    
    #convert data json to list
    convertData = [float(data['prgnancies']), float(data['blood_pressure']), float(data['insulin']), float(data['diabetes']), float(data['gluco']), float(data['skin']), float(data['bim']), float(data['age'])]
    
    # Save newData to MongoDB
    saveData = {"prgnancies": data['prgnancies'], "blood_pressure": data['blood_pressure'], "insulin": data['insulin'], "diabetes": data['diabetes'], "gluco": data['gluco'], "skin": data['skin'], "bim": data['bim'], "age": data['age'], "result": nb_predict(model, convertData)}
    collection.insert_one(saveData)
    
    return {"prediction": nb_predict(model, convertData),
            "status" : "success"}
