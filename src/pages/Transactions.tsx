import Layout from '../components/Layout';

const Transactions = () => (
  <Layout title="Transactions" subtitle="View and manage all your transactions">
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <p className="text-gray-600">Here are your transactions.</p>
      </div>
    </div>
  </Layout>
);

export default Transactions;