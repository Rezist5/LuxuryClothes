import { useEffect, useState } from 'react';
import { CartItem } from '@/lib/types';
import { cartService } from '@/lib/services/cartService';

export const CartView = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const response = await cartService.getCart();
      setCart(response.data);
    } catch (error) {
      console.error('Ошибка загрузки корзины:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (cartItemId: number) => {
    try {
      await cartService.removeFromCart(cartItemId);
      setCart(cart.filter(item => item.id !== cartItemId));
    } catch (error) {
      console.error('Ошибка удаления из корзины:', error);
    }
  };

  if (loading) return <div>Загрузка корзины...</div>;

  return (
    <div>
      <h2>Корзина</h2>
      {cart.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-4 border-b">
              <div>
                <h3>{item.product.name}</h3>
                <p>Количество: {item.quantity}</p>
                <p>Цена: {item.product.price * item.quantity}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500"
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 