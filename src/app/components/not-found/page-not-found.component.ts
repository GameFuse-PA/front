import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-not-found',
    template: `<div class="flex-center"><img id="errorLogo" src="../../../assets/error404.jpg"></div>`,
    styles: ['div {height: 100vh} #errorLogo {margin: auto; margin-top: 10em}'],
})
export class PageNotFoundComponent implements OnInit{

  ngOnInit() {
    const audio = new Audio();
    audio.src = "assets/error404sound.mp3";
    audio.load();
    audio.play();
  }

}
