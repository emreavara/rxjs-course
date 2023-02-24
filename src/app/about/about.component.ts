import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {
  interval,
  timer,
  fromEvent,
  Observable,
  noop,
  Subject,
  of,
  concat,
  merge,
} from "rxjs";
import { map, filter } from "rxjs/operators";
import { createHttpObservable } from "../common/util";

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

    /** ###############################
     *           CONCAT
     *  ###############################
     *
     *  Subscribes to the next observable only if current observable COMPLETES
     */

    // const source1$ = interval(1000); // Will not subscribe next source because it never completes
    // const source1$ = of(1, 2, 3);
    // const source2$ = of(4, 5, 6);
    // const source3$ = of(7, 8, 9);

    // const result$ = concat(source1$, source2$, source3$);
    // result$.subscribe(console.log);

    /** ###############################
     *           MERGE
     *  ###############################
     *
     * Subscribes to the next observable concurrently with the initial observable
     */

    const interval1$ = interval(1000);
    const interval2$ = interval1$.pipe(map((val) => 10 * val));

    const result$ = merge(interval1$, interval2$);

    result$.subscribe(console.log);
  }
}
