import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgxsModule } from '@ngxs/store';

import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';

import { TodosModule } from './components/todos/todos.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { TodoState } from './components/todos/todo.state';

@NgModule({
  // declarations are used to declare components, directives and pipes
  declarations: [
    AppComponent
  ],
  // import are used to import other modules
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxsModule.forRoot([TodoState], {
      developmentMode: !environment.production
    }),
    TodosModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }