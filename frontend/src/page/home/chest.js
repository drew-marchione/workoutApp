import { InnerPage } from "app.js";
import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {DialogService} from 'aurelia-dialog';
import {ChestModal} from "./chestModal";

let baseURL = "http://localhost:5000/api";
let getChestURL = baseURL + '/getChest';

@inject(DialogService, HttpClient)
export class Chest extends InnerPage {
    constructor(dialogService, httpClient) {
        super();
        this.chestExercises = [];
        this.dialogService = dialogService;
        this.http = httpClient; 
    }

    attached() {
        console.log("chest.js: attached");
        this.getChestExercises();
    }

    getChestExercises() {

        this.http.fetch(getChestURL)
            .then(response => response.json())
            .then(response => this.chestExercises = response)
            .then(response => console.log("Chest Array: ", this.chestExercises))

    }  

    add(selectedExerciseName) {

        console.log("Add: ", selectedExerciseName);
        let exerciseModalData = this.chestExercises.filter(x => x.name == selectedExerciseName)[0];
        console.log("add exercise", exerciseModalData);
        this.dialogService.open({ viewModel: ChestModal, model: exerciseModalData , lock: false });

    }

}