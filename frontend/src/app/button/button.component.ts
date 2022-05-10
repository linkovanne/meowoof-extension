import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `<a href="https://en.wikipedia.org/wiki/Cats_%26_Dogs" target="_blank"
                class="ui-button">Into the wild</a>`,
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
