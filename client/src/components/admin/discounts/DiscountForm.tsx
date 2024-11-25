'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { createDiscount, updateDiscount } from '@/lib/api';

interface DiscountFormProps {
  discount?: any;
  onSuccess: () => void;
}

export default function DiscountForm({ discount, onSuccess }: DiscountFormProps) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: discount || {
      code: '',
      type: 'percentage',
      value: '',
      starts_at: '',
      expires_at: '',
      minimum_purchase: '',
      maximum_uses: '',
    }
  });

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      if (discount) {
        await updateDiscount(discount.id, data);
        toast.success('Discount updated successfully');
      } else {
        await createDiscount(data);
        toast.success('Discount created successfully');
      }
      onSuccess();
    } catch (error) {
      toast.error('Failed to save discount');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Discount Code
        </label>
        <input
          type="text"
          {...register('code', { required: 'Code is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
        />
        {errors.code && (
          <p className="mt-1 text-sm text-red-600">{errors.code.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Type
        </label>
        <select
          {...register('type', { required: 'Type is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
        >
          <option value="percentage">Percentage</option>
          <option value="fixed">Fixed Amount</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Value
        </label>
        <input
          type="number"
          {...register('value', { required: 'Value is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="datetime-local"
            {...register('starts_at')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Expiry Date
          </label>
          <input
            type="datetime-local"
            {...register('expires_at')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Minimum Purchase
          </label>
          <input
            type="number"
            {...register('minimum_purchase')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Maximum Uses
          </label>
          <input
            type="number"
            {...register('maximum_uses')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? 'Saving...' : discount ? 'Update Discount' : 'Create Discount'}
      </button>
    </form>
  );
}