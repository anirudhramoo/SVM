from fastapi import Request, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sklearn.svm import SVC

# class Point(BaseModel):
#     x:float
#     y:float
#     label:float


app = FastAPI()


origins = [
    "http://localhost:3000",
    "localhost:3000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.post("/")
async def points(request:Request):
    points=await request.json()
    examples=[]
    labels=[]

    for point in points:
        examples.append([float(point['x']),float(point['y'])])
        if (point['label']==True):
            labels.append(1)
        else:
            labels.append(0)

    model = SVC(kernel="linear")
    model.fit(examples, labels)
    accuracy=model.score(examples,labels)
    print(model.coef_[0])
    print(model.intercept_[0])
    return model.coef_[0][0],model.coef_[0][1],model.intercept_[0],accuracy