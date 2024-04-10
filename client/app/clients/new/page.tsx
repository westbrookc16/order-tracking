'use client';
import { ClientForm } from '@/components/clientForm';
import { client } from '@/types/client';

export default function ClientFormPage() {
  const client: client = {
    id: 0,
    name: '',
    description: '',
    isActive: true,
  };
  return (
    <div className='bg-slate-200 h-screen'>
      <div className='container mx-auto flex justify-center items-center flex-col p-5'>
        <h1 className='font-semibold p-2 md:text-lg text-slate-800'>
          New Client
        </h1>

        <ClientForm client={client} />
      </div>
    </div>
  );
}
