import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { PublishersContainerComponent } from "./components/publishers-container/publishers-container.component";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { NewPublisherFormComponent } from "./components/publishers-container/forms/new-publisher-form/new-publisher-form.component";

@NgModule({
    declarations: [AppComponent, PublishersContainerComponent, NewPublisherFormComponent],
    imports: [CommonModule, BrowserModule, ReactiveFormsModule ],
    bootstrap: [AppComponent],
    providers: [],
})export class AppModule { }