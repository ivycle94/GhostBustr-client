# TEAM GhostBustr

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
- coming soon.

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