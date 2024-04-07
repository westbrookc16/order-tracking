import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <ul>
        <div className="container mx-auto flex justify-between items-center">
          <li>
            <Link href="/">Home</Link>
          </li>
          <div>
            <li>
              <Link href="/clients">Clients</Link>
            </li>
            <li>
              <Link href="/clients/new">Add New Client</Link>
            </li>
            <li>
              <Link href="/order/new">Add New Order</Link>
            </li>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
          </div>
        </div>
      </ul>
    </nav>
  );
}
