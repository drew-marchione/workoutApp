import {InnerPage} from "app.js";
import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {DialogService} from 'aurelia-dialog';
import {QuadsModal} from "./quadsModal";

let baseURL = "http://localhost:5000/api";
let getQuadsURL = baseURL + '/getQuads';

@inject(DialogService, HttpClient)
export class Quads extends InnerPage {
    constructor(dialogService, httpClient) {
        super();
        this.quadsExercises = [];
        this.dialogService = dialogService;
        this.http = httpClient; 
    }

    attached() {
        console.log("quads.js: attached");
        this.getQuadsExercises();
    }

  getQuadsExercises() {

    this.http.fetch(getQuadsURL)
        .then(response => response.json())
        .then(response => this.quadsExercises = response)
        .then(response => console.log("Quads Array: ", this.quadsExercises))

    
  }  

    add(selectedExerciseName) {

        console.log("Add: ", selectedExerciseName);
        let exerciseModalData = this.quadsExercises.filter(x => x.name == selectedExerciseName)[0];
        console.log("add exercise", exerciseModalData);
        this.dialogService.open({ viewModel: QuadsModal, model: exerciseModalData , lock: false });

    }

}