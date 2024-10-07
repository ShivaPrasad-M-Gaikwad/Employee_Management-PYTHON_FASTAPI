from Password_API.passwordgen import generatepass as p
from Password_API.DataBase import Read,Readbyid,Deletebyid,Createbyid,Updatebyid
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI(redoc_url=None)

# origins = [
#     "http://localhost:5501",
# ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def Default_Route(request: Request):
    return  "Welcome"
    
@app.get("/api/Genpass")
def getpass():
    retpass = p(16)
    print(f"Default password generated")
    return {"password" : retpass}
    
@app.get("/api/Genpass/{size}")
def getpass(size: int):
    retpass = p(size)
    print(f"Custom length password generated of size : {size}")
    return {"password" : retpass}
#------------------------------------------------------------------------------
@app.get("/api/getdata/all")
def getdata():
    RES = Read()
    print(f"All data returned successfully!!!")
    return RES

@app.get("/api/getdata/{id}")
def getdata(id : int):
    RES = Readbyid(id)
    print(f"data of {id} returned successfully!!!")
    return RES

@app.post("/api/createdata/")
def Create(Names:str , job: str, salary: int):
    RES = Createbyid(Names,job,salary)
    print(f"Created Successfully!!!")
    return "Created Successfully!!!"

@app.put("/api/updatedata/{id}")
def Update(id: int, Names:str , job: str, salary: int):
    RES = Updatebyid(id,Names,job,salary)
    print(f"Updated Successfully!!!")
    return "Updated Successfully!!!"

@app.delete("/api/deletedata/{id}")
def Delete(id : int):
    RES = Deletebyid(id)
    print(f"Deleted Successfully!!!")
    return "Deleted Successfully!!!"

