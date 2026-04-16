import numpy as np
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import tensorflow as tf
from io import BytesIO
from PIL import Image
import base64

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


MODEL_PATH = "model.h5"
model = tf.keras.models.load_model(MODEL_PATH)

class PredictRequest(BaseModel):
    image: str

@app.post("/predict")
async def predict(req: PredictRequest):
    image_data = base64.b64decode(req.image.split(",")[-1])
    img = Image.open(BytesIO(image_data)).convert("L")  # Graustufen
    img = img.resize((28, 28))

    img.save("debug_input.png")

    arr = np.array(img).astype(np.float32) / 255.0
    arr = 1.0 - arr
    arr = arr.reshape(-1, 784)
    pred = model.predict(arr)
    pred_label = int(np.argmax(pred, axis=1)[0])
    return {"prediction": pred_label}



