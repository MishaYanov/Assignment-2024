# Submission For Assignment

### This assignment was to create a MVC solution for a service that signs publishers and their domains

### To create this assignment I used Angular for the view, NestJs for the controller, Postgres with prisma on a Docker container

#### The link to the assignment is [GitHub](https://github.com/MishaYanov/Assignment-2024)
---

### How to Run it
---
#### Frontend
`npm i`

`ng serve` or `npm run start`

#### Backend
1. first create a .env file and copy the next database url, this is for prisma to connect to the URL

`DATABASE_URL="postgresql://browsi-admin:secure-password@localhost:5434/browsi-db?schema=public"`

2. next use docker to run my container: to init the container you can you the script `npm run db:dev:up` this will use the compose file to build the Postgres database

3. to migrate generate and migrate the tables and the initial data from prisma run the next command `prisma:dev:deploy`

4. finally start the backend   `npm run start:dev`
---

#### In the initial code were the edit view had errors:
1. both of the ad amount values were pointing on the same reference in the object
```
<div> Mobile Ads:</div>
  <input type="text" [(ngModel)]="_domain.mobileAds">
  <div> Desktop Ads:</div>
  <input type="text" [(ngModel)]="_domain.mobileAds">
```
2. There was a UX issue where the order of the view was and the edit was the opposite which can cause confusion if one is not paying attention
View
```
<div>Desktop Ads: {{domain.desktopAds}}</div>
<div>Mobile Ads: {{domain.mobileAds}}</div>
```
Edit
```
<div> Mobile Ads:</div>
  <input type="text" [(ngModel)]="_domain.mobileAds">
  <div> Desktop Ads:</div>
  <input type="text" [(ngModel)]="_domain.mobileAds">
```

### Hope You will Enjoy my submission.