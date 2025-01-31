import { NgModule } from "@angular/core";
import {
  BrowserModule,
  provideClientHydration,
} from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { ButtonModule } from "primeng/button";
import { CheckboxModule } from "primeng/checkbox";
import { InputTextModule } from "primeng/inputtext";
import { MenubarModule } from "primeng/menubar";
import { ToastModule } from "primeng/toast";
import { AvatarModule } from "primeng/avatar";
import { AvatarGroupModule } from "primeng/avatargroup";
import { MenuModule } from "primeng/menu";
import { ListboxModule } from "primeng/listbox";
import { TreeModule } from "primeng/tree";
import {
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  DragDropModule,
} from "@angular/cdk/drag-drop";
import { TableModule } from "primeng/table";
import { DialogModule } from "primeng/dialog";
import { SelectModule } from "primeng/select";
import { BadgeModule } from "primeng/badge";
import { OverlayBadgeModule } from "primeng/overlaybadge";
import { SkeletonModule } from "primeng/skeleton";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { providePrimeNG } from "primeng/config";
import Aura from "@primeng/themes/aura";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { NavbarComponent } from "./navbar/navbar.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignupComponent } from "./signup/signup.component";
import { HomeComponent } from "./home/home.component";
import { FooterComponent } from "./footer/footer.component";
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { MessageService, TreeDragDropService } from "primeng/api";
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { TeamsPageComponent } from "./teams-page/teams-page.component";
import { PlayersPageComponent } from "./players-page/players-page.component";
import { IndianCurrencyRupeePipe } from "./pipes/indian-currency-rupee.pipe";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignInComponent,
    SignupComponent,
    HomeComponent,
    FooterComponent,
    TeamsPageComponent,
    PlayersPageComponent,
    IndianCurrencyRupeePipe,
    // IndianCurrencyPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    CheckboxModule,
    ToastModule,
    InputTextModule,
    MenubarModule,
    FormsModule,
    ReactiveFormsModule,
    AvatarModule,
    AvatarGroupModule,
    MenuModule,
    ListboxModule,
    TreeModule,
    DragDropModule,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    TableModule,
    DialogModule,
    SelectModule,
    BadgeModule,
    OverlayBadgeModule,
    SkeletonModule,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false || "none",
        },
      },
    }),
    provideHttpClient(withInterceptorsFromDi()),
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    TreeDragDropService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
