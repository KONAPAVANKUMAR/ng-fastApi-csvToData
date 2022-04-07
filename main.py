from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import os
from io import BytesIO
import pandas as pd
import uvicorn
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/getcsvfileasjson")
async def upload():
    # get current directory
    fileDirectory = os.getcwd()
    # get all csv files from path
    files = [f for f in os.listdir(fileDirectory) if f.endswith(".csv")]
    file = files[0]
    df = pd.read_csv(file)
    return df.to_dict(orient='records')

uvicorn.run(app, host="localhost", port=8000)
