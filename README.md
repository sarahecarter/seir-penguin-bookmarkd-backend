# Bookmark'd Project
#### By Sarah Carter, Bijan Saniee, and Matthew Laude

## DEPENDENCIES
- express
- mongoose
- cors
- morgan
- dotenv

## MODELS
Bookmark:
- title: string
- url: string
- description: string

## BACKEND ROUTE TABLE
| url | method | action |
|-----|--------|--------|
| /bookmark | get | getting all the bookmarks (index)||
| /bookmark | post | posting a new bookmark (create) |
| /bookmark/:id | put | updating a bookmark (update) |
| /bookmark/:id | delete | delete the bookmark (destroy) |