import { Component } from "@angular/core";
import { PrimeNG } from "primeng/config";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  standalone: false,
})
export class AppComponent {
  title = "auth-client";

  constructor(private primeng: PrimeNG) {}

  ngOnInit() {
    this.primeng.zIndex = {
      modal: 1100, // dialog, sidebar
      overlay: 1000, // dropdown, overlaypanel
      menu: 1000, // overlay menus
      tooltip: 1100, // tooltip
    };
  }
}
