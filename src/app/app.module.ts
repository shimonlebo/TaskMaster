import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgxsModule } from '@ngxs/store';

import { TasksModule } from './modules/tasks/tasks.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { TaskState } from './modules/tasks/task.state';


@NgModule({
  // declarations are used to declare components, directives and pipes
  declarations: [
    AppComponent
  ],
  // import are used to import other modules
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot([TaskState], {
      developmentMode: !environment.production
    }),
    TasksModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }