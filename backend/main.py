from fastapi import FastAPI
from .routes import auth

app = FastAPI(title="CivicAI Backend")

# Register routes
app.include_router(auth.router)

@app.get("/")
async def root():
    return {"message": "Welcome to CivicAI Authentication API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
