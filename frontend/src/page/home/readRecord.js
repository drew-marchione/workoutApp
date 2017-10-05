import { InnerPage } from "app.js";
import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {DialogService} from 'aurelia-dialog';
import {Notification} from 'aurelia-notification';
import "humane-js/themes/libnotify.css!";
import {ReadRecordModal} from "./readRecordModal";

let baseURL = "http://localhost:5000/api";
let getChestURL = baseURL + '/getChest';
let getShouldersURL = baseURL + '/getShoulders';
let getBackURL = baseURL + '/getBack';
let getTricepsURL = baseURL + '/getTriceps';
let getBicepsURL = baseURL + '/getBiceps';
let getQuadsURL = baseURL + '/getQuads';
let getHamstringsURL = baseURL + '/getHamstrings';
let getGlutesURL = baseURL + '/getGlutes';
let getCalvesURL = baseURL + '/getCalves';


@inject(DialogService, HttpClient, Notification)
export class ReadRecord extends InnerPage {
    constructor(dialogService, httpClient, notification) {
        super();
        this.dialogService = dialogService;
        this.http = httpClient;
        this.notification = notification;
        this.exercises = [];
        this.muscleGroup = "Chest";
        this.exerciseName = "";
        this.videoLink = "";
        this.description = "";
    }

    attached() {

    }

    
    getExercises(muscleGroup) {
        if (muscleGroup == "Chest") {
            this.http.fetch(getChestURL)
                .then(response => response.json())
                .then(response => this.exercises = response)
                .then(response => console.log("Chest Array: ", this.exercises))
        }
        else if (muscleGroup == "Shoulders") {
            this.http.fetch(getShouldersURL)
                .then(response => response.json())
                .then(response => this.exercises = response)
                .then(response => console.log("Shoulders Array: ", this.exercises))
        }
        else if (muscleGroup == "Back") {
            this.http.fetch(getBackURL)
                .then(response => response.json())
                .then(response => this.exercises = response)
                .then(response => console.log("Back Array: ", this.exercises))
        }
        else if (muscleGroup == "Triceps") {
            this.http.fetch(getTricepsURL)
                .then(response => response.json())
                .then(response => this.exercises = response)
                .then(response => console.log("Triceps Array: ", this.exercises))
        }
        else if (muscleGroup == "Biceps") {
            this.http.fetch(getBicepsURL)
                .then(response => response.json())
                .then(response => this.exercises = response)
                .then(response => console.log("Biceps Array: ", this.exercises))
        }
        else if (muscleGroup == "Quads") {
            this.http.fetch(getQuadsURL)
                .then(response => response.json())
                .then(response => this.exercises = response)
                .then(response => console.log("Quads Array: ", this.exercises))
        }
        else if (muscleGroup == "Hamstrings") {
            this.http.fetch(getHamstringsURL)
                .then(response => response.json())
                .then(response => this.exercises = response)
                .then(response => console.log("Hamstrings Array: ", this.exercises))
        }
        else if (muscleGroup == "Glutes") {
            this.http.fetch(getGlutesURL)
                .then(response => response.json())
                .then(response => this.exercises = response)
                .then(response => console.log("Glutes Array: ", this.exercises))
        }
        else if (muscleGroup == "Calves") {
            this.http.fetch(getCalvesURL)
                .then(response => response.json())
                .then(response => this.exercises = response)
                .then(response => console.log("Calves Array: ", this.exercises))
        }

    }

    update(selectedExerciseName) {

        console.log("Read: ", selectedExerciseName);
        let exerciseModalData = this.exercises.filter(x => x.name == selectedExerciseName)[0];
        console.log("Read exercise", exerciseModalData);
        this.dialogService.open({ viewModel: ReadRecordModal, model: exerciseModalData , lock: false });
    }

}