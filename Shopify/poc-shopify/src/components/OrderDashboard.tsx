import React, { useEffect, useState } from "react";

// 🧠 Define order type
interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  payment_status: "Paid" | "Pending";
  fulfillment_status: "Fulfilled" | "Unfulfilled";
}



export default function OrderDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Simulate API load
    const fakeOrders: Order[] = [
      {
        id: "#1201",
        customer: "Jane Doe",
        date: "2025-05-27",
        total: 220.0,
        payment_status: "Paid",
        fulfillment_status: "Unfulfilled"
      },
      {
        id: "#1200",
        customer: "Mark Lang",
        date: "2025-05-26",
        total: 130.0,
        payment_status: "Pending",
        fulfillment_status: "Fulfilled"
      },
      {
        id: "#1199",
        customer: "Alice Tan",
        date: "2025-05-25",
        total: 75.5,
        payment_status: "Paid",
        fulfillment_status: "Fulfilled"
      }
    ];
    setOrders(fakeOrders);
  }, []);

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
      textAlign: "left" as const,
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
    badgeBase: {
        padding: "0.2rem 0.5rem",
        borderRadius: "0.375rem",
        fontSize: "0.75rem",
        fontWeight: 600,
        display: "inline-block"
    } as React.CSSProperties,
    badgeGreen: {
        backgroundColor: "#dcfce7",
        color: "#15803d"
    } as React.CSSProperties,
    badgeRed: {
        backgroundColor: "#fee2e2",
        color: "#b91c1c"
    } as React.CSSProperties,
    actionBtn: {
      backgroundColor: "#4f46e5",
      color: "white",
      border: "none",
      borderRadius: "6px",
      padding: "0.4rem 0.9rem",
      cursor: "pointer",
      fontWeight: 500
    }
  };

  function renderBadge(value: string, type: "payment" | "fulfillment") {
  const isGood = value === "Paid" || value === "Fulfilled";
  const colorStyle = isGood ? styles.badgeGreen : styles.badgeRed;

  return (
    <span style={{ ...styles.badgeBase, ...colorStyle }}>
      {value}
    </span>
  );
} 



  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Shopify Orders Dashboard</h1>
      <p style={styles.subtext}>Track recent orders, payment and fulfillment statuses, and follow up on pending actions.</p>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Order #</th>
            <th style={styles.th}>Customer</th>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Total</th>
            <th style={styles.th}>Payment</th>
            <th style={styles.th}>Fulfillment</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td style={styles.td}>{o.id}</td>
              <td style={styles.td}>{o.customer}</td>
              <td style={styles.td}>{o.date}</td>
              <td style={styles.td}>${o.total.toFixed(2)}</td>
              <td style={styles.td}>{renderBadge(o.payment_status, "payment")}</td>
              <td style={styles.td}>{renderBadge(o.fulfillment_status, "fulfillment")}</td>
              <td style={styles.td}>
                <button style={styles.actionBtn}>Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


