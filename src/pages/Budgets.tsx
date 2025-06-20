import Layout from '../components/Layout';

const Budgets = () => (
  <Layout title="Budgets" subtitle="Manage your budgets and spending limits">
    <div className="space-y-6">
      <div className="theme-card rounded-lg shadow p-6 theme-border border">
        <h2 className="text-xl font-semibold mb-4 theme-text">Budget Management</h2>
        <p className="theme-text-secondary">Manage your budgets here.</p>
      </div>
    </div>
  </Layout>
);

export default Budgets;