import { useState, useEffect } from "react";
import Layout from '../components/Layout';

const NOTIFICATION_OPTIONS = [
  { label: "Bill reminders", key: "billReminders" },
  { label: "Budget alerts", key: "budgetAlerts" },
  { label: "Weekly summaries", key: "weeklySummaries" },
  { label: "Marketing updates", key: "marketingUpdates" },
];

export default function Settings() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");
  const [notifications, setNotifications] = useState({
    billReminders: true,
    budgetAlerts: true,
    weeklySummaries: false,
    marketingUpdates: false,
  });
  const [userEmail, setUserEmail] = useState("");
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [canEditEmail, setCanEditEmail] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserEmail(user.email || "");
        
        // Check if user signed up with Google - multiple possible fields
        const isGoogle = !!(
          user.googleId || 
          user.provider === 'google' || 
          user.authProvider === 'google' ||
          user.isGoogleUser ||
          user.loginMethod === 'google' ||
          // Also check for Google profile picture URL as backup detection
          (user.profilePicture && user.profilePicture.includes('googleusercontent.com'))
        );
        
        setIsGoogleUser(isGoogle);
        setCanEditEmail(!isGoogle);
      } catch (error) {
        console.error('❌ Error parsing user data:', error);
        setUserEmail("");
        setIsGoogleUser(false);
        setCanEditEmail(true);
      }
    }
  }, []);

  const handleNotificationChange = (key: string) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };  return (
    <Layout title="Settings" subtitle="Manage your preferences, account, and notifications">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-10">
        
        {/* Appearance */}
        <section className="mb-8">
          <div className="font-semibold mb-2 text-sm">Appearance</div>
          <div className="flex gap-2">
            {["light", "dark", "system"].map((mode) => (
              <button
                key={mode}
                className={`flex-1 py-2 rounded-lg font-semibold text-sm transition
                  ${theme === mode
                    ? "bg-violet-600 text-white shadow"
                    : "bg-gray-100 text-gray-700 hover:bg-violet-50"}
                `}
                onClick={() => setTheme(mode as typeof theme)}
              >
                {mode === "light" && "🌞 Light"}
                {mode === "dark" && "🌙 Dark"}
                {mode === "system" && "🖥️ System"}
              </button>
            ))}
          </div>
        </section>

        {/* Email */}
        <section className="mb-8">
          <div className="font-semibold mb-2 text-sm">Email Address</div>
          <div className="flex gap-2">
            <input
              type="email"
              value={userEmail}
              readOnly={!canEditEmail}
              disabled={!canEditEmail}
              className={`flex-1 py-2 px-3 rounded-lg border text-base transition ${
                canEditEmail 
                  ? "border-gray-300 bg-white text-gray-900 focus:border-violet-500 focus:ring-1 focus:ring-violet-500" 
                  : "border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed"
              }`}
              onChange={(e) => canEditEmail && setUserEmail(e.target.value)}
            />
            <button
              className={`font-semibold rounded-lg px-5 transition ${
                canEditEmail
                  ? "bg-violet-600 hover:bg-violet-700 text-white shadow"
                  : "bg-violet-300 text-white cursor-not-allowed opacity-70"
              }`}
              disabled={!canEditEmail}
            >
              Update
            </button>
          </div>
          <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
            {isGoogleUser ? (
              <>
                <span className="text-blue-500">🔗</span>
                This email is linked to your Google account and cannot be changed.
              </>
            ) : (
              "You can update your email address here."
            )}
          </div>
        </section>

        {/* Account Provider Info */}
        {isGoogleUser && (
          <section className="mb-8">
            <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <span className="text-2xl">🔐</span>
              <div>
                <div className="font-semibold text-sm text-blue-900">
                  Google Account
                </div>
                <div className="text-xs text-blue-700">
                  You're signed in with your Google account. Account settings are managed by Google.
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Notifications */}
        <section className="mb-8">
          <div className="font-semibold mb-2 text-sm">Notifications</div>
          <div className="rounded-lg border border-gray-100 bg-gray-50 divide-y divide-gray-100">
            {NOTIFICATION_OPTIONS.map((option) => (
              <label
                key={option.key}
                className="flex items-center justify-between py-3 px-4 cursor-pointer hover:bg-gray-100 transition"
              >
                <span className="text-gray-700 text-sm">{option.label}</span>
                <input
                  type="checkbox"
                  checked={notifications[option.key as keyof typeof notifications]}
                  onChange={() => handleNotificationChange(option.key)}
                  className="w-5 h-5 accent-violet-600"
                />
              </label>
            ))}
          </div>
        </section>

        {/* Pro Section */}
        <section className="mb-8">
          <div className="flex items-center gap-3 bg-gray-100 border border-gray-200 rounded-lg p-4 text-gray-400">
            <span className="text-xl">🔒</span>
            <div>
              <div className="font-semibold text-sm">
                Advanced Customization (Pro)
              </div>
              <div className="text-xs">
                Custom themes, advanced notifications, and export options
              </div>
              <div className="text-xs text-violet-400 mt-1">
                Locked – Upgrade to Pro
              </div>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section>
          <div className="text-red-600 font-semibold mb-2 text-sm">
            Danger Zone
          </div>
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg py-2 w-full shadow transition"
          >
            Delete Account
          </button>
        </section>
      </div>
    </Layout>
  );
}