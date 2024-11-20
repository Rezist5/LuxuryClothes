<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'price' => 'required|numeric|min:0.01|max:999999.99',
            'condition' => 'required|string|in:new,like_new,good,fair',
            'brand' => 'required|string|max:255',
            'size' => 'required|string|max:50',
            'category_id' => 'required|exists:categories,id',
            'images.*' => 'image|mimes:jpeg,png,jpg|max:2048',
        ];
    }

    public function messages()
    {
        return [
            'price.min' => 'Цена должна быть больше 0',
            'price.max' => 'Цена не может превышать 999999.99',
            'images.*.max' => 'Размер изображения не должен превышать 2MB',
        ];
    }
} 