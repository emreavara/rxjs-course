import { Observable } from "rxjs";

export function createHttpObservable(url: string) {
  return Observable.create((observer) => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((body) => {
        observer.next(body);
        observer.complete();
        // observer.next(); // This will break the observable contract !!!
      })
      .catch((err) => {
        observer.error(err);
      });
  });
}
