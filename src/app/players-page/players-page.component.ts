import { Component, Input, SimpleChanges } from "@angular/core";
import { MessageService, SelectItemGroup, TreeNode } from "primeng/api";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { TeamsService } from "../services/teams.service";

interface Country {
  name: string;
  code: string;
}

@Component({
  selector: "app-players-page",
  standalone: false,
  templateUrl: "./players-page.component.html",
})
export class PlayersPageComponent {
  @Input() players: any[] = [];
  @Input() playing11: any[] = [];
  @Input() isAdmin: boolean = false;
  @Input() teamId: any;
  @Input() userId: any;
  @Input() showPlaying11: boolean = false;
  savePlaying11Data: any = {};
  showSaveButton: boolean = false;

  constructor(
    public teamService: TeamsService,
    private messageService: MessageService
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes["teamId"]) {
      this.showSaveButton = false;

      console.log("Data changed:", changes["teamId"].currentValue);
      this.teamId = changes["teamId"].currentValue;
    }
    if (changes["previousValue"] !== changes["currentValue"]) {
      this.showPlaying11 = changes["showPlaying11"].currentValue;
      console.log("showPlaying11:", this.showPlaying11);
    }
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    this.updatePlaying11Positions();
    this.preparePlaying11Data();
  }

  private updatePlaying11Positions(): void {
    this.playing11.forEach((player: any, index: number) => {
      player.playing11_position = index + 1;
    });
  }

  private preparePlaying11Data(): void {
    this.showSaveButton = true;
    this.savePlaying11Data = {
      teamId: this.teamId,
      userId: this.userId,
      players: this.playing11.map((player: any, index: number) => ({
        playerId: player.id,
        playing11Position: index + 1,
      })),
    };
  }

  savePlaying11() {
    this.showPlaying11 = false;
    this.showSaveButton = false;
    this.teamService.savePlaying11(this.savePlaying11Data).subscribe({
      next: (response) => {
        console.log(response);
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: "Playing 11 saved successfully",
        });
        this.savePlaying11Data = {};
        this.showPlaying11 = true;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
