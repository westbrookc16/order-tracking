'use client';
import useClerkQuery from '@/utils/useclerkquery';
import { DataTable } from '@/components/ui/dataTable';
import { columns } from './summaryColumns';

export default function Dashboard() {
  const getDashboard = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}dashboard`, {
      method: 'GET',
      headers: { 'Content-type': 'Application/JSON' },
    });
    const data = res.json();
    //setTotals(dashboard);
    return data;
  };
  const dashboardQuery = useClerkQuery(
    { queryKey: ['dashboard'] },
    `${process.env.NEXT_PUBLIC_API_URL}dashboard`
  );

  console.log(`data=${dashboardQuery.data}`);
  return (
    <div className='container mx-auto flex flex-col gap-5 h-screen'>
      <h1 className='py-5 font-semibold text-slate-800 text-lg'>Dashboard</h1>
      {dashboardQuery.data && (
        <DataTable columns={columns} data={dashboardQuery.data} />
      )}
    </div>
  );
}
