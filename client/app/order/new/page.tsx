'use client';
import { useAuth } from '@clerk/nextjs';
import { getClients } from '@/actions/client';
import OrderForm from '@/components/orderForm';
import { useQuery } from '@tanstack/react-query';
import invariant from 'tiny-invariant';
export default function NewOrderPage() {
  const {
    data: clients,
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey: ['clients'],
    queryFn: () => {
      return getClients();
    },
  });
  const { userId } = useAuth();
  invariant(userId, 'User ID should be defined');
  return (
    <div className='bg-slate-200'>
      <div className='container mx-auto flex justify-center items-center flex-col'>
        <h1 className='font-semibold p-5 md:text-lg text-slate-800'>
          New Order
        </h1>
        {isError && (
          <div className='text-center text-red-500 text-lg font-semibold'>
            {error.message}
          </div>
        )}

        {isSuccess && (
          <OrderForm
            order={{
              name: '',
              id: undefined,
              clientId: undefined,
              updatedAt: undefined,
              description: '',
              clientDueDate: undefined,
              agencyDueDate: undefined,
              status: 'Pending',
              quantity: 1,

              createdAt: new Date(),

              userId: userId,
            }}
            clients={clients}
          />
        )}
      </div>
    </div>
  );
}
