import { InnerPage } from "app.js";
import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {DialogService} from 'aurelia-dialog';

@inject(DialogService, HttpClient)
export class Twitter extends InnerPage {
    constructor(dialogService, httpClient) {
        super();
        this.dialogService = dialogService;
        this.http = httpClient; 
        this.twitterFeedScript = "<script async src=\"//platform.twitter.com/widgets.js\" charset=\"utf-8\"></script>";
    }

    attached() {  
        $('body').append(this.twitterFeedScript);

    }
}