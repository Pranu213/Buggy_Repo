from fastapi import FastAPI
from routes.items import router as items_router
from routes.analytics import router as analytics_router
from routes.quiz import router as quiz_router
from routes.users import router as users_router
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend to access backend (especially useful for JS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict to frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(items_router, prefix="/items")
app.include_router(analytics_router)
app.include_router(quiz_router)
app.include_router(users_router, prefix="/users", tags=["Users"])

# Serve static files (JS, CSS)
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/home")
async def get_home():
    return {"message": "Welcome to the Multi-Page FastAPI App!"}
