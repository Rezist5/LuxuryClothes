<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class ImageService
{
    public function uploadProductImage(UploadedFile $file, $folder = 'products')
    {
        try {
            // Создаем уникальное имя файла
            $fileName = uniqid() . '_' . time() . '.' . $file->getClientOriginalExtension();
            
            // Создаем изображение с помощью Intervention Image
            $image = Image::make($file);

            // Создаем оптимизированную версию
            $image->resize(800, null, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            });

            // Создаем путь для сохранения
            $path = $folder . '/' . $fileName;

            // Сохраняем изображение
            Storage::disk('public')->put($path, (string) $image->encode());

            // Создаем миниатюру
            $thumbnail = Image::make($file);
            $thumbnail->fit(200, 200);
            Storage::disk('public')->put(
                $folder . '/thumbnails/' . $fileName,
                (string) $thumbnail->encode()
            );

            return $path;

        } catch (\Exception $e) {
            \Log::error('Image upload failed: ' . $e->getMessage());
            throw new \Exception('Failed to upload image');
        }
    }

    public function deleteProductImage($path)
    {
        try {
            // Удаляем основное изображение
            Storage::disk('public')->delete($path);

            // Удаляем миниатюру
            $thumbnailPath = str_replace($path, 'thumbnails/' . basename($path), $path);
            Storage::disk('public')->delete($thumbnailPath);

        } catch (\Exception $e) {
            \Log::error('Image deletion failed: ' . $e->getMessage());
        }
    }
} 