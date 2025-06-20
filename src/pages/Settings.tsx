import { useState, useEffect } from "react";
import { Mail, Bell, Palette, AlertTriangle, Crown, Shield, Sun, Moon, Monitor, User } from "lucide-react";
import Layout from '../components/Layout';
import { useTheme } from '../contexts/ThemeContext';

const NOTIFICATION_OPTIONS = [
  { label: "Bill reminders", key: "billReminders" },
  { label: "Budget alerts", key: "budgetAlerts" },
  { label: "Weekly summaries", key: "weeklySummaries" },
  { label: "Marketing updates", key: "marketingUpdates" },
];

export default function Settings() {
  const { theme, setTheme } = useTheme();
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
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 px-8 py-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-violet-100 dark:bg-violet-900/50 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <h2 className="font-bold text-xl text-gray-900 dark:text-gray-100">Account Settings</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Customize your experience and manage your account</p>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-8 space-y-8">
        
        {/* Appearance */}
        <section className="mb-8">
          <div className="flex items-center gap-2 font-semibold mb-3 text-gray-800 dark:text-gray-200">
            <Palette className="w-4 h-4 text-violet-600 dark:text-violet-400" />
            <span className="text-sm">Appearance</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { mode: "light", icon: Sun, label: "Light" },
              { mode: "dark", icon: Moon, label: "Dark" },
              { mode: "system", icon: Monitor, label: "System" }
            ].map(({ mode, icon: Icon, label }) => (
              <button
                key={mode}
                className={`flex flex-col items-center gap-1 py-3 px-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  theme === mode
                    ? "bg-violet-600 text-white shadow-lg scale-105"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-violet-50 dark:hover:bg-violet-900/30 hover:text-violet-700 dark:hover:text-violet-300 hover:scale-102"
                }`}
                onClick={() => setTheme(mode as typeof theme)}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Email */}
        <section className="mb-8">
          <div className="flex items-center gap-2 font-semibold mb-3 text-gray-800 dark:text-gray-200">
            <Mail className="w-4 h-4 text-violet-600 dark:text-violet-400" />
            <span className="text-sm">Email Address</span>
          </div>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={userEmail}
                  readOnly={!canEditEmail}
                  disabled={!canEditEmail}
                  className={`w-full py-3 px-4 rounded-lg border text-base transition-all duration-200 ${
                    canEditEmail 
                      ? "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-violet-500 focus:ring-2 focus:ring-violet-100 dark:focus:ring-violet-900/50 focus:outline-none" 
                      : "border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  }`}
                  onChange={(e) => canEditEmail && setUserEmail(e.target.value)}
                  placeholder="Enter your email address"
                />
                {isGoogleUser && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Shield className="w-4 h-4 text-blue-500" />
                  </div>
                )}
              </div>
              <button
                className={`px-6 py-3 font-medium rounded-lg transition-all duration-200 ${
                  canEditEmail
                    ? "bg-violet-600 hover:bg-violet-700 text-white shadow-md hover:shadow-lg transform hover:scale-105"
                    : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                }`}
                disabled={!canEditEmail}
              >
                {canEditEmail ? "Update" : "Locked"}
              </button>
            </div>
            <div className="flex items-center gap-2 text-xs">
              {isGoogleUser ? (
                <>
                  <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-full">
                    <Shield className="w-3 h-3" />
                    <span className="font-medium">Google Protected</span>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400">This email is managed by your Google account</span>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-1 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full">
                    <User className="w-3 h-3" />
                    <span className="font-medium">Editable</span>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400">You can update your email address</span>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Account Provider Info */}
        {isGoogleUser && (
          <section className="mb-8">
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Google Account Integration</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                    Your account is securely linked with Google. This provides enhanced security and seamless sign-in experience.
                  </p>
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Verified Email</span>
                    </div>
                    <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Secure Authentication</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                <Shield className="w-full h-full text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </section>
        )}

        {/* Notifications */}
        <section className="mb-8">
          <div className="flex items-center gap-2 font-semibold mb-3 text-gray-800 dark:text-gray-200">
            <Bell className="w-4 h-4 text-violet-600 dark:text-violet-400" />
            <span className="text-sm">Notifications</span>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
            {NOTIFICATION_OPTIONS.map((option, index) => (
              <label
                key={option.key}
                className={`flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 ${
                  index !== NOTIFICATION_OPTIONS.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    notifications[option.key as keyof typeof notifications] 
                      ? 'bg-green-500' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}></div>
                  <span className="text-gray-800 dark:text-gray-200 font-medium text-sm">{option.label}</span>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={notifications[option.key as keyof typeof notifications]}
                    onChange={() => handleNotificationChange(option.key)}
                    className="sr-only"
                  />
                  <div className={`w-11 h-6 rounded-full transition-colors duration-200 ${
                    notifications[option.key as keyof typeof notifications]
                      ? 'bg-violet-600'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}>
                    <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                      notifications[option.key as keyof typeof notifications]
                        ? 'translate-x-5 mt-0.5 ml-0.5'
                        : 'translate-x-0.5 mt-0.5'
                    }`}></div>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </section>

        {/* Pro Section */}
        <section className="mb-8">
          <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-2 border-dashed border-amber-200 dark:border-amber-800 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center">
                  <Crown className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-amber-900 dark:text-amber-100">Advanced Customization</h3>
                  <div className="bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200 text-xs font-bold px-2 py-1 rounded-full">
                    PRO
                  </div>
                </div>
                <p className="text-sm text-amber-700 dark:text-amber-300 mb-4">
                  Unlock custom themes, advanced notifications, detailed analytics, and export options to take full control of your financial tracking.
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs text-amber-600 dark:text-amber-400 mb-4">
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
                    <span>Custom Themes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
                    <span>Advanced Reports</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
                    <span>Data Export</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
                    <span>Priority Support</span>
                  </div>
                </div>
                <button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md">
                  Upgrade to Pro
                </button>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-24 h-24 opacity-5">
              <Crown className="w-full h-full text-amber-600 dark:text-amber-400" />
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section>
          <div className="flex items-center gap-2 font-semibold mb-3 text-red-600 dark:text-red-400">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm">Danger Zone</span>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-5">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-red-900 dark:text-red-100 mb-1">Delete Account</h4>
                <p className="text-sm text-red-700 dark:text-red-300 mb-4">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <button className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md border border-red-700">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}