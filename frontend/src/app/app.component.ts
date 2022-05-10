import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  animals: FormGroup;

  constructor(fb: FormBuilder) {
    this.animals = fb.group({
      cats: false,
      dogs: false,
    });
  }
}
