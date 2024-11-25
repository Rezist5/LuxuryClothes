'use client';

import { useEffect, useState } from 'react';
import { fetchDiscounts, deleteDiscount } from '@/lib/api';
import DiscountForm from '@/components/admin/discounts/DiscountForm';
import toast from 'react-hot-toast';

export default function DiscountsPage() {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState(null);

  const loadDiscounts = async () => {
    try {
      setLoading(true);
      const data = await fetchDiscounts();
      setDiscounts(data);
    } catch (error) {
      toast.error('Failed to load discounts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDiscounts();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this discount?')) {
      try {
        await deleteDiscount(id);
        toast.success('Discount deleted successfully');
        loadDiscounts();
      } catch (error) {
        toast.error('Failed to delete discount');
      }
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setSelectedDiscount(null);
    loadDiscounts();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Discounts</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
        >
          Create New Discount
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {selectedDiscount ? 'Edit Discount' : 'Create New Discount'}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setSelectedDiscount(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <DiscountForm
              discount={selectedDiscount}
              onSuccess={handleFormSuccess}
            />
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {discounts.map((discount: any) => (
              <tr key={discount.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {discount.code}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {discount.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {discount.type === 'percentage' ? `${discount.value}%` : `$${discount.value}`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    new Date(discount.expires_at) > new Date()
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {new Date(discount.expires_at) > new Date() ? 'Active' : 'Expired'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => {
                      setSelectedDiscount(discount);
                      setShowForm(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(discount.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}