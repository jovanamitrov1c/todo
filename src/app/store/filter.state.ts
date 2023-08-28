import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Filter } from '../models/filter.model';
import {
  AddIsDoneFilter,
  AddTagsFilter,
  AddTitleFilter,
  ResetFilters,
} from './filter.actions';
import { Injectable } from '@angular/core';

const defaultState: Filter = {
  tags: [],
  title: '',
};

@State<Filter>({
  name: 'filter',
  defaults: defaultState,
})
@Injectable()
export class FilterState {
  @Action(AddTagsFilter)
  public addTagsFilter(
    { patchState }: StateContext<Filter>,
    { tags }: AddTagsFilter
  ) {
    patchState({ tags });
  }

  @Action(AddTitleFilter)
  public addTitleFilter(
    { patchState }: StateContext<Filter>,
    { title }: AddTitleFilter
  ) {
    patchState({ title });
  }

  @Action(AddIsDoneFilter)
  public addIsDoneFilter(
    { patchState }: StateContext<Filter>,
    { done }: AddIsDoneFilter
  ) {
    patchState({ isDone: done });
  }

  @Action(ResetFilters)
  public resetFilters({ patchState }: StateContext<Filter>) {
    patchState(defaultState);
  }

  @Selector()
  static filters(filters: Filter) {
    return filters;
  }
}
