import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class TeamsService {
  apiUrl = "http://localhost:4000/api";
  playerRoles = ["Bat", "Bowl", "All", "WK", "All", "All"];

  constructor(public http: HttpClient, private router: Router) {}

  getTeams(): Observable<any> {
    return this.http.get(`${this.apiUrl}/teams`);
  }

  getPlayersByTeam(teamId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/teams/${teamId}/players`);
  }

  getPlaying11ByUser(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user-player-positions/${userId}`);
  }

  savePlaying11(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/user-player-positions/bulk`, data);
  }
}
