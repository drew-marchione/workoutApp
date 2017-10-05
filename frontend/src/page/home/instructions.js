import { InnerPage } from "app.js";
import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {DialogService} from 'aurelia-dialog';

@inject(DialogService, HttpClient)
export class Instructions extends InnerPage {
    constructor(dialogService, httpClient) {
        super();
        this.dialogService = dialogService;
        this.http = httpClient; 
    }

    attached() {  

    }
}