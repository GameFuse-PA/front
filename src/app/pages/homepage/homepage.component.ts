import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
    value = 'Hello World';

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.setBackgroundImages();
  }

  private setBackgroundImages() {
    const squares = this.elementRef.nativeElement.querySelectorAll('.square');
    const imageUrls = [
      'assets/cameraOn.png',
      'assets/cameraOff.png',
      'assets/soundOn.png',
      'assets/soundOff.png',
    ];

    for (let i = 0; i < squares.length; i++) {
      const square = squares[i];
      square.style.backgroundImage = `url(${imageUrls[i]})`;
    }
  }
}
