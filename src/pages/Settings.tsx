import { useState, useCallback } from "react";
import { Settings, Mail, Bell, Palette, AlertTriangle, Crown } from "lucide-react";
import Layout from '../components/Layout';

// Types
interface User {
  email: string;
  id: string;
  isPro: boolean;
}

interface NotificationSettings {
  billReminders: boolean;
  budgetAlerts: boolean;
  weeklySummaries: boolean;
  marketingUpdates: boolean;
}

type ThemeMode = "light" | "dark" | "system";

interface NotificationOption {
  label: string;
  key: keyof NotificationSettings;
  description: string;
}

// Constants
const NOTIFICATION_OPTIONS: NotificationOption[] = [
  { 
    label: "Bill reminders", 
    key: "billReminders",
    description: "Get notified before your bills are due"
  },
  { 
    label: "Budget alerts", 
    key: "budgetAlerts",
    description: "Alerts when you're approaching budget limits"
  },
  { 
    label: "Weekly summaries", 
    key: "weeklySummaries",
    description: "Weekly overview of your financial activity"
  },
  { 
    label: "Marketing updates", 
    key: "marketingUpdates",
    description: "Updates about new features and promotions"
  },
];

const THEME_OPTIONS = [
  { value: "light" as const, label: "Light", icon: "🌞", description: "Light theme" },
  { value: "dark" as const, label: "Dark", icon: "🌙", description: "Dark theme" },
  { value: "system" as const, label: "System", icon: "🖥️", description: "Follow system preference" },
];

// Get user data from localStorage or context
const getUserFromStorage = (): User => {
  try {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      return JSON.parse(storedUser);
    }
  } catch (error) {
    console.error('Error parsing user data:', error);
  }
  
  // Fallback user data
  return { 
    email: "user@example.com", 
    id: "user-123",
    isPro: false 
  };
};

// Styles
const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f6f7fb 0%, #eef2ff 100%)",
    padding: "32px 16px",
    boxSizing: "border-box" as const,
  },
  card: {
    maxWidth: 700,
    margin: "0 auto",
    background: "#fff",
    borderRadius: 20,
    boxShadow: "0 8px 32px rgba(80, 80, 120, 0.12)",
    padding: "clamp(24px, 5vw, 48px)",
    border: "1px solid rgba(255, 255, 255, 0.8)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    fontSize: 28,
    fontWeight: 700,
    marginBottom: 8,
    color: "#2d225a",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    color: "#6b7280",
    marginBottom: 40,
    fontSize: 16,
    lineHeight: "1.5",
  },
  section: {
    marginBottom: 40,
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontWeight: 600,
    marginBottom: 16,
    fontSize: 16,
    color: "#374151",
  },
  themeGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 12,
  },
  themeButton: (isSelected: boolean) => ({
    padding: "16px 12px",
    borderRadius: 12,
    border: isSelected ? "2px solid #7c3aed" : "2px solid #e5e7eb",
    background: isSelected ? "#f3f4f6" : "#fff",
    color: "#2d225a",
    fontWeight: isSelected ? 600 : 500,
    fontSize: 14,
    cursor: "pointer",
    transition: "all 0.2s ease",
    textAlign: "center" as const,
    outline: "none",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: 8,
  }),
  emailContainer: {
    display: "flex",
    gap: 12,
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
  },
  emailInput: {
    flex: 1,
    minWidth: "250px",
    padding: "14px 16px",
    borderRadius: 10,
    border: "2px solid #e5e7eb",
    fontSize: 16,
    background: "#f8fafc",
    color: "#6b7280",
    outline: "none",
    transition: "border-color 0.2s ease",
  },
  button: (variant: "primary" | "secondary" | "danger" = "primary") => ({
    background: variant === "danger" ? "#dc2626" : variant === "primary" ? "#7c3aed" : "#6b7280",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "14px 24px",
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
    transition: "all 0.2s ease",
    outline: "none",
    display: "flex",
    alignItems: "center",
    gap: 8,
    justifyContent: "center",
    whiteSpace: "nowrap" as const,
  }),
  notificationContainer: {
    borderRadius: 12,
    overflow: "hidden",
    border: "1px solid #e5e7eb",
    background: "#fff",
  },
  notificationItem: (isLast: boolean) => ({
    display: "flex",
    alignItems: "flex-start",
    padding: "18px 20px",
    borderBottom: isLast ? "none" : "1px solid #f3f4f6",
    transition: "background-color 0.2s ease",
  }),
  notificationContent: {
    flex: 1,
    marginRight: 16,
  },
  notificationLabel: {
    fontSize: 15,
    color: "#2d225a",
    fontWeight: 500,
    marginBottom: 4,
  },
  notificationDescription: {
    fontSize: 13,
    color: "#6b7280",
    lineHeight: "1.4",
  },
  checkbox: {
    width: 20,
    height: 20,
    accentColor: "#7c3aed",
    cursor: "pointer",
    marginTop: 2,
  },
  proSection: {
    background: "linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 24,
    marginBottom: 32,
    display: "flex",
    alignItems: "flex-start",
    gap: 16,
  },
  proContent: {
    flex: 1,
  },
  proTitle: {
    fontWeight: 600,
    fontSize: 16,
    color: "#374151",
    marginBottom: 6,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  proDescription: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 8,
  },
  proStatus: {
    fontSize: 13,
    color: "#7c3aed",
    fontWeight: 500,
  },
  dangerZone: {
    background: "#fef2f2",
    border: "1px solid #fecaca",
    borderRadius: 12,
    padding: 24,
  },
  dangerTitle: {
    color: "#dc2626",
    fontWeight: 600,
    marginBottom: 12,
    fontSize: 16,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  dangerDescription: {
    color: "#6b7280",
    fontSize: 14,
    marginBottom: 16,
    lineHeight: "1.5",
  },
};

export default function ImprovedSettings() {
  const [user] = useState<User>(getUserFromStorage());
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [notifications, setNotifications] = useState<NotificationSettings>({
    billReminders: true,
    budgetAlerts: true,
    weeklySummaries: false,
    marketingUpdates: false,
  });
  const [isEmailEditing, setIsEmailEditing] = useState(false);
  const [newEmail, setNewEmail] = useState(user.email);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleNotificationChange = useCallback((key: keyof NotificationSettings) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  const handleThemeChange = useCallback((newTheme: ThemeMode) => {
    setTheme(newTheme);
    // Here you would typically save to localStorage or send to API
  }, []);

  const handleEmailUpdate = useCallback(() => {
    if (isEmailEditing) {
      // Validate email and update
      console.log("Updating email to:", newEmail);
      setIsEmailEditing(false);
    } else {
      setIsEmailEditing(true);
    }
  }, [isEmailEditing, newEmail]);

  const handleDeleteAccount = useCallback(() => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }
    // Handle account deletion
    console.log("Deleting account...");
    setShowDeleteConfirm(false);
  }, [showDeleteConfirm]);

  return (
    <Layout title="Settings" subtitle="Manage your preferences, account, and notifications">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-10">
        {/* Remove the custom header since Layout provides it */}
        
        {/* Appearance Section */}
        <section style={styles.section}>
          <h2 style={styles.sectionHeader}>
            <Palette size={18} />
            Appearance
          </h2>
          <div style={styles.themeGrid}>
            {THEME_OPTIONS.map((option) => (
              <button
                key={option.value}
                style={styles.themeButton(theme === option.value)}
                onClick={() => handleThemeChange(option.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleThemeChange(option.value);
                  }
                }}
                aria-pressed={theme === option.value}
                aria-label={`Set theme to ${option.label}. ${option.description}`}
              >
                <span style={{ fontSize: 20 }} role="img" aria-hidden="true">
                  {option.icon}
                </span>
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Email Section */}
        <section style={styles.section}>
          <h2 style={styles.sectionHeader}>
            <Mail size={18} />
            Email Address
          </h2>
          <div style={styles.emailContainer}>
            <input
              type="email"
              value={isEmailEditing ? newEmail : user.email}
              onChange={(e) => setNewEmail(e.target.value)}
              readOnly={!isEmailEditing}
              style={{
                ...styles.emailInput,
                background: isEmailEditing ? "#fff" : "#f8fafc",
                borderColor: isEmailEditing ? "#7c3aed" : "#e5e7eb",
                cursor: isEmailEditing ? "text" : "default",
              }}
              aria-label="Email address"
              placeholder="Enter your email address"
            />
            <button
              style={{
                ...styles.button("primary"),
                opacity: isEmailEditing && newEmail === user.email ? 0.6 : 1,
              }}
              onClick={handleEmailUpdate}
              disabled={isEmailEditing && newEmail === user.email}
              aria-label={isEmailEditing ? "Save email changes" : "Edit email address"}
            >
              {isEmailEditing ? "Save" : "Edit"}
            </button>
          </div>
          <p style={{ fontSize: 13, color: "#6b7280", marginTop: 8 }}>
            This email will be used for account recovery and important notifications.
          </p>
        </section>

        {/* Notifications Section */}
        <section style={styles.section}>
          <h2 style={styles.sectionHeader}>
            <Bell size={18} />
            Notifications
          </h2>
          <div style={styles.notificationContainer} role="group" aria-labelledby="notifications-heading">
            {NOTIFICATION_OPTIONS.map((option, idx) => (
              <div
                key={option.key}
                style={styles.notificationItem(idx === NOTIFICATION_OPTIONS.length - 1)}
              >
                <div style={styles.notificationContent}>
                  <label style={styles.notificationLabel} htmlFor={`notification-${option.key}`}>
                    {option.label}
                  </label>
                  <p style={styles.notificationDescription}>
                    {option.description}
                  </p>
                </div>
                <input
                  id={`notification-${option.key}`}
                  type="checkbox"
                  checked={notifications[option.key]}
                  onChange={() => handleNotificationChange(option.key)}
                  style={styles.checkbox}
                  aria-describedby={`${option.key}-description`}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Pro Section */}
        <section style={styles.proSection}>
          <Crown size={24} color="#7c3aed" style={{ marginTop: 4 }} />
          <div style={styles.proContent}>
            <h3 style={styles.proTitle}>
              Advanced Customization
              {!user.isPro && <span style={{ fontSize: 12, color: "#7c3aed" }}>(Pro)</span>}
            </h3>
            <p style={styles.proDescription}>
              Unlock custom themes, advanced notification controls, data export options, and priority support.
            </p>
            <p style={styles.proStatus}>
              {user.isPro ? "✓ Pro features enabled" : "Upgrade to Pro to unlock these features"}
            </p>
          </div>
          {!user.isPro && (
            <button style={styles.button("primary")} aria-label="Upgrade to Pro plan">
              Upgrade
            </button>
          )}
        </section>

        {/* Danger Zone */}
        <section style={styles.dangerZone}>
          <h2 style={styles.dangerTitle}>
            <AlertTriangle size={18} />
            Danger Zone
          </h2>
          <p style={styles.dangerDescription}>
            Once you delete your account, there is no going back. Please be certain before proceeding.
          </p>
          <button
            style={{
              ...styles.button("danger"),
              width: "100%",
              background: showDeleteConfirm ? "#991b1b" : "#dc2626",
            }}
            onClick={handleDeleteAccount}
            onKeyDown={(e) => {
              if (e.key === "Escape" && showDeleteConfirm) {
                setShowDeleteConfirm(false);
              }
            }}
            aria-label={showDeleteConfirm ? "Confirm account deletion" : "Delete account"}
          >
            {showDeleteConfirm ? "Click again to confirm deletion" : "Delete Account"}
          </button>
          {showDeleteConfirm && (
            <button
              style={{
                ...styles.button("secondary"),
                width: "100%",
                marginTop: 8,
              }}
              onClick={() => setShowDeleteConfirm(false)}
              aria-label="Cancel account deletion"
            >
              Cancel
            </button>
          )}
        </section>
      </div>
    </Layout>
  );
}