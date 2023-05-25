# Welcome to back end project for TRUENORTH-APP.
This document contain back end requirments in **Code Challenge**

## API DOCUMENTATION
* Please refer to api Documentation [api-doc-link](http://cdkin-myfar-korb3zuwpr09-1788869907.us-east-1.elb.amazonaws.com/api-docs/#/records/post_records)
* To use the apis can login using this curl in postman: 
```shell
curl --location --request POST 'http://cdkin-myfar-korb3zuwpr09-1788869907.us-east-1.elb.amazonaws.com/security/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "userName": "user2", "password": "password2"
}'
```
* Users to authenticate
 `user: user2`, `password: password2`
 and
 `user: user1`, `password: password1`
 
## Requirements complete an important details.

* **Security:** It's using JWT to autenticate API [createTokenLink](https://github.com/wavila88/TrueNorthBack/blame/master/src/controller/securityController.js#L14:~:text=const-,createToken,-%3D), [validateToken](https://github.com/wavila88/TrueNorthBack/blame/master/src/controller/securityController.js#L14:~:text=const-,validateToken,-%3D)

* **Infraestructure AWS:**
To demostrate AWS strengths I created infraestructure as code project.  You can refer to this project to see it in more detail [https://github.com/wavila88/trueNorth-infraestructure/](https://github.com/wavila88/trueNorth-infraestructure/).

* It is using a [Dockerfile](https://github.com/wavila88/TrueNorthBack/blob/master/Dockerfile) to create and image and deploy it into ECR.

* **Use of serverless service and Python:** to call  https://www.random.org/clients , this app is calling a [lambda created in python](https://github.com/wavila88/LambdaTrueNorth), I know is not necessary but is just to show this knowledge.

* **Entities:** is using sequelize ORM to create database and also make a first load you can check in the following [link](https://github.com/wavila88/TrueNorthBack/blame/master/src/sql/repository/createDataBase.js#L5:~:text=5-,const,%7B,-5%20days%20ago)

* **Unit testing**: It´s using jest and mocha, it´s mocking apis [here is one example](https://github.com/wavila88/TrueNorthBack/blob/master/test/controller/loginTokenController.test.js).
this is other example mocking queries to database using **sinon** [link](https://github.com/wavila88/TrueNorthBack/blob/master/test/sql/repository/securityRepo.test.js)  

* **Cohesion example:** This application show high cohesion one example is [calculatorController](https://github.com/wavila88/TrueNorthBack/blob/master/src/controller/calculatorController.js) demonstrates good cohesion. It handles common operations such as addition, subtraction, multiplication, division, square root, and random number generation. Each function within the file has a clear purpose and focuses on performing a specific task related to these common operations. The file also includes functions for validating actions and creating database records.

By logically grouping all the common operations together in one file, it achieves cohesion. This approach makes the code easier to understand and maintain. The file has a single responsibility, promoting reusability and modularity.


## ARCHITECTURE BACK-END
This project demonstrates low coupling as it is divided into layers. We have a "repository" layer that interacts with the database, a "controller" layer that handles business logic, a "services" layer that makes requests to other APIs, and an "endpoint" layer that receives and responds to requests. This architectural approach showcases the benefits of low coupling.

![Back diagram drawio](https://github.com/wavila88/TrueNorthBack/assets/41836365/c9e56195-0407-4ae7-a2cd-e8012a835c83)

 

