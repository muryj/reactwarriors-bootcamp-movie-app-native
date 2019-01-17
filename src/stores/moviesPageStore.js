import {
  observable, action, values, reaction,
} from 'mobx';
import { Actions } from 'react-native-router-flux';
import CallApi from '../api/api';

const initialFilters = {
  sort_by: 'popularity.desc',
  primary_release_year: '2018',
  with_genres: [],
};
class MoviesPageStore {
  constructor() {
    reaction(
      () => this.filters.with_genres.length,
      () => {
        console.log(this.filters.sort_by);
        this.onChangePagination({ page: 1 });
        this.getMovies();
      },
    );
    reaction(
      () => values(this.filters),
      () => {
        console.log(this.filters.sort_by);
        this.onChangePagination({ page: 1 });
        this.getMovies();
      },
    );

    reaction(
      () => this.page,
      () => {
        this.getMovies();
      },
    );
  }

  @observable page = 1;

  @observable total_pages = '';

  @observable movies = [];

  @observable genresList = [];

  @observable isLoading = false;

  @observable filters = {
    sort_by: 'popularity.desc',
    primary_release_year: '2018',
    with_genres: [],
  };

  @action
  toggleFilters = () => {
    Actions.filters();
  };

  @action
  onChangePagination = ({ page, total_pages }) => {
    this.page = page;
    this.total_pages = total_pages;
  };

  @action
  onChangeFilters = (event) => {
    this.filters[event.target.name] = event.target.value;
  };

  @action
  onChangeGenres = (event) => {
    this.onChangeFilters({
      target: {
        name: 'with_genres',
        value: event.target.checked
          ? [...this.filters.with_genres, event.target.value]
          : this.filters.with_genres.filter(
            genre => genre !== event.target.value,
          ),
      },
    });
  };

  @action
  onClearFilters = () => {
    for (const key in initialFilters) {
      switch (key) {
        case 'with_genres':
          this.filters[key].clear();
          break;
        default:
          this.filters[key] = initialFilters[key];
      }
    }
    this.page = 1;
    this.total_pages = '';
  };

  @action
  getMovies = () => {
    this.isLoading = true;
    const { sort_by, primary_release_year, with_genres } = this.filters;
    const queryStringParams = {
      language: 'ru-RU',
      sort_by,
      page: this.page,
      primary_release_year,
    };

    if (with_genres.length > 0) { queryStringParams.with_genres = with_genres.join(','); }

    CallApi.get('/discover/movie', {
      params: queryStringParams,
    }).then((data) => {
      this.onChangePagination({
        page: data.page,
        total_pages: data.total_pages,
      });
      this.movies = data.results;
      this.isLoading = false;
    });
  };

  @action
  getGenres = () => {
    CallApi.get('/genre/movie/list', {
      params: {
        language: 'ru-RU',
      },
    }).then((data) => {
      this.genresList = data.genres;
    });
  };

  @action
  resetGenres = () => {
    this.onChangeFilters({
      target: {
        name: 'with_genres',
        value: [],
      },
    });
  };

  @action
  nextPage = () => {
    this.onChangePagination({
      page: this.page + 1,
      total_pages: this.total_pages,
    });
  };

  @action
  prevPage = () => {
    this.onChangePagination({
      page: this.page - 1,
      total_pages: this.total_pages,
    });
  };
}

export const moviesPageStore = new MoviesPageStore();
