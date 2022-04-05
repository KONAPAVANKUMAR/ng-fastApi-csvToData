from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

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

@app.post("/api/upload")
async def upload(file: UploadFile = File(...)):
    contents = await file.read()
    buffer = BytesIO(contents)
    df = pd.read_csv(buffer)
    buffer.close()
    return df.to_dict(orient='records')

uvicorn.run(app, host="localhost", port=8000)