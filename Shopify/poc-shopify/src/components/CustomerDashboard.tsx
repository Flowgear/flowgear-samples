import React, { useEffect, useState } from "react";

interface ChangelogEntry {
  field: string;
  oldvalue: string;
  newvalue: string;
}

interface Customer {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  tags: string;
  verified_email: boolean;
  operation?: string;
  changelog?: ChangelogEntry[];
}



export default function CustomerDashboard() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const response = await fetch("https://demodomain2023sa-test-depjudiy.flowgear.net/shopify/customers", {
           method: "GET",
          headers: {
            "Authorization": "Bearer 5WBC3MIvmxhi5Mu2CdjyIfvqaRxgWSH1DcQwN2Y9cnfo_82-glQe_ZjZ0oy0kxMk4oDU9-DNffvme9fPtxFQpQ",  // <-- Add this line
            "Content-Type": "application/json"
          }
        });
        const data = await response.json();

        // Add demo operation flag
        const enriched = data.map((c: Customer) => ({
          ...c,
          operation: c.id % 2 === 0 ? "Update" : undefined,
        }));

        setCustomers(enriched);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch customer data.");
      } finally {
        setLoading(false);
      }
    }

    fetchCustomers();
  }, []);

  function handleConfirmUpdate() {
    if (!selectedCustomer) return;
    console.log("✅ Updating customer:", selectedCustomer);
    setSelectedCustomer(null);
  }

  function getChangeStyle(field: keyof Customer, changelog?: ChangelogEntry[]): React.CSSProperties {
    const isChanged = changelog?.some(change => change.field === field);
    return isChanged
      ? { backgroundColor: "#fef3c7", fontWeight: "bold" } // soft yellow highlight
      : {};
  }

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      fontFamily: "system-ui, sans-serif",
      padding: "2rem",
      backgroundColor: "#f9fafb",
      minHeight: "100vh"
    },
    header: {
      fontSize: "2rem",
      fontWeight: 700,
      marginBottom: "0.5rem",
      color: "#111827"
    },
    subtext: {
      fontSize: "1rem",
      color: "#6b7280",
      marginBottom: "2rem"
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      backgroundColor: "white",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      borderRadius: "0.5rem",
      overflow: "hidden"
    },
    th: {
      backgroundColor: "#f3f4f6",
      textAlign: "left",
      padding: "0.75rem 1rem",
      fontSize: "0.875rem",
      color: "#374151",
      borderBottom: "1px solid #e5e7eb"
    },
    td: {
      padding: "0.75rem 1rem",
      borderBottom: "1px solid #f3f4f6",
      fontSize: "0.9rem",
      color: "#111827"
    },
    updateBtn: {
      backgroundColor: "#4f46e5",
      color: "white",
      border: "none",
      borderRadius: "6px",
      padding: "0.4rem 0.9rem",
      cursor: "pointer",
      fontWeight: 500
    },createBtn: {
      backgroundColor: "#4f46e5",
      color: "white",
      border: "none",
      borderRadius: "6px",
      padding: "0.4rem 0.9rem",
      cursor: "pointer",
      fontWeight: 500
    },
    cancelBtn: {
      backgroundColor: "#e5e7eb",
      color: "#111827",
      border: "none",
      borderRadius: "6px",
      padding: "0.4rem 0.9rem",
      cursor: "pointer",
      fontWeight: 500
    },
    modalBackdrop: {
      position: "fixed" as const,
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    modal: {
      background: "white",
      padding: "2rem",
      borderRadius: "12px",
      boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
      maxWidth: "400px",
      width: "100%",
      textAlign: "center"
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Shopify Customer Dashboard</h1>
      <p style={styles.subtext}>View and manage customers synced to your Shopify store. You can update and create records directly from this panel.</p>

      {loading && <div>Loading customers...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}

      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Tags</th>
              <th style={styles.th}>Verified</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              
              <tr key={c.id}>
                <td style={styles.td}>{c.id}</td>
                <td style={styles.td}>{c.first_name} {c.last_name}</td>
                
                <td
                  style={{ ...styles.td, ...getChangeStyleWithTooltip("email", c.changelog).style }}
                  title={getChangeStyleWithTooltip("email", c.changelog).title}
                >
                  {c.email}
                </td>
                <td style={{ ...styles.td, ...getChangeStyleWithTooltip("phone", c.changelog).style }}
                  title={getChangeStyleWithTooltip("phone", c.changelog).title}>
                  {c.phone}
                </td>
                <td style={styles.td}>{c.tags || "-"}</td>
                <td style={styles.td}>{c.verified_email ? "✔️" : "❌"}</td>
                <td style={styles.td}>
                  {c.operation === "Update" && (
                    <button
                      style={styles.updateBtn}
                      onClick={() => setSelectedCustomer(c)}
                    >
                      Update
                    </button>
                  )}
                </td>
                <td style={styles.td}>
                  {c.operation === "Create" && (
                    <button
                      style={styles.createBtn}
                      onClick={() => setSelectedCustomer(c)}
                    >
                      Create
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Confirmation Modal */}
      {selectedCustomer && (
        <div style={styles.modalBackdrop}>
          <div style={styles.th}>
            <p style={{ marginBottom: "1rem" }}>
              Are you sure you want to update this customer in Shopify?
            </p>
            <p style={{ fontWeight: "bold", marginBottom: "1.5rem" }}>
              {selectedCustomer.first_name} {selectedCustomer.last_name}
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
              <button style={styles.updateBtn} onClick={handleConfirmUpdate}>
                Yes, Update
              </button>
              <button style={styles.cancelBtn} onClick={() => setSelectedCustomer(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


function getChangeStyleWithTooltip(
  field: keyof Customer,
  changelog?: ChangelogEntry[]
): { style: React.CSSProperties; title?: string } {
  const change = changelog?.find((entry) => entry.field === field);
  if (change) {
    return {
      style: {
        backgroundColor: "#fef9c3", // soft modern yellow
        borderRadius: "4px",
        padding: "0.25rem 0.5rem",
        fontWeight: 500,
        cursor: "help"
      },
      title: `Old value: ${change.oldvalue}`
    };
  }
  return { style: {}, title: undefined };
}
