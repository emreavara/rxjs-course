import { Component, OnInit } from "@angular/core";
import { Course } from "../model/course";
import {
  interval,
  Observable,
  of,
  timer,
  noop,
  Subject,
  throwError,
} from "rxjs";
import {
  catchError,
  delayWhen,
  map,
  retryWhen,
  shareReplay,
  tap,
  finalize,
} from "rxjs/operators";
import { createHttpObservable } from "../common/util";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  // Imperative Desing

  // beginnerCourses: Course[];
  // advancedCourses: Course[];

  // Reactive Design

  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor() {}

  ngOnInit() {
    // Imperative Design

    // const http$ = createHttpObservable("/api/courses");
    // const courses$ = http$.pipe(map((res) => Object.values(res["payload"])));
    // courses$.subscribe(
    //   (courses) => {
    //     this.beginnerCourses = courses.filter(
    //       (course) => course.category === "BEGINNER"
    //     );
    //     this.advancedCourses = courses.filter(
    //       (course) => course.category === "ADVANCED"
    //     );
    //   },
    //   noop,
    //   () => console.log("completed...")
    // );

    // Reactive Design
    const http$: Observable<Course[]> = createHttpObservable("/api/courses");

    const courses$ = http$.pipe(
      catchError((err) => {
        console.log("Error occured: ", err);
        return throwError(err);
      }),
      finalize(() => {
        console.log("Finalize executed...");
      }),
      tap(() => console.log("HTTP request executed!")),
      map((res) => Object.values(res["payload"])),
      shareReplay()
    ) as Observable<Course[]>;

    this.beginnerCourses$ = courses$.pipe(
      map((courses) =>
        courses.filter((course) => course.category === "BEGINNER")
      )
    );
    this.advancedCourses$ = courses$.pipe(
      map((courses) =>
        courses.filter((course) => course.category === "ADVANCED")
      )
    );

    // courses$.subscribe(
    //   (courses) => {
    //     this.beginnerCourses = courses.filter(
    //       (course) => course.category === "BEGINNER"
    //     );
    //     this.advancedCourses = courses.filter(
    //       (course) => course.category === "ADVANCED"
    //     );
    //   },
    //   noop,
    //   () => console.log("completed...")
    // );
  }
}
