import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { TasksModule } from './modules/tasks/tasks.module';
import { AppComponent } from './app.component';


@NgModule({
  // declarations are used to declare components, directives and pipes
  declarations: [
    AppComponent
  ],
  // import are used to import other modules
  imports: [
    BrowserModule,
    AppRoutingModule,
    TasksModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }