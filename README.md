# TEAM GhostBustr

![layout](/public/homepage.png)

# User Story:
**As a Public User:**
- navigate through a list of haunted destinations.
- click on individual destinations to view information to the specific destination.
- sign up

**As a Logged in User:**
- log in
- navigate through a list of haunted destinations.
- click on individual destinations to view information to the specific destination.
- keep a list of the locations they've visted.
- review the haunted locations they've visited.
- log personal details and information of each visit they visited.
- edit and remove visited locations 
- create a a new location for other user's to see publicly
- sign out

# Routes Table:

| Endpoint         | Component | `AuthenticatedRoute`? |
|------------------|-------------------|-------|
| `/sign-up`       | `SignUp`    | No |
| `/sign-in`       | `SignIn`    | No |
| `/spookyplaces`  | `Index`     | No |
| `/spookyplaces/:placeId`  | `Show`| Yes |
| `/addPlace`      | `Create`   | Yes | 
| `/myvisits/:userId`  | `Index`| Yes |
| `/myvisits/:visitId`  | `Show`| Yes |
| `/change-password` | `ChangePassword`  | Yes |
| `/sign-out`        | `SignOut`   | Yes |
 

# Wireframe:
- Index page of all the haunted destinations:
![layout](/public/wireframeIndex.png)
- Show page:
![layout](/public/wireframeShow.png)
- Visited show page:
![layout](/public/VisitedShow.png)


# Approach Taken:
- create restful routes to be able to format an index, edit, show, and delete function
- use axios to pull in data from API to render to the client 
- format pages through react

# Installation Instructions:

- before cloning this repo, download to your local computer the fonts used (!https://velvetyne.fr/fonts/cantique/)
- fork and clone this repo
- ensure you have a `.gitignore` file with `node_modules` & `.env` dependencies listed inside (
.env
.env.local
.env.development.local
.env.test.local
.env.production.local)
- this app uses mongoDb and will need to be connected to designated hosts for the api and client (3000 and 8000 is what will be designated respectively in the clone)
- install dependencies with npm install
- ensure API is functioning by running `npm start` on both ports

# Tech Used:
- HTML
- Javascript
- React
- Boostrap
- CSS
- Axios
- MongoDB
- Mongoose
- will add more!