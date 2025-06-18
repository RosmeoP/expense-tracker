import { useState } from "react";

// Simulate user context or prop
const user = { email: "alex@email.com" };

const notificationOptions = [
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

  const handleNotificationChange = (key: string) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f6f7fb",
        padding: "32px 0",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: 700,
          margin: "0 auto",
          background: "#fff",
          borderRadius: 18,
          boxShadow: "0 4px 24px rgba(80, 80, 120, 0.08)",
          padding: "clamp(20px, 5vw, 48px)",
          border: "1px solid #ececec",
        }}
      >
        <h2
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 26,
            fontWeight: 700,
            marginBottom: 6,
            color: "#2d225a",
            letterSpacing: "-0.5px",
          }}
        >
          <span style={{ color: "#7c3aed", fontSize: 28 }}>＋</span> Settings
        </h2>
        <p style={{ color: "#7c7e97", marginBottom: 30, fontSize: 16 }}>
          Manage your preferences, account, and notifications.
        </p>

        {/* Appearance */}
        <section style={{ marginBottom: 32 }}>
          <div style={{ fontWeight: 600, marginBottom: 10, fontSize: 15 }}>
            Appearance
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {["light", "dark", "system"].map((mode) => (
              <button
                key={mode}
                style={{
                  flex: 1,
                  padding: "12px 0",
                  borderRadius: 8,
                  border: "none",
                  background:
                    theme === mode
                      ? "#7c3aed"
                      : "#f3f4f6",
                  color: theme === mode ? "#fff" : "#2d225a",
                  fontWeight: theme === mode ? 700 : 500,
                  fontSize: 15,
                  cursor: "pointer",
                  boxShadow:
                    theme === mode
                      ? "0 2px 8px #ede9fe"
                      : "none",
                  transition: "background 0.15s, color 0.15s",
                }}
                onClick={() => setTheme(mode as "light" | "dark" | "system")}
              >
                {mode === "light" && (
                  <span role="img" aria-label="light">
                    🌞
                  </span>
                )}
                {mode === "dark" && (
                  <span role="img" aria-label="dark">
                    🌙
                  </span>
                )}
                {mode === "system" && (
                  <span role="img" aria-label="system">
                    🖥️
                  </span>
                )}{" "}
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </section>

        {/* Email */}
        <section style={{ marginBottom: 32 }}>
          <div style={{ fontWeight: 600, marginBottom: 10, fontSize: 15 }}>
            Email Address
          </div>
          <div style={{ display: "flex", gap: 10, flexDirection: "row" }}>
            <input
              type="email"
              value={user.email}
              readOnly
              style={{
                flex: 1,
                padding: "12px 14px",
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                fontSize: 16,
                background: "#f8fafc",
                color: "#6b7280",
                outline: "none",
                transition: "border 0.15s",
                cursor: "not-allowed",
              }}
              disabled
            />
            <button
              style={{
                background: "#a78bfa",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "0 22px",
                fontWeight: 600,
                fontSize: 15,
                cursor: "not-allowed",
                opacity: 0.7,
              }}
              disabled
            >
              Update
            </button>
          </div>
          <div style={{ fontSize: 13, color: "#a1a1aa", marginTop: 6 }}>
            This is your registered email.
          </div>
        </section>

        {/* Notifications */}
        <section style={{ marginBottom: 32 }}>
          <div style={{ fontWeight: 600, marginBottom: 10, fontSize: 15 }}>
            Notifications
          </div>
          <div
            style={{
              borderRadius: 10,
              overflow: "hidden",
              border: "1px solid #f3f4f6",
              background: "#f8fafc",
            }}
          >
            {notificationOptions.map((option, idx) => (
              <div
                key={option.key}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "14px 16px",
                  borderBottom:
                    idx !== notificationOptions.length - 1
                      ? "1px solid #f3f4f6"
                      : "none",
                  background: "#f8fafc",
                }}
              >
                <span style={{ flex: 1, fontSize: 15, color: "#2d225a" }}>
                  {option.label}
                </span>
                <input
                  type="checkbox"
                  checked={notifications[option.key as keyof typeof notifications]}
                  onChange={() => handleNotificationChange(option.key)}
                  style={{
                    width: 18,
                    height: 18,
                    accentColor: "#7c3aed",
                    cursor: "pointer",
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Pro Section */}
        <section
          style={{
            background: "#f9fafb",
            border: "1px solid #e5e7eb",
            borderRadius: 10,
            padding: 18,
            marginBottom: 32,
            color: "#9ca3af",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <span style={{ fontSize: 22, opacity: 0.5 }}>🔒</span>
          <div>
            <div style={{ fontWeight: 600, fontSize: 15 }}>
              Advanced Customization (Pro)
            </div>
            <div style={{ fontSize: 14 }}>
              Custom themes, advanced notifications, and export options
            </div>
            <div style={{ fontSize: 13, color: "#a78bfa", marginTop: 4 }}>
              Locked – Upgrade to Pro
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section>
          <div style={{ color: "#dc2626", fontWeight: 600, marginBottom: 10, fontSize: 15 }}>
            Danger Zone
          </div>
          <button
            style={{
              background: "#dc2626",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "12px 0",
              fontWeight: 600,
              fontSize: 15,
              cursor: "pointer",
              width: "100%",
              boxShadow: "0 1px 4px #fca5a5",
              transition: "background 0.15s",
            }}
          >
            Delete Account
          </button>
        </section>
      </div>
    </div>
  );
}