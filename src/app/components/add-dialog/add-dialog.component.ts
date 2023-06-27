import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';
import { getId } from 'src/app/util/id-generator';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss'],
})
export class AddDialogComponent implements OnInit, OnDestroy {
  todoForm: FormGroup;
  currentTodo: Todo;
  editMode: boolean;

  private _destroy$ = new Subject<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) { todo, isEdit }: any,
    private readonly dialogRef: MatDialogRef<AddDialogComponent>
  ) {
    this.todoForm = new FormGroup({
      title: new FormControl('', Validators.maxLength(50)),
      description: new FormControl('', Validators.maxLength(200)),
    });
    this.editMode = isEdit;
    isEdit ? this.populateFields(todo) : this.initTodo();
  }

  ngOnInit(): void {
    this.updateValue();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.todoForm.valid && this.dialogRef.close(this.currentTodo);
  }

  private updateValue() {
    this.todoForm.valueChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe(
        (values) => (this.currentTodo = { ...this.currentTodo, ...values })
      );
  }

  private initTodo(): void {
    this.currentTodo = {
      id: getId(),
      title: '',
      isDone: false,
      tags: [],
    };
  }

  private populateFields(todo: Todo) {
    this.currentTodo = todo;
    this.todoForm.patchValue({
      title: todo.title,
      description: todo.description,
    });
  }
}
