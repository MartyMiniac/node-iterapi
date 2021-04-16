# node-iterapi
This is a promise based node library of iterapi that provides you with the details available in the student portal of Institute of Technical Education and Research of Siksha 'O' Anusandhan University, Bhubaneshwar.


## How to Use
Following is a demo code flauting all the functions intended to be used by the end user and the syntax of using them:
<br>
```node
const Student = require('node-iterapi')

let s = new Student('your registration number here', 'your password here')

//you need to login first
s.login().then(() => {
	//after login you can execute any of the following commands
	
	//returns a json of all the profile information 
	s.info().then(res => {
		console.log(res)
	})
	
	//returns a json of the attendance of current semester
	s.getAttendance().then(res => {
		console.log(res)
	})
	
	//returns json of the basic result of all the semester you have given
	s.getResult().then(res => {
		console.log(res)
	})
	
	//returns json of detailed result consisting of all the subjects grades of the semester passed in as parameters
	s.getDetailedResult(semester).then(res => {
		console.log(res)
	})
})
```
