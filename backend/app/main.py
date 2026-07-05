from datetime import datetime, timezone

from fastapi import Depends, FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from sqlalchemy import Column, DateTime, Integer, String, Text, select
from sqlalchemy.orm import Session

from .database import Base, SessionLocal, engine


class Comment(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True)
    author_name = Column(String(80), nullable=False)
    content = Column(Text, nullable=False)
    attachment_url = Column(String(500))
    status = Column(String(20), nullable=False, default="pending", index=True)
    created_at = Column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
    )


class CommentCreate(BaseModel):
    author_name: str = Field(min_length=1, max_length=80)
    content: str = Field(min_length=1, max_length=5000)
    attachment_url: str | None = Field(default=None, max_length=500)


class CommentOut(BaseModel):
    id: int
    author_name: str
    content: str
    attachment_url: str | None
    created_at: datetime


app = FastAPI(title="My Blog API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.on_event("startup")
def create_tables():
    Base.metadata.create_all(bind=engine)


@app.get("/health")
def health():
    return {"ok": True}


@app.post("/api/comments", response_model=CommentOut, status_code=status.HTTP_201_CREATED)
def create_comment(payload: CommentCreate, db: Session = Depends(get_db)):
    comment = Comment(**payload.model_dump(), status="pending")
    db.add(comment)
    db.commit()
    db.refresh(comment)
    return comment


@app.get("/api/comments", response_model=list[CommentOut])
def list_comments(db: Session = Depends(get_db)):
    return db.scalars(
        select(Comment)
        .where(Comment.status == "approved")
        .order_by(Comment.created_at.desc())
    ).all()
