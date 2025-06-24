import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, distinct, Observable, mergeMap, toArray } from 'rxjs';
import { Apartment } from '../models/apartment';

@Injectable({
  providedIn: 'root'
})
export class ApartmentsService {
  private _url: string = 'https://data.gov.il/api/3/action/datastore_search?resource_id=d6d2046b-ccba-4d09-8778-ee9aa57cdf0c';
  private _http = inject(HttpClient);

  private _list$: BehaviorSubject<Apartment[]> = new BehaviorSubject<Apartment[]>([]);
  public get list$(): Observable<Apartment[]> {
    return this._list$ as Observable<Apartment[]>;
  }
  public get years$(): Observable<number[]> {
    return this._list$.pipe(
      map(apartments => Array.from(new Set(apartments.map(apartment => apartment.year))))
    );
  }

  constructor() {
    this.init().subscribe(apartments => {
      this._list$.next(apartments);
    });
  }

  private init(): Observable<Apartment[]> {
    return this._http.get<{ result: { records: Apartment[] } }>(this._url).pipe(map(x => x.result.records));
  }
}
