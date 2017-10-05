import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {DialogController} from 'aurelia-dialog';
import {Notification} from 'aurelia-notification';
import "humane-js/themes/libnotify.css!";

let baseURL = "http://localhost:5000/api";
let addUserSelectedChestWorkoutURL = baseURL + '/userSelectedChestWorkout';

@inject(HttpClient, DialogController, Notification)

export class ChestModal {

    constructor(httpClient, controller, notification){
        this.controller = controller;
        this.http = httpClient;
        this.notification = notification;
        this.chestExercise = {};
        this.sets = 0;
        this.reps = 0;
        this.controller.settings.centerHorizontalOnly = true;
    }

    activate(chestExercise) {
        this.chestExercise = chestExercise;
        console.log("activate", this.chestExercise);
    }

    submit() {
        this.chestExercise.sets = parseInt(this.sets);
        this.chestExercise.reps = parseInt(this.reps);
        this.chestExercise.userID = parseInt(sessionStorage.userID);

        this.addUserSelection(this.chestExercise);

    }

    addUserSelection(chestExercise) {
        console.log("Add user's chest workout: ", chestExercise);

        this.http.fetch(addUserSelectedChestWorkoutURL, {
            method: 'post',
            body: json(chestExercise)
        })
        .then(response => {
                if (response.status == 200) {
                    this.notification.success('Successfully Added Exercise!');
                    console.log("HTTP Status Code", response.status);
                }
                else {
                    this.notification.error('Add Failed. Please Fill In All Fields.');
                    console.log("HTTP Status Code", response.status)
                }
            })
        .catch(error => {
                this.notification.error('Add Failed.');
                console.log("Server Error");
                })
    
    }

}