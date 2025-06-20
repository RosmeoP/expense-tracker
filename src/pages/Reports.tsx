import Layout from '../components/Layout';

const Reports = () => (
  <Layout title="Reports" subtitle="View detailed financial reports and analytics">
    <div className="space-y-6">
      <div className="theme-card rounded-lg shadow p-6 theme-border border">
        <h2 className="text-xl font-semibold mb-4 theme-text">Financial Reports</h2>
        <p className="theme-text-secondary">View your reports here.</p>
      </div>
    </div>
  </Layout>
);

export default Reports;