import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Apartment } from '../models/apartment';

@Injectable({
  providedIn: 'root'
})
export class ApartmentsService {
  private _url: string = 'https://data.gov.il/api/3/action/datastore_search?resource_id=d6d2046b-ccba-4d09-8778-ee9aa57cdf0c';
  private _http = inject(HttpClient);

  public getApartments(): Observable<Apartment[]> {
    return this._http.get<{ result: { records: Apartment[] } }>(this._url).pipe(map(x => x.result.records));
  }
}
