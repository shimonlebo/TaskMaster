import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './components/todos/todo-list/todo-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full', 
    component: TodoListComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
