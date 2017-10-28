import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-translation-form',
  templateUrl: './translation-form.component.html',
  styleUrls: ['./translation-form.component.css']
})
export class TranslationFormComponent implements OnInit {
  inputText: string = '';

  constructor() { }

  ngOnInit() {
  }

  handleClick(): void {
    console.log(this.inputText);
  }
}
