import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

from supabase import create_client, Client

# Load environment variables from .env file
current_dir = os.path.dirname(os.path.abspath(__file__))
env_path = os.path.join(current_dir, '.env')

if os.path.exists(env_path):
    load_dotenv(dotenv_path=env_path)
else:
    load_dotenv() 

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
CLIENT_NAME = "civicai_db"

client = AsyncIOMotorClient(MONGO_URI)
db = client[CLIENT_NAME]
users_collection = db["users"]
reports_collection = db["reports"]
votes_collection = db["votes"]

# Supabase initialization
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    supabase = None
else:
    try:
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    except Exception as e:
        print(f"Failed to initialize Supabase client: {e}")
        supabase = None

async def init_db():
    # Create geospatial index for location-based search
    await reports_collection.create_index([("location", "2dsphere")])
    # Create index for votes to ensure unique user per report
    await votes_collection.create_index([("user_id", 1), ("report_id", 1)], unique=True)
    print("Database indexes initialized.")
