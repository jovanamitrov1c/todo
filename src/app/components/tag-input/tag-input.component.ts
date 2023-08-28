import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Tag } from 'src/app/models/tag.model';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, combineLatest, map } from 'rxjs';
import { TagState } from 'src/app/store/tag.state';
import { Select, Store } from '@ngxs/store';
import { AddTag, DeleteTag } from 'src/app/store/tag.actions';

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

  filteredTags$: Observable<string[]>;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagControl: FormControl;

  constructor(private readonly store: Store) {
    this.tagControl = new FormControl('');
    this.filteredTags$ = combineLatest([this.tags$]).pipe(
      map(([tags]) =>
        tags
          .filter(
            (tag) =>
              !this.selectedTags.some(
                (selectedTag) => selectedTag.label === tag.label
              )
          )
          .map((tag) => tag.label)
      )
    );
  }

  remove(tag: Tag): void {
    this.store.dispatch(new DeleteTag(tag));
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
