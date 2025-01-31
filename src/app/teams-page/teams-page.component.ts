import { Component } from "@angular/core";
import { MessageService } from "primeng/api";
import { TeamsService } from "./teams.service";
import { AuthService } from "../services/auth.service";
import { firstValueFrom } from "rxjs";

@Component({
  selector: "app-teams-page",
  standalone: false,

  templateUrl: "./teams-page.component.html",
  styleUrl: "./teams-page.component.scss",
})
export class TeamsPageComponent {
  teams!: any[];
  visible: boolean = false;
  isAdmin: boolean = false;
  players: any[] = [];
  nonPlaying11: any[] = [];
  playing11: any[] = [];
  currentUser: any;
  playing11s: any[] = [];
  teamId!: any;
  showPlayersPage: boolean = false;
  showPlaying11: boolean = false;

  selectedTeam!: any;

  constructor(
    private teamService: TeamsService,
    private messageService: MessageService,
    private authservice: AuthService
  ) {}

  async ngOnInit() {
    console.log("init");
    await this.getTeams();
    this.currentUser = this.authservice.getCurrentUserData();
    console.log(this.playing11s);
  }

  async getPlaying11s() {
    try {
      this.teamService.getPlaying11ByUser(this.currentUser.id).subscribe({
        next: (response) => {
          this.playing11s = response;
          console.log(this.players);
          this.playing11s.map((player: any) => {
            if (player.team_id === this.teamId) {
              this.playing11[player.playing11_position - 1] =
                this.getPlayerById(player.player_id);
            }
          });
          this.showPlaying11 = true;
        },
        error: (error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.message,
          });
        },
      });
    } catch (error) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Something went wrong",
      });
    }
  }

  getPlayerById(id: any) {
    return this.players.find((player) => player.id === id);
  }

  async getTeams() {
    try {
      await this.teamService.getTeams().subscribe({
        next: (response) => {
          this.teams = [];
          this.teams = response;
        },
        error: (error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.message,
          });
        },
      });
    } catch (error) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Something went wrong",
      });
    }
  }

  selectProduct(product: any) {
    this.messageService.add({
      severity: "info",
      summary: "Product Selected",
      detail: product.name,
    });
  }

  addTeam() {
    console.log("add team");
  }

  async onTeamChange(event: any) {
    try {
      this.showPlayersPage = false;
      this.showPlaying11 = false;
      this.teamId = event.id;

      console.log(event);

      const playersData = await firstValueFrom(
        this.teamService.getPlayersByTeam(event.id)
      );

      this.players = playersData || [];
      this.playing11 = Array(11).fill(null);
      this.nonPlaying11 = [];

      this.players.forEach((player: any) => {
        if (
          player.is_playing11 &&
          player.playing11_position >= 1 &&
          player.playing11_position <= 11
        ) {
          this.playing11[player.playing11_position - 1] = player;
        } else {
          this.nonPlaying11.push(player);
        }
      });

      await this.getPlaying11s();

      this.showPlayersPage = true;
      console.log(this.playing11);
    } catch (error) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Something went wrong",
      });
    }
  }

  showDialog() {
    this.visible = true;
  }
}
