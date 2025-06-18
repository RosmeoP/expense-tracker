import Layout from '../components/Layout';

const Reports = () => (
  <Layout title="Reports" subtitle="View detailed financial reports and analytics">
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Financial Reports</h2>
        <p className="text-gray-600">View your reports here.</p>
      </div>
    </div>
  </Layout>
);

export default Reports;