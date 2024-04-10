'use client';
import { ClientForm } from '@/components/clientForm';
import { useParams } from 'next/navigation';
//create a react hook form for client
import { useQuery } from '@tanstack/react-query';
import { getClient } from '@/actions/client';
import { client } from '@/types/client';
import invariant from 'tiny-invariant';

export default function ClientFormPage() {
  const { id } = useParams();
  invariant(id && typeof id === 'string', 'No id provided');

  const {
    data: client,
    isSuccess,
    isLoading,
  } = useQuery<client>({
    queryKey: ['clients', id],
    queryFn: () => getClient(id),
  });

  return (
    <div>
      <h1>Edit Client {client?.name}</h1>

      {isSuccess && <ClientForm client={client} />}
    </div>
  );
}
