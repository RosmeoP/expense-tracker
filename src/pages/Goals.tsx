import Layout from '../components/Layout';

const Goals = () => (
  <Layout title="Goals" subtitle="Set and track your financial goals">
    <div className="space-y-6">
      <div className="theme-card rounded-lg shadow p-6 theme-border border">
        <h2 className="text-xl font-semibold mb-4 theme-text">Your Financial Goals</h2>
        <p className="theme-text-secondary">Set and track your goals here.</p>
      </div>
    </div>
  </Layout>
);

export default Goals;