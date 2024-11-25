import { useState, useEffect } from 'react';
import { Profile } from '@/lib/types';
import { profileService } from '@/lib/services/profileService';

export const ProfileView = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await profileService.getProfile();
      setProfile(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (data: Partial<Profile>) => {
    try {
      const response = await profileService.updateProfile(data);
      setProfile(response.data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) return <div>Загрузка профиля...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (!profile) return <div>Профиль не найден</div>;

  return (
    <div>
      <h2>Профиль</h2>
      <div>
        <p>Имя: {profile.user.name}</p>
        <p>Email: {profile.user.email}</p>
        <p>Адрес: {profile.address}</p>
        <p>Телефон: {profile.phone}</p>
      </div>
    </div>
  );
}; 