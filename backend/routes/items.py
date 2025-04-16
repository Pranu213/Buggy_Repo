from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient

app = FastAPI()

# ✅ Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (change in production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ MongoDB client
client = AsyncIOMotorClient("mongodb://localhost:27017")
db = client["itemdb"]
collection = db["items"]

# ✅ Item schema
class Item(BaseModel):
    name: str
    description: str

# ✅ POST: Add a new item
@app.post("/items")
async def add_item(item: Item):
    result = await collection.insert_one(item.dict())
    return {"message": "Item added successfully", "id": str(result.inserted_id)}

# ✅ GET: Fetch all items
@app.get("/items")
async def get_items():
    items = []
    async for item in collection.find():
        item["_id"] = str(item["_id"])  # Convert ObjectId to string
        items.append(item)
    return items
