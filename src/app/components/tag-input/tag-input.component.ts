import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Tag } from 'src/app/models/tag.model';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, filter } from 'rxjs';
import { TagState } from 'src/app/store/tag.state';
import { Select, Store } from '@ngxs/store';
import { AddTag } from 'src/app/store/tag.actions';

@Component({
  selector: 'app-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.scss'],
})
export class TagInputComponent {
  @Input()
  selectedTags: Tag[] = [];

  @ViewChild('tagInput')
  tagInput: ElementRef<HTMLInputElement>;

  @Select(TagState.tags)
  tags$: Observable<Tag[]>;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagControl: FormControl;

  constructor(private readonly store: Store) {
    this.tagControl = new FormControl('');
  }

  remove(tag: Tag): void {
    this.selectedTags = this.selectedTags.filter(
      (_tag) => _tag.label !== tag.label
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      const tag = { label: value };
      this.selectedTags.push(tag);
      this.store.dispatch(new AddTag(tag));
    }

    event.chipInput!.clear();
    this.tagControl.setValue(null);
  }

  selected(event: MatAutocompleteSelectedEvent) {
    const tag = { label: event.option.viewValue };
    this.selectedTags.push(tag);
    this.tagInput.nativeElement.value = '';
    this.tagControl.setValue(null);
  }
}
