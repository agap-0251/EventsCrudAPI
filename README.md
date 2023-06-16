# EventsCrudAPI
### This is a simple backend CRUD application designed with EXPRESSJS and MONGODB

## Instructions to use : 
```
git clone https://github.com/agap-0251/EventsCrudAPI.git
cd EventsCrudAPI
npm i
npm run dev or node server.js
```
Connect to your local mongodb server and test the application.
You can postman to test your APIs

# API
## Getting started 

## GET
To get details about an event based on eventId
```
http://localhost:3500/api/v3/app/events?id=event_id
Query Params
- id
- event_id
```
## GET
You can also get info about latest events and get events with limit.You can also skip few pages
```
http://localhost:3500/api/v3/app/events?type=latest&limit=5&page=1
Query Params
-type
-limit
=page
```
## POST
You can add an event by making a post request at /events endpoint.
This is a schema less backend application.So you can add or remove fields.
When event is successfully added to the database , you will receive the id of event created.
```
http://localhost:3500/api/v3/app/events
Body
raw (json)
View More
json
{   "type" : "event",
     "uid" : "18",
    "name" : "Share your thoughts",
    "image" : "image.png",
    "tagline" : "new year",
    "schedule" : "monday",
    "moderator" : "John",
    "description" : "best time to share your thoughts and get closer.",
    "category" : "Fun",
    "rigor_rank" : "2000",
    "attendees" : [1,2,3,4]
}
```
## PUT
Update the existing event info using event id.
Pass event id as the params at endpoint /events.
```
http://localhost:3500/api/v3/app/events/:id
Body
raw (json)
json
{
            "name": "event 71",
            "type": "hello there 61",
            "newSec": "temp 61"
}
```
## DELETE
Delete an event from the database using event id.
Pass event id as the params at endpoint /events.
```
http://localhost:3500/api/v3/app/events/:id
```

# Data Model
The data model for this API should be 
```
{   "type" : "event",
     "uid" : "18",
    "title" : "Share your thoughts",
    "image" : "image.png",
    "tagline" : "new year",
    "schedule" : "monday",
    "description" : "best time to share your thoughts and get closer.",
    "icon" : "icon.svg"

}

```

