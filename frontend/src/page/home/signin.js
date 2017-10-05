import {HttpClient, json} from 'aurelia-fetch-client';
import { Router } from 'aurelia-router';
import {inject} from 'aurelia-framework';
import { InnerPage } from "app.js";
import {Notification} from 'aurelia-notification';
import "humane-js/themes/libnotify.css!";

let baseURL = "http://localhost:5000/api";
let signUpURL = baseURL + '/userSignUp';
let loginURL = baseURL + '/userLogin';
let loginInformationReturnedURL = baseURL + '/userLoginInformationReturned';

@inject(HttpClient,Router,Notification)
export class SignIn {

    constructor(httpClient,router,notification) {
        //super();
        this.http = httpClient;
        this.router = router;
        this.notification = notification;
        this.signUpFirstname = "";
        this.signUpLastname = "";
        this.signUpUsername = "";
        this.signUpPassword = "";
        this.loginUsername = "";
        this.loginPassword = "";
        this.signUpInformation = {};
        this.loginInformation = {};
        this.userInfo = [];
        this.signUpInfo = [];

    }

    attached() {
        console.log("Sign In Displayed");
        //this.notification.note('Plain');
        //this.notification.success('Record created successfully');
        //this.notification.info('New message');

    }

    flipper() {
        
        $('.flip').find('.card').toggleClass('flipped');
     
    }

    signUp() {
        console.log("Begin testing signup function")
        
        this.signUpInformation.firstname = this.signUpFirstname;
        this.signUpInformation.lastname = this.signUpLastname;
        this.signUpInformation.username = this.signUpUsername;
        this.signUpInformation.password = this.signUpPassword;

        this.http.fetch(signUpURL, {
            method: 'post',
            body: json(this.signUpInformation)
        })
            .then(response => {
                if (response.status == 200) {
                    console.log("HTTP Status Code", response.status)
                    this.notification.success('Successfully Signed Up! Please Log In!');
                }
                else if (response.status == 400) {
                    this.notification.error('Sign Up Failed. Username Already Exists.');
                    console.log("HTTP Status Code", response.status)
                }
                else if (response.status == 500) {
                    this.notification.error('Sign Up Failed.');
                    console.log("HTTP Status Code", response.status)
                }
            })
            .catch(error => {
                console.log("Server Error");
                this.notification.error('Sign Up Failed.');
            })

        console.log("End signup function")
    }

        /*
            .then(response => response.json())
            .then(response => this.signUpInfo = response)
            .then(response => {sessionStorage.setItem('userID', this.signUpInfo.userID)})
            .then(response => {sessionStorage.setItem('isLoggedIn', 'true')})
            .then(response => {sessionStorage.setItem('firstname', this.signUpInformation.firstname)})
            .then(response => {sessionStorage.setItem('lastname', this.signUpInformation.lastname)})
            .then(response => {sessionStorage.setItem('username', this.signUpInformation.username)})
            .then(response => {this.router.navigateToRoute('landingPage')})
            .catch(error => {
                console.log("error");
                this.notification.error('Login Failed. Invalid Username And/Or Password');

            })
        */




    login() {
        console.log("Begin login function")
        
        this.loginInformation.username = this.loginUsername;
        this.loginInformation.password = this.loginPassword;
       
        this.http.fetch(loginURL, {
            method: 'post',
            body: json(this.loginInformation)
        })
            .then(response => response.json())
            .then(response => {
                //console.log("Returned User ID: ", response.userID)
                this.getSessionInfo(response.userID)
                this.notification.success('Successfully Logged In');
            })
            .catch(error => {
                console.log("error");
                this.notification.error('Login Failed. Invalid Username And/Or Password');

            })

    }

    getSessionInfo(userID) {
        //console.log("Now send the user id back to return the user's credentials");
        var user = userID;

        this.http.fetch("http://localhost:5000/api/userLoginInformationReturned?userID="+user)
            .then(response => response.json())
            .then(response => this.userInfo = response)
            .then(response => {sessionStorage.setItem('userID', this.userInfo.user_id)})
            .then(response => {sessionStorage.setItem('isLoggedIn', 'true')})
            .then(response => {sessionStorage.setItem('firstname', this.userInfo.user_firstname)})
            .then(response => {sessionStorage.setItem('lastname', this.userInfo.user_lastname)})
            .then(response => {sessionStorage.setItem('username', this.userInfo.user_username)})
            .then(response => {console.log("User info returned at end of login functions: ", this.userInfo)})
            .then(response => {this.router.navigateToRoute('landingPage')})
            .catch(error => {
                console.log("error");
                this.notification.error('Login Failed. UserId Succesfully Returned But Something Went Wrong');
            })

    }


}