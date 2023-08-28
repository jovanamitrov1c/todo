import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Select, Store } from '@ngxs/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tag } from 'src/app/models/tag.model';
import {
  AddIsDoneFilter,
  AddTagsFilter,
  AddTitleFilter,
  ResetFilters,
} from 'src/app/store/filter.actions';
import { TagState } from 'src/app/store/tag.state';

@Component({
  selector: 'app-filter-fields',
  templateUrl: './filter-fields.component.html',
  styleUrls: ['./filter-fields.component.scss'],
})
export class FilterFieldsComponent {
  @Select(TagState.tags)
  tags$: Observable<Tag[]>;

  @ViewChild('tagInput')
  tagInput: ElementRef<HTMLInputElement>;

  selectedTags$: BehaviorSubject<Tag[]>;

  separatorKeysCodes: number[] = [ENTER, COMMA];

  tagFilterControl: FormControl;
  titleFilterControl: FormControl;
  isDoneFilterControl: FormControl;

  constructor(private readonly store: Store) {
    this.selectedTags$ = new BehaviorSubject<Tag[]>([]);
    this.tagFilterControl = new FormControl();
    this.titleFilterControl = new FormControl();
    this.isDoneFilterControl = new FormControl();

    this.initFilters();
  }

  initFilters(): void {
    this.selectedTags$.subscribe((tags) => {
      const labels = tags.map(({ label }) => label);
      this.store.dispatch(new AddTagsFilter(labels));
    });
    this.titleFilterControl.valueChanges.subscribe((title) =>
      this.store.dispatch(new AddTitleFilter(title))
    );
    this.isDoneFilterControl.valueChanges.subscribe((done) => {
      this.store.dispatch(new AddIsDoneFilter(done));
    });
  }

  resetFilters() {
    this.store.dispatch(new ResetFilters());
    this.selectedTags$.next([]);
    this.tagFilterControl.setValue('');
    this.titleFilterControl.setValue('');
    this.isDoneFilterControl.setValue(false);
  }

  addTag(tag: Tag) {
    const updatedTags = [...this.selectedTags$.value, tag];
    this.selectedTags$.next(updatedTags);
  }

  removeTag(label: string) {
    const updatedTags = this.selectedTags$.value.filter(
      (tag) => tag.label !== label
    );
    this.selectedTags$.next(updatedTags);
  }

  remove(tag: Tag): void {
    const updatedTags = this.selectedTags$.value.filter(
      (_tag) => _tag.label !== tag.label
    );
    this.selectedTags$.next(updatedTags);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      const tag = { label: value };
      const updatedTags = [...this.selectedTags$.value, tag];
      this.selectedTags$.next(updatedTags);
    }

    event.chipInput!.clear();
    this.tagFilterControl.setValue(null);
  }

  selected(event: MatAutocompleteSelectedEvent) {
    const tag = { label: event.option.viewValue };

    const updatedTags = [...this.selectedTags$.value, tag];
    this.selectedTags$.next(updatedTags);

    this.tagInput.nativeElement.value = '';
    this.tagFilterControl.setValue(null);
  }
}
