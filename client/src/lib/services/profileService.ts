import api from '../api';
import { Profile } from '../types';

export const profileService = {
    getProfile: () => api.get<Profile>('/profile'),
    updateProfile: (data: Partial<Profile>) => api.put('/profile', data)
}; 