import { inject, bindable, observable } from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {customJS} from '../../custom.js';
import { InnerPage } from "app.js";
import {EventAggregator} from 'aurelia-event-aggregator';
import {Notification} from 'aurelia-notification';
import "humane-js/themes/libnotify.css!";

let baseURL = "http://localhost:5000/api";
let deleteExerciseURL = baseURL + '/deleteExercise';

@inject(HttpClient,Notification,EventAggregator)
export class UserHome extends InnerPage { 
    constructor(httpClient,notification,eventAggregator){
        super();
        this.http = httpClient;
        this.notification = notification;
        this.eventAggregator = eventAggregator;
        this.userInfo = {};
        this.deleteInfo = {};
        this.userSelectedExercises = [];
        this.firstname = sessionStorage.firstname;
        this.lastname = sessionStorage.lastname;
        this.username = sessionStorage.username;

}  

    activate() {

        this.getUserWorkout(parseInt(sessionStorage.userID));
        //this.publish();

    }

    //publish() {
    //  var payload = {firstName: this.firstname, lastName: this.lastname };
        //this.eventAggregator.publish('user', payload);
    //}

    getUserWorkout(userID) {

            var user = userID;

            this.http.fetch("http://localhost:5000/api/userExercisesReturned?userID="+user)
                .then(response => response.json())
                .then(response => this.userSelectedExercises = response)
                .then(response => console.log("User Exercises returned: ", this.userSelectedExercises))
                .catch(error => {
                        console.log("error");
                        this.notification.error('Login Failed. hello Invalid Username And/Or Password');
                    })
                }

    delete(exerciseName,exerciseSets,exerciseReps) {

        this.deleteInfo.userID = parseInt(sessionStorage.userID);
        this.deleteInfo.name = exerciseName;
        this.deleteInfo.sets = exerciseSets;
        this.deleteInfo.reps = exerciseReps;

        console.log ("delete function: ", this.deleteInfo);

        this.http.fetch(deleteExerciseURL, {
            method: 'post',
            body: json(this.deleteInfo)
        })
            .then(response => {
                console.log(response.status)
                console.log(response)
                if (response.status == 200) {
                    this.notification.success('Successfully Deleted Exercise');
                    this.getUserWorkout(sessionStorage.userID);
                }
                else
                    this.notification.error('Delete Failed');
            })
        }

    attached() {
        console.log("userHome: attached");
        reloadSidebar();
    }

    }

