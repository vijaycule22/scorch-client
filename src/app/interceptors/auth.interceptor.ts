import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private excludedUrls: string[] = [
    "api/auth/login", // Adjust the paths based on your API structure
    "api/auth/signup",
  ];

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Check if the URL is in the excluded list
    const isExcluded = this.excludedUrls.some((url) =>
      request.url.includes(url)
    );

    if (isExcluded) {
      // Pass through without modifying the request
      return next.handle(request);
    }

    // Modify the request if not excluded (e.g., add Authorization header)
    const modifiedRequest = request.clone({
      setHeaders: {
        authorization: `Bearer ${this.getToken()}`,
      },
    });

    return next.handle(modifiedRequest);
  }

  private getToken(): string {
    // Replace this with your logic to retrieve the token
    // e.g., localStorage.getItem('token')
    let token = "";
    if (typeof window !== "undefined") {
      if (localStorage.getItem("token")) {
        token = localStorage.getItem("token") || "";
      }
    }
    return token;
  }
}
