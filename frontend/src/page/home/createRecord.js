import { InnerPage } from "app.js";
import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {Notification} from 'aurelia-notification';
import "humane-js/themes/libnotify.css!";

let baseURL = "http://localhost:5000/api";
let createRecordURL = baseURL + '/createRecord';

let getChestURL = baseURL + '/getChest';
let getShouldersURL = baseURL + '/getShoulders';
let getBackURL = baseURL + '/getBack';
let getTricepsURL = baseURL + '/getTriceps';
let getBicepsURL = baseURL + '/getBiceps';
let getQuadsURL = baseURL + '/getQuads';
let getHamstringsURL = baseURL + '/getHamstrings';
let getGlutesURL = baseURL + '/getGlutes';
let getCalvesURL = baseURL + '/getCalves';


@inject(HttpClient, Notification)
export class CreateRecord extends InnerPage {
    constructor(httpClient, notification) {
        super();
        this.http = httpClient;
        this.notification = notification;
        this.newExercise = {};
        this.muscleGroup = "Chest";
        this.exerciseName = "";
        this.videoLink = "";
        this.description = "";

        
    }

    attached() {

    }

    adminCreate() {

        this.newExercise.exerciseType = this.muscleGroup;
        this.newExercise.name = this.exerciseName;
        this.newExercise.videoLink = this.videoLink;
        this.newExercise.description = this.description;
        this.create(this.newExercise);

     } 
    
    create(newExercise) {
        console.log("Adding New Exercise: ", newExercise);

        this.http.fetch(createRecordURL, {
            method: 'post',
            body: json(newExercise)
        })
            .then(response => {
                if (response.status == 200) {
                    console.log("HTTP Status Code", response.status)
                    this.notification.success('Successfully Created Record!');
                }
                else if (response.status == 400) {
                    this.notification.error('Create Failed. Please Fill In All Fields!');
                    console.log("HTTP Status Code", response.status)
                }
                else if (response.status == 409) {
                    this.notification.error('Exercise Already Exists! Name Conflict!');
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
        }
    }