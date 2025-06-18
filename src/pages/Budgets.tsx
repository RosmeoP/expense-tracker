import Layout from '../components/Layout';

const Budgets = () => (
  <Layout title="Budgets" subtitle="Manage your budgets and spending limits">
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Budget Management</h2>
        <p className="text-gray-600">Manage your budgets here.</p>
      </div>
    </div>
  </Layout>
);

export default Budgets;