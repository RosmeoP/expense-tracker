import Layout from '../components/Layout';

const Goals = () => (
  <Layout title="Goals" subtitle="Set and track your financial goals">
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Your Financial Goals</h2>
        <p className="text-gray-600">Set and track your goals here.</p>
      </div>
    </div>
  </Layout>
);

export default Goals;