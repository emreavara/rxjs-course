import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // Continuous Streams
    document.addEventListener('click', event => {
      console.log(event)
    })

    let counter:number = 0;

    // setInterval(()=>{
    //   console.log(counter)
    //   counter++;
    // }, 1000)

    setTimeout(()=>{
      console.log("finished...")
    }, 3000)

  }
}
