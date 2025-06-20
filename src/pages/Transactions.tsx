import Layout from '../components/Layout';

const Transactions = () => (
  <Layout title="Transactions" subtitle="View and manage all your transactions">
    <div className="space-y-6">
      <div className="theme-card rounded-lg shadow p-6 theme-border border">
        <h2 className="text-xl font-semibold mb-4 theme-text">Recent Transactions</h2>
        <p className="theme-text-secondary">Here are your transactions.</p>
      </div>
    </div>
  </Layout>
);

export default Transactions;