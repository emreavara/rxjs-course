import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { interval, timer, fromEvent } from "rxjs";
@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  constructor() {}
  // Without RxJs

  /*
  ngOnInit() {
    // Nested callbacks will be triggered on each click event
    // Try to click and see multiple streams
    document.addEventListener('click', event => {
      console.log(event)
      setTimeout(()=>{
        console.log("finished...")
        // Continuous Streams
        let counter:number = 0;
        setInterval(()=>{
          console.log(counter)
          counter++;
        }, 1000)
      }, 3000)

    })
  }*/

  // With RxJs

  ngOnInit(): void {
    // Simple interval observable example

    // const interval$ = interval(1000);
    // interval$.subscribe(val => console.log("Stream 1: ",val))

    // interval$.subscribe(val => console.log("Stream 2: ",val))

    // Subscribe & Unsubscribe example

    // const interval$ = timer(3000, 1000);
    // const sub = interval$.subscribe((val) => console.log("Stream 1: ", val));

    // setTimeout(()=> sub.unsubscribe(), 5000)

    // const click$ = fromEvent(document, "click");
    // click$.subscribe(
    //   (event) => console.log(event),
    //   (err) => console.log(err),
    //   ()=> console.log("completed...")
    // );
  }
}
