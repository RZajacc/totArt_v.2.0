import TabsSection from '@/_components/userDashboard/DashboardNav/TabsSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'User dashboard',
};

function Account() {
  return (
    <>
      <div className="mx-auto mt-2 max-w-lg rounded-md bg-gradient-to-br from-green-300 to-green-500 p-2 shadow-md shadow-gray-800">
        <TabsSection />
      </div>
    </>
  );
}

export default Account;
