import React, { useState } from "react";

// ==========================================
// 🎨 CENTRALIZED DESIGN SYSTEM (CSS-in-JS)
// ==========================================
const COLORS = {
  bgMain: "#f8fafc",
  bgCard: "#ffffff",
  textPrimary: "#0f172a",
  textSecondary: "#64748b",
  border: "#e2e8f0",
  primary: "#2563eb",
  primaryHover: "#1d4ed8",
  primaryLight: "#eff6ff",

  // Semantic Constraint Badges
  successBg: "#dcfce7",
  successText: "#15803d",
  successBorder: "#22c55e",

  warningBg: "#fef9c3",
  warningText: "#a16207",
  warningBorder: "#eab308",

  dangerBg: "#fee2e2",
  dangerText: "#b91c1c",
  dangerBorder: "#ef4444",
};

const STYLES = {
  container: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    backgroundColor: COLORS.bgMain,
    minHeight: "100vh",
    padding: "32px 24px",
    color: COLORS.textPrimary,
  } as React.CSSProperties,

  header: {
    maxWidth: "1200px",
    margin: "0 auto 32px auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: `1px solid ${COLORS.border}`,
    paddingBottom: "20px",
  } as React.CSSProperties,

  logoTitle: {
    margin: 0,
    fontSize: "26px",
    fontWeight: 800,
    letterSpacing: "-0.025em",
    color: COLORS.textPrimary,
  } as React.CSSProperties,

  subtitle: {
    margin: "6px 0 0 0",
    color: COLORS.textSecondary,
    fontSize: "14px",
    fontWeight: 500,
  } as React.CSSProperties,

  navButtonGroup: {
    display: "flex",
    gap: "8px",
    backgroundColor: "#f1f5f9",
    padding: "4px",
    borderRadius: "8px",
  } as React.CSSProperties,

  navButton: (isActive: boolean) =>
    ({
      padding: "8px 16px",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
      fontWeight: 600,
      fontSize: "14px",
      transition: "all 0.15s ease",
      backgroundColor: isActive ? COLORS.bgCard : "transparent",
      color: isActive ? COLORS.textPrimary : COLORS.textSecondary,
      boxShadow: isActive ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
    } as React.CSSProperties),

  mainGrid: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "minmax(320px, 1fr) 2fr",
    gap: "32px",
    alignItems: "start",
  } as React.CSSProperties,

  card: {
    backgroundColor: COLORS.bgCard,
    padding: "28px",
    borderRadius: "12px",
    boxShadow:
      "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)",
    border: `1px solid ${COLORS.border}`,
  } as React.CSSProperties,

  workstreamTag: {
    marginTop: 0,
    marginBottom: "6px",
    fontSize: "12px",
    color: COLORS.primary,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  } as React.CSSProperties,

  cardTitle: {
    marginTop: 0,
    marginBottom: "24px",
    fontSize: "20px",
    fontWeight: 700,
    letterSpacing: "-0.01em",
  } as React.CSSProperties,

  formGroup: {
    marginBottom: "20px",
  } as React.CSSProperties,

  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: 600,
    fontSize: "14px",
    color: "#334155",
  } as React.CSSProperties,

  selectInput: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "6px",
    border: `1px solid ${COLORS.border}`,
    backgroundColor: "#ffffff",
    fontSize: "14px",
    color: COLORS.textPrimary,
    outline: "none",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  } as React.CSSProperties,

  numberInput: {
    width: "100%",
    boxSizing: "border-box",
    padding: "10px 12px",
    borderRadius: "6px",
    border: `1px solid ${COLORS.border}`,
    fontSize: "14px",
    color: COLORS.textPrimary,
    outline: "none",
  } as React.CSSProperties,

  primaryBtn: (disabled: boolean) =>
    ({
      width: "100%",
      padding: "12px",
      borderRadius: "6px",
      border: "none",
      backgroundColor: disabled ? "#93c5fd" : COLORS.primary,
      color: "#ffffff",
      fontSize: "14px",
      fontWeight: 600,
      cursor: disabled ? "not-allowed" : "pointer",
      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      transition: "background-color 0.2s ease",
    } as React.CSSProperties),

  secondaryBtn: {
    width: "100%",
    marginTop: "12px",
    padding: "10px",
    borderRadius: "6px",
    border: `1px solid ${COLORS.border}`,
    backgroundColor: "#f8fafc",
    color: COLORS.textSecondary,
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
  } as React.CSSProperties,

  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  } as React.CSSProperties,

  th: {
    padding: "12px 16px",
    fontSize: "12px",
    color: COLORS.textSecondary,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    borderBottom: `2px solid ${COLORS.border}`,
  } as React.CSSProperties,

  td: {
    padding: "16px",
    fontSize: "14px",
    borderBottom: `1px solid ${COLORS.border}`,
    verticalAlign: "middle",
  } as React.CSSProperties,

  badge: (status: "passed" | "soft-warning" | "hard-fail") => {
    let bg = COLORS.successBg;
    let color = COLORS.successText;
    if (status === "hard-fail") {
      bg = COLORS.dangerBg;
      color = COLORS.dangerText;
    }
    if (status === "soft-warning") {
      bg = COLORS.warningBg;
      color = COLORS.warningText;
    }
    return {
      display: "inline-flex",
      alignItems: "center",
      padding: "4px 10px",
      borderRadius: "9999px",
      fontSize: "12px",
      fontWeight: 600,
      backgroundColor: bg,
      color: color,
    } as React.CSSProperties;
  },
};

// --- Core Data Contracts ---
interface Resident {
  id: string;
  name: string;
  pgy: number;
}
interface ScheduleAssignment {
  day: number;
  rotation: string;
  resident: string;
  pgy: number;
  ruleStatus: "passed" | "soft-warning" | "hard-fail";
  notes?: string;
}

const RESIDENTS_POOL: Resident[] = [
  { id: "res-1", name: "Dr. Anjali (PGY-3)", pgy: 3 },
  { id: "res-2", name: "Dr. Vikram (PGY-1)", pgy: 1 },
  { id: "res-3", name: "Dr. Sneha (PGY-2)", pgy: 2 },
  { id: "res-4", name: "Dr. Rahul (PGY-1)", pgy: 1 },
];

const ROTATIONS = [
  "Cardiology",
  "Emergency Medicine",
  "ICU / CCU Inpatient",
  "CEP Supervision",
  "Psychiatry Call",
];

const INITIAL_SCHEDULE: ScheduleAssignment[] = [
  {
    day: 1,
    rotation: "Cardiology",
    resident: "Dr. Anjali (PGY-3)",
    pgy: 3,
    ruleStatus: "passed",
  },
  {
    day: 2,
    rotation: "Cardiology",
    resident: "Dr. Vikram (PGY-1)",
    pgy: 1,
    ruleStatus: "passed",
  },
  {
    day: 3,
    rotation: "ICU / CCU Inpatient",
    resident: "Dr. Sneha (PGY-2)",
    pgy: 2,
    ruleStatus: "passed",
  },
  {
    day: 4,
    rotation: "Emergency Medicine",
    resident: "Dr. Rahul (PGY-1)",
    pgy: 1,
    ruleStatus: "passed",
  },
];

// ==========================================
// 🚀 PRINCIPAL UI APPLICATION
// ==========================================
export default function App() {
  const [schedule, setSchedule] =
    useState<ScheduleAssignment[]>(INITIAL_SCHEDULE);
  const [selectedResidentId, setSelectedResidentId] = useState(
    RESIDENTS_POOL[0].id
  );
  const [targetRotation, setTargetRotation] = useState(ROTATIONS[0]);
  const [rankPriority, setRankPriority] = useState<number>(1);
  const [isSolving, setIsSolving] = useState(false);
  const [activeTab, setActiveTab] = useState<"calendar" | "rules">("calendar");
  const [systemLogs, setSystemLogs] = useState<string>(
    "System Status Log: ✅ Solver Idle. Ready to parse runtime preference updates."
  );

  const handleSubmitPreference = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSolving(true);
    setSystemLogs(
      "🔄 Processing Pipeline... Mapping JSONB rules array to CP-SAT solver registry..."
    );

    setTimeout(() => {
      const activeRes = RESIDENTS_POOL.find((r) => r.id === selectedResidentId);
      if (!activeRes) return;

      let simulatedStatus: "passed" | "soft-warning" | "hard-fail" = "passed";
      let logMessage = `✅ Solver Success: Assigned ${activeRes.name} to ${targetRotation} matching Rank #${rankPriority}.`;
      let ruleNotes = `Satisfies optimization cost objectives.`;

      // ARCH-7 Enforcement Logic Mapping
      if (targetRotation === "CEP Supervision" && activeRes.pgy === 1) {
        simulatedStatus = "hard-fail";
        logMessage =
          "❌ HARD RULE VIOLATION: Junior Interns (PGY-1) cannot run independent CEP Supervision shifts.";
        ruleNotes =
          "Infeasible schedule state: Violated constraint registry rule 4.1.";
      } else if (
        targetRotation === "ICU / CCU Inpatient" &&
        rankPriority === 3
      ) {
        simulatedStatus = "soft-warning";
        logMessage =
          "⚠️ Soft Rule Alert: Assigned with suboptimal priority. System CCU target threshold softened.";
        ruleNotes = "Soft policy warning: Low satisfaction priority assigned.";
      }

      setSchedule([
        ...schedule,
        {
          day: schedule.length + 1,
          rotation: targetRotation,
          resident: activeRes.name,
          pgy: activeRes.pgy,
          ruleStatus: simulatedStatus,
          notes: ruleNotes,
        },
      ]);
      setSystemLogs(logMessage);
      setIsSolving(false);
    }, 800);
  };

  const getLogBarBorderColor = () => {
    if (isSolving) return COLORS.primaryBorder;
    if (systemLogs.includes("❌")) return COLORS.dangerBorder;
    if (systemLogs.includes("⚠️")) return COLORS.warningBorder;
    return COLORS.successBorder;
  };

  const getLogBarBgColor = () => {
    if (isSolving) return COLORS.primaryLight;
    if (systemLogs.includes("❌")) return COLORS.dangerBg;
    if (systemLogs.includes("⚠️")) return COLORS.warningBg;
    return COLORS.successBg;
  };

  return (
    <div style={STYLES.container}>
      {/* Upper Navigation Header Frame */}
      <header style={STYLES.header}>
        <div>
          <h1 style={STYLES.logoTitle}>🧭 ShiftCompass</h1>
          <p style={STYLES.subtitle}>
            Advanced Medical Residency Optimization Workspace
          </p>
        </div>
        <div style={STYLES.navButtonGroup}>
          <button
            onClick={() => setActiveTab("calendar")}
            style={STYLES.navButton(activeTab === "calendar")}
          >
            🗓️ Calendar Matrix
          </button>
          <button
            onClick={() => setActiveTab("rules")}
            style={STYLES.navButton(activeTab === "rules")}
          >
            📋 Constraints Deck
          </button>
        </div>
      </header>

      {/* Dynamic Status Log Ribbon */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto 32px auto",
          padding: "14px 20px",
          borderRadius: "8px",
          backgroundColor: getLogBarBgColor(),
          borderLeft: `4px solid ${getLogBarBorderColor()}`,
          fontSize: "14px",
          fontWeight: 600,
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        }}
      >
        {systemLogs}
      </div>

      {activeTab === "calendar" ? (
        <main style={STYLES.mainGrid}>
          {/* Controls Form Card */}
          <section style={STYLES.card}>
            <div style={STYLES.workstreamTag}>Workstream 4.3 Pipeline</div>
            <h2 style={STYLES.cardTitle}>Intake Form</h2>

            <form onSubmit={handleSubmitPreference}>
              <div style={STYLES.formGroup}>
                <label style={STYLES.label}>Resident Profile</label>
                <select
                  value={selectedResidentId}
                  onChange={(e) => setSelectedResidentId(e.target.value)}
                  style={STYLES.selectInput}
                >
                  {RESIDENTS_POOL.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={STYLES.formGroup}>
                <label style={STYLES.label}>Target Rotation Block</label>
                <select
                  value={targetRotation}
                  onChange={(e) => setTargetRotation(e.target.value)}
                  style={STYLES.selectInput}
                >
                  {ROTATIONS.map((rot) => (
                    <option key={rot} value={rot}>
                      {rot}
                    </option>
                  ))}
                </select>
              </div>

              <div style={STYLES.formGroup}>
                <label style={STYLES.label}>
                  Rank Weighting Priority (1-3)
                </label>
                <input
                  type="number"
                  min="1"
                  max="3"
                  value={rankPriority}
                  onChange={(e) => setRankPriority(Number(e.target.value))}
                  style={STYLES.numberInput}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSolving}
                style={STYLES.primaryBtn(isSolving)}
              >
                {isSolving
                  ? "⚙️ Running CP-SAT Solver Engine..."
                  : "⚡ Trigger Solver Iteration"}
              </button>
            </form>
            <button
              onClick={() => {
                setSchedule(INITIAL_SCHEDULE);
                setSystemLogs(
                  "System Status Log: ✅ Reseeded calendar assignments matrix database data."
                );
              }}
              style={STYLES.secondaryBtn}
            >
              🔄 Reset Demo Seeds
            </button>
          </section>

          {/* Master Operational Calendar Table */}
          <section style={STYLES.card}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <h2 style={{ ...STYLES.cardTitle, marginBottom: 0 }}>
                🗓️ Weekly Rotations Registry
              </h2>
              <span
                style={{
                  fontSize: "12px",
                  color: COLORS.textSecondary,
                  backgroundColor: "#f1f5f9",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  fontWeight: 600,
                }}
              >
                ARCH-1 Layout
              </span>
            </div>

            <table style={STYLES.table}>
              <thead>
                <tr>
                  <th style={STYLES.th}>Time Window</th>
                  <th style={STYLES.th}>Assignment Rotation</th>
                  <th style={STYLES.th}>Allocated Staff</th>
                  <th style={STYLES.th}>Status Block</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((shift, idx) => (
                  <tr
                    key={idx}
                    style={{
                      backgroundColor:
                        shift.ruleStatus === "hard-fail"
                          ? "#fef2f2"
                          : "transparent",
                    }}
                  >
                    <td
                      style={{
                        ...STYLES.td,
                        fontWeight: 700,
                        color: "#475569",
                      }}
                    >
                      Day {shift.day}
                    </td>
                    <td style={STYLES.td}>
                      <span
                        style={{
                          fontWeight: 600,
                          color: shift.rotation.includes("ICU")
                            ? "#7c3aed"
                            : COLORS.textPrimary,
                          backgroundColor: shift.rotation.includes("ICU")
                            ? "#f3e8ff"
                            : "transparent",
                          padding: shift.rotation.includes("ICU")
                            ? "2px 6px"
                            : "0",
                          borderRadius: "4px",
                        }}
                      >
                        {shift.rotation}
                      </span>
                    </td>
                    <td style={{ ...STYLES.td, fontWeight: 500 }}>
                      {shift.resident}
                    </td>
                    <td style={STYLES.td}>
                      <span style={STYLES.badge(shift.ruleStatus)}>
                        {shift.ruleStatus === "passed"
                          ? "Passed"
                          : shift.ruleStatus === "hard-fail"
                          ? "Hard Failure"
                          : "Soft Warning"}
                      </span>
                      {shift.notes && (
                        <div
                          style={{
                            fontSize: "11px",
                            color: COLORS.textSecondary,
                            marginTop: "4px",
                          }}
                        >
                          {shift.notes}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      ) : (
        /* Explicit Architectural Constraints Rules Deck Tab */
        <section
          style={{ ...STYLES.card, maxWidth: "1200px", margin: "0 auto" }}
        >
          <h2 style={STYLES.cardTitle}>
            📋 Active Constraints Rule Book Engine
          </h2>
          <p
            style={{
              color: COLORS.textSecondary,
              marginBottom: "24px",
              fontSize: "15px",
            }}
          >
            The following configurations model the operational guardrails
            utilized by the custom constraint handler registry.
          </p>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <div
              style={{
                padding: "16px",
                border: `1px solid ${COLORS.border}`,
                borderRadius: "8px",
                borderLeft: `4px solid ${COLORS.dangerBorder}`,
              }}
            >
              <strong
                style={{
                  display: "block",
                  fontSize: "15px",
                  marginBottom: "4px",
                }}
              >
                🔒 HARD RULE: CEP Rotation Supervision (Workstream 4.1)
              </strong>
              <span style={{ color: COLORS.textSecondary, fontSize: "13px" }}>
                Prevents junior residents with raw entry classifications from
                acting as supervisor resources.
              </span>
            </div>
            <div
              style={{
                padding: "16px",
                border: `1px solid ${COLORS.border}`,
                borderRadius: "8px",
                borderLeft: `4px solid ${COLORS.warningBorder}`,
              }}
            >
              <strong
                style={{
                  display: "block",
                  fontSize: "15px",
                  marginBottom: "4px",
                }}
              >
                📈 SOFT RULE: CCU & Ectopic Compliance Level Balance (Workstream
                4.1)
              </strong>
              <span style={{ color: COLORS.textSecondary, fontSize: "13px" }}>
                Minimizes overall model penalties while keeping baseline
                structural metrics above 60%.
              </span>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
