from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from ..database import supabase
import uuid

router = APIRouter(prefix="/comments", tags=["Comments"])

class CommentCreate(BaseModel):
    report_id: str
    user_id: str
    content: str
    parent_id: Optional[str] = None

@router.post("/create")
async def create_comment(comment: CommentCreate):
    try:
        data = {
            "id": str(uuid.uuid4()),
            "report_id": comment.report_id,
            "user_id": comment.user_id,
            "content": comment.content,
            "parent_id": comment.parent_id,
            "created_at": datetime.utcnow().isoformat()
        }
        
        response = supabase.table("comments").insert(data).execute()
        
        if hasattr(response, 'error') and response.error:
            raise HTTPException(status_code=400, detail=str(response.error))
            
        return response.data[0]
    except Exception as e:
        print(f"Supabase Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{report_id}")
async def get_comments(report_id: str):
    try:
        response = supabase.table("comments")\
            .select("*")\
            .eq("report_id", report_id)\
            .order("created_at", desc=False)\
            .execute()
        
        if hasattr(response, 'error') and response.error:
            raise HTTPException(status_code=400, detail=str(response.error))
            
        return response.data
    except Exception as e:
        print(f"Supabase Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
