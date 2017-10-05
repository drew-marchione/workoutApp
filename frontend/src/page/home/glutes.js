import {InnerPage} from "app.js";
import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {DialogService} from 'aurelia-dialog';
import {GlutesModal} from "./glutesModal";

let baseURL = "http://localhost:5000/api";
let getGlutesURL = baseURL + '/getGlutes';

@inject(DialogService, HttpClient)
export class Glutes extends InnerPage {
    constructor(dialogService, httpClient) {
        super();
        this.glutesExercises = [];
        this.dialogService = dialogService;
        this.http = httpClient; 
    }

    attached() {
        console.log("glutes.js: attached");
        this.getGlutesExercises();
    }

    getGlutesExercises() {

        this.http.fetch(getGlutesURL)
            .then(response => response.json())
            .then(response => this.glutesExercises = response)
            .then(response => console.log("Glutes Array: ", this.glutesExercises))

        
    }  

    add(selectedExerciseName) {

        console.log("Add: ", selectedExerciseName);
        let exerciseModalData = this.glutesExercises.filter(x => x.name == selectedExerciseName)[0];
        console.log("add exercise", exerciseModalData);
        this.dialogService.open({ viewModel: GlutesModal, model: exerciseModalData , lock: false });

    }

}