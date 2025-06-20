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
        <div className="theme-card rounded-2xl shadow-xl border overflow-hidden">
          {/* Header */}
          <div className="px-8 py-6 border-b" style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)'
          }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{
                backgroundColor: 'rgba(139, 92, 246, 0.2)'
              }}>
                <User className="w-5 h-5 text-violet-600" />
              </div>
              <div>
                <h2 className="font-bold text-xl theme-text">Account Settings</h2>
                <p className="text-sm theme-text-secondary">Customize your experience and manage your account</p>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-8 space-y-8">
        
        {/* Appearance */}
        <section className="mb-8">
          <div className="flex items-center gap-2 font-semibold mb-3 theme-text">
            <Palette className="w-4 h-4 text-violet-600" />
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
                    : "theme-card theme-button-hover hover:scale-102 border border-transparent"
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
          <div className="flex items-center gap-2 font-semibold mb-3 theme-text">
            <Mail className="w-4 h-4 text-violet-600" />
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
                  className={`w-full py-3 px-4 rounded-lg border text-base transition-all duration-200 theme-card ${
                    canEditEmail 
                      ? "focus:border-violet-500 focus:ring-2 focus:ring-violet-100 focus:outline-none" 
                      : "opacity-60 cursor-not-allowed"
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
                    : "opacity-60 cursor-not-allowed theme-card"
                }`}
                disabled={!canEditEmail}
              >
                {canEditEmail ? "Update" : "Locked"}
              </button>
            </div>
            <div className="flex items-center gap-2 text-xs">
              {isGoogleUser ? (
                <>
                  <div className="flex items-center gap-1 text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                    <Shield className="w-3 h-3" />
                    <span className="font-medium">Google Protected</span>
                  </div>
                  <span className="theme-text-secondary">This email is managed by your Google account</span>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    <User className="w-3 h-3" />
                    <span className="font-medium">Editable</span>
                  </div>
                  <span className="theme-text-secondary">You can update your email address</span>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Account Provider Info */}
        {isGoogleUser && (
          <section className="mb-8">
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900 mb-1">Google Account Integration</h3>
                  <p className="text-sm text-blue-700 mb-3">
                    Your account is securely linked with Google. This provides enhanced security and seamless sign-in experience.
                  </p>
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1 text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Verified Email</span>
                    </div>
                    <div className="flex items-center gap-1 text-blue-600">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Secure Authentication</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                <Shield className="w-full h-full text-blue-600" />
              </div>
            </div>
          </section>
        )}

        {/* Notifications */}
        <section className="mb-8">
          <div className="flex items-center gap-2 font-semibold mb-3 theme-text">
            <Bell className="w-4 h-4 text-violet-600" />
            <span className="text-sm">Notifications</span>
          </div>
          <div className="theme-card border rounded-xl overflow-hidden shadow-sm">
            {NOTIFICATION_OPTIONS.map((option, index) => (
              <label
                key={option.key}
                className={`flex items-center justify-between p-4 cursor-pointer hover:opacity-80 transition-colors duration-150 ${
                  index !== NOTIFICATION_OPTIONS.length - 1 ? 'border-b border-gray-200' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    notifications[option.key as keyof typeof notifications] 
                      ? 'bg-green-500' 
                      : 'bg-gray-400'
                  }`}></div>
                  <span className="theme-text font-medium text-sm">{option.label}</span>
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
                      : 'bg-gray-400'
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
          <div className="relative overflow-hidden border-2 border-dashed rounded-xl p-6" style={{
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(251, 146, 60, 0.1) 100%)',
            borderColor: 'rgba(245, 158, 11, 0.3)'
          }}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{
                  backgroundColor: 'rgba(245, 158, 11, 0.2)'
                }}>
                  <Crown className="w-6 h-6 text-amber-600" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold theme-text">Advanced Customization</h3>
                  <div className="bg-amber-200 text-amber-800 text-xs font-bold px-2 py-1 rounded-full">
                    PRO
                  </div>
                </div>
                <p className="text-sm theme-text-secondary mb-4">
                  Unlock custom themes, advanced notifications, detailed analytics, and export options to take full control of your financial tracking.
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs theme-text-secondary mb-4">
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
              <Crown className="w-full h-full text-amber-600" />
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section>
          <div className="flex items-center gap-2 font-semibold mb-3 text-red-600">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm">Danger Zone</span>
          </div>
          <div className="border rounded-xl p-5" style={{
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%)',
            borderColor: 'rgba(239, 68, 68, 0.3)'
          }}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.2)'
                }}>
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold theme-text mb-1">Delete Account</h4>
                <p className="text-sm theme-text-secondary mb-4">
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