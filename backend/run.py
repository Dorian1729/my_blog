import os

import uvicorn

if __name__ == "__main__":
    print("Starting FastAPI server...")
    uvicorn.run(
        "app.main:app",
        host=os.getenv("HOST", "0.0.0.0"),
        port=int(os.getenv("PORT", "8000")),
        reload=True,
    )
