import os
from datetime import datetime, timedelta
from fastapi import APIRouter, HTTPException, status
import bcrypt
from jose import jwt
from ..database import users_collection
from ..schemas import UserSignup, UserLogin, TokenResponse
from bson import ObjectId

router = APIRouter(prefix="/auth", tags=["auth"])

# Password hashing settings are handled by bcrypt directly

# JWT configuration
SECRET_KEY = os.getenv("JWT_SECRET", "default_secret_key")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = 1

def hash_password(password: str) -> str:
    pwd_bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(pwd_bytes, salt)
    return hashed.decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@router.post("/signup", status_code=status.HTTP_201_CREATED)
async def signup(user: UserSignup):
    # Validate role
    if user.role not in ["admin", "public"]:
        raise HTTPException(status_code=400, detail="Role must be 'admin' or 'public'")
    
    # Check if email is unique
    existing_user = await users_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=409, detail="Email already registered")
    
    # Hash password and prepare document
    hashed_password = hash_password(user.password)
    user_doc = {
        "name": user.name,
        "email": user.email,
        "password": hashed_password,
        "role": user.role,
        "created_at": datetime.utcnow()
    }
    
    # Insert into MongoDB
    result = await users_collection.insert_one(user_doc)
    return {"user_id": str(result.inserted_id)}

@router.post("/login", response_model=TokenResponse)
async def login(user_credentials: UserLogin):
    user = await users_collection.find_one({"email": user_credentials.email})
    
    if not user or not verify_password(user_credentials.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Create JWT
    token_data = {"user_id": str(user["_id"]), "role": user["role"]}
    access_token = create_access_token(token_data)
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_id": str(user["_id"]),
        "role": user["role"]
    }
