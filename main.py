from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

app = FastAPI()

# Mount the static folder
app.mount("/static", StaticFiles(directory="static"), name="static")

# Optional: cleaner route for download
@app.get("/download_resume", response_class=FileResponse)
async def download_resume():
    return FileResponse("static/resume.pdf", media_type='application/pdf', filename="resume.pdf")
