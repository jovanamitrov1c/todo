import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodoPageComponent } from './pages/todo-page/todo-page.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { AddDialogComponent } from './components/add-dialog/add-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { TodoState } from './store/todo.state';

@NgModule({
  declarations: [
    AppComponent,
    TodoPageComponent,
    TodoItemComponent,
    TodoListComponent,
    AddDialogComponent,
  ],
  imports: [
    NgxsModule.forRoot([TodoState]),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatMenuModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
