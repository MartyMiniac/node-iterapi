const axios = require('axios').default;

class Student {

    DOMAIN='http://103.112.27.37:8282'
    loginSuccessful=false
    urls = {
        login: this.DOMAIN+'/CampusPortalSOA/login',
        info: this.DOMAIN+'/CampusPortalSOA/studentinfo',
        regid: this.DOMAIN+'/CampusPortalSOA/studentSemester/lov',
        result: this.DOMAIN+'/CampusPortalSOA/stdrst',
        detailedResult: this.DOMAIN+'/CampusPortalSOA/rstdtl',
        attendance: this.DOMAIN+'/CampusPortalSOA/attendanceinfo'
    }
    config = {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        }
    }
    regId=''
    constructor(reg, password) {
        this.regno=reg;
        this.password=password;
    }

    login() {
        return new Promise( (resolve, reject) => {
            axios.post(this.urls.login, {
                'username': this.regno,
                'password': this.password,
                'MemberType': 'S'
            }, this.config)
            .then(response => {
                if(response.status==200) {
                    this.config.headers['cookie']=response.headers['set-cookie'][0].split(';')[0]
                    this.loginSuccessful=true
                    resolve(true)

                    this.getRegistrationId().then(regid => {
                        this.regId=regid
                    })
                }
                else {
                    reject(false)
                }
            })
            .catch(error => {
                reject(false)
            })
        })
    }

    info() {
        return new Promise((resolve, refuse) => {
            if(this.loginSuccessful) {
                axios.post(this.urls.info, {}, this.config)
                .then(response => {
                    resolve(response.data)
                })
                .catch(err => {
                    refuse(err)
                })
            }
            else {
                refuse('you need to login first')
            }
        })
    }

    getRegistrationId() {
        return new Promise((resolve, refuse) => {
            if(this.loginSuccessful) {
                axios.post(this.urls.regid, {}, this.config)
                .then(response => {
                    resolve(response.data['studentdata'][0]['REGISTRATIONID'])
                })
            }
            else {
                refuse('you need to login first')
            }
        })
    }

    getAttendance() {
        return new Promise((resolve, refuse) => {
            if(this.loginSuccessful) {
                axios.post(this.urls.attendance, {
                    registerationid: this.regId
                }, this.config)
                .then(response => {
                    resolve(response.data)
                })
                .catch(err => {
                    refuse(err)
                })
            }
            else {
                refuse('you need to login first')
            }
        })
    }

    getResult() {
        return new Promise((resolve, refuse) => {
            if(this.loginSuccessful) {
                axios.post(this.urls.result, {}, this.config)
                .then(response => {
                    resolve(response.data)
                })
                .catch(err => {
                    refuse(err)
                })
            }
            else {
                refuse('you need to login first')
            }
        })
    }

    getDetailedResult(sem) {
        return new Promise((resolve, refuse) => {
            if(this.loginSuccessful) {
                axios.post(this.urls.detailedResult, {
                    styno: String(sem)
                }, this.config)
                .then(response => {
                    resolve(response.data)
                })
                .catch(err => {
                    refuse(err)
                })
            }
            else {
                refuse('you need to login first')
            }
        })
    }
}

module.exports = Student;