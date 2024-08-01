import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { JobStatus } from "@/lib/constants";

async function getDashboardData() {
  const customerCount = await prisma.customer.count();
  const activeJobCount = await prisma.job.count({
    where: {
      status: {
        in: [JobStatus.QUOTED, JobStatus.SCHEDULED, JobStatus.INSTALLED]
      }
    }
  });
  const availableComponentCount = await prisma.component.count({
    where: {
      status: 'AVAILABLE'
    }
  });

  return { customerCount, activeJobCount, availableComponentCount };
}

export default async function DashboardPage() {
  const { customerCount, activeJobCount, availableComponentCount } = await getDashboardData();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <DashboardCard title="Total Customers" value={customerCount} />
        <DashboardCard title="Active Jobs" value={activeJobCount} />
        <DashboardCard title="Available Components" value={availableComponentCount} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <QuickActionCard title="Customers" actions={[
          { label: "View All Customers", href: "/customers" },
          { label: "Add New Customer", href: "/customers/new" },
        ]} />
        <QuickActionCard title="Jobs" actions={[
          { label: "View All Jobs", href: "/jobs" },
          { label: "Create New Job", href: "/jobs/new" },
        ]} />
        <QuickActionCard title="Management" actions={[
          { label: "Manage Pricing Variables", href: "/pricing" },
          { label: "View Inventory", href: "/inventory" },
        ]} />
      </div>
    </div>
  );
}

function DashboardCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

function QuickActionCard({ title, actions }: { title: string; actions: { label: string; href: string }[] }) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="space-y-2">
        {actions.map((action, index) => (
          <Link key={index} href={action.href} className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            {action.label}
          </Link>
        ))}
      </div>
    </div>
  );
}