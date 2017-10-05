import { InnerPage } from "app.js";
import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {DialogService} from 'aurelia-dialog';
import {TricepsModal} from "./tricepsModal";

let baseURL = "http://localhost:5000/api";
let getTricepsURL = baseURL + '/getTriceps';

@inject(DialogService, HttpClient)
export class Triceps extends InnerPage {
    constructor(dialogService, httpClient) {
        super();
        this.tricepsExercises = [];
        this.dialogService = dialogService;
        this.http = httpClient; 
    }

    attached() {
        console.log("triceps.js: attached");
        this.getTricepsExercises();
    }

    getTricepsExercises() {

        this.http.fetch(getTricepsURL)
            .then(response => response.json())
            .then(response => this.tricepsExercises = response)
            .then(response => console.log("Triceps Array: ", this.tricepsExercises))

    }  

    add(selectedExerciseName) {

        console.log("Add: ", selectedExerciseName);
        let exerciseModalData = this.tricepsExercises.filter(x => x.name == selectedExerciseName)[0];
        console.log("add exercise", exerciseModalData);
        this.dialogService.open({ viewModel: TricepsModal, model: exerciseModalData , lock: false });

    }

}