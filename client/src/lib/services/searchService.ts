import api from '../api';
import { SearchResults } from '../types';

export const searchService = {
  search: (query: string) => 
    api.get<SearchResults>('/search', { params: { q: query } })
}; 