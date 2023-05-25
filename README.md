## API DOCUMENTATION
* [api-doc-link](http://cdkin-myfar-korb3zuwpr09-1788869907.us-east-1.elb.amazonaws.com/api-docs/#/records/post_records)
* you can login using this curl in postman: 
```shell
curl --location --request POST 'http://cdkin-myfar-korb3zuwpr09-1788869907.us-east-1.elb.amazonaws.com/security/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "userName": "user2", "password": "password2"
}'
```
#### Users
 `user: user2`, `password: password2`
 and
 `user: user1`, `password: password1`
 
## Requirements complete an important details.

####Security 

It's using JWT to autenticate API [createTokenLink](https://github.com/wavila88/TrueNorthBack/blame/master/src/controller/securityController.js#L14:~:text=const-,createToken,-%3D), [validateToken](https://github.com/wavila88/TrueNorthBack/blame/master/src/controller/securityController.js#L14:~:text=const-,validateToken,-%3D)

#### Infraestructure AWS

To demostrate AWS strengths I created infraestructure as code project.  You can refer to this project to see it in more detail [https://github.com/wavila88/trueNorth-infraestructure/](https://github.com/wavila88/trueNorth-infraestructure/)

* From this project we will with lambda function this lambda has permition to use 
SES (Amazom Simple Email Service) the code is not in this repo but there is **lambda code**:


## ARCHITECTURE BACK-END
![Back diagram drawio](https://github.com/wavila88/TrueNorthBack/assets/41836365/c9e56195-0407-4ae7-a2cd-e8012a835c83)

 

