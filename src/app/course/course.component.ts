import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Course } from "../model/course";
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
  map,
  concatMap,
  switchMap,
  withLatestFrom,
  concatAll,
  shareReplay,
  exhaustMap,
  throttle,
  throttleTime,
} from "rxjs/operators";
import { merge, fromEvent, Observable, concat, interval, forkJoin } from "rxjs";
import { Lesson } from "../model/lesson";
import { createHttpObservable } from "../common/util";
import { debug, RxJsLoggingLevel, setRxJsLoggingLevel } from "../common/debug";

@Component({
  selector: "course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.css"],
})
export class CourseComponent implements OnInit, AfterViewInit {
  courseId: string;
  course$: Observable<Course>;
  lessons$: Observable<Lesson[]>;

  @ViewChild("searchInput", { static: true, read: ElementRef })
  input: ElementRef;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.courseId = this.route.snapshot.params["id"];
    this.course$ = createHttpObservable(`/api/courses/${this.courseId}`).pipe(
      debug(RxJsLoggingLevel.INFO, "course value")
    );

    const lessons$ = this.loadLessons();

    forkJoin(this.course$, lessons$)
      .pipe(
        tap(([course, lessons]) => {
          console.log("Course: ", course);
          console.log("Lessons: ", lessons);
        })
      )
      .subscribe();

    setRxJsLoggingLevel(RxJsLoggingLevel.DEBUG);
  }

  ngAfterViewInit() {
    this.lessons$ = fromEvent<any>(this.input.nativeElement, "keyup").pipe(
      map((event) => event.target.value),
      startWith(""),
      debounceTime(400),
      // throttleTime(500),
      distinctUntilChanged(),
      switchMap((search) => this.loadLessons(search))
      // debug(RxJsLoggingLevel.INFO, "search")
    );
    // const initialLessons$ = this.loadLessons();

    // this.lessons$ = concat(initialLessons$, searchLessons$);
    // this.lessons$.subscribe((lessons) => console.log("Lessons: ", lessons));
  }
  loadLessons(search = ""): Observable<Lesson[]> {
    return createHttpObservable(
      `/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`
    ).pipe(map((res) => res["payload"]));
  }
}
