import { InnerPage } from "app.js";
import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {DialogService} from 'aurelia-dialog';
import {BackModal} from "./backModal";

let baseURL = "http://localhost:5000/api";
let getBackURL = baseURL + '/getBack';
let addUserSelectedBicepsWorkoutURL = baseURL + '/userSelectedBicepsWorkout';

@inject(DialogService, HttpClient)
export class Back extends InnerPage {
    constructor(dialogService, httpClient) {
        super();
        this.backExercises = [];
        this.dialogService = dialogService;
        this.http = httpClient; 
    }

    attached() {
        console.log("back.js: attached");
        this.getBackExercises();
    }

    getBackExercises() {
        this.http.fetch(getBackURL)
            .then(response => response.json())
            .then(response => this.backExercises = response)
            .then(response => console.log("Back Array: ", this.backExercises))
    }  

    add(selectedExerciseName) {

        console.log("Add: ", selectedExerciseName);
        let exerciseModalData = this.backExercises.filter(x => x.name == selectedExerciseName)[0];
        console.log("add exercise", exerciseModalData);
        this.dialogService.open({ viewModel: BackModal, model: exerciseModalData , lock: false });

    }

 
}