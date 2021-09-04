# etark-assignment

<b>Problem Statement</b>:<br>
Create an api endpoint (/signup) that accepts name, email and password then creates and stores a user entry it in the database, to be noted password should be stored in the hashed format and email should be unique. An endpoint (/login) that accepts email and passwords, validates and returns user data with a jwt token. Finally an endpoint (/home) that takes nothing but jwt token as bearer token in header auth and responds with success on validation.

Api is deployed on heroku
baseURL: https://kunals-etark-assignment.herokuapp.com

Routes available:<br>
/<br>
/signup<br>
/login<br>
/home<br>
