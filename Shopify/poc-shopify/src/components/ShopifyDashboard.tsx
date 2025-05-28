import React from 'react';
import  CustomerDashboard  from './CustomerDashboard';
import  OrderDashboard  from './OrderDashboard';
import { Views } from '../types/views'; // We'll add a new enum for Shopify views

export class ShopifyDashboard extends React.Component<{}, {
  activeView: Views,
  childComponentKey: any,
}> {
  constructor(props: {}) {
    super(props);
    this.state = {
      activeView: Views.CustomerView,
      childComponentKey: Math.random(),
    };
  }

  render() {
    const content = this.viewSelector();
    return (
      <div>
        {this.renderViewTabsButtons()}
        {content}
      </div>
    );
  }

  viewSelector() {
  switch (this.state.activeView) {
    case Views.CustomerView:
      return (
        <CustomerDashboard
          key={this.state.childComponentKey}
        />
      );
    case Views.OrderView:
      return (
        <OrderDashboard
          key={this.state.childComponentKey}
        />
      );
    default:
      throw new Error("Unknown view");
  }
}

  

  renderViewTabsButtons() {
    return (
      <div style={{ display: "flex", gap: "0.5rem", padding: "0.5rem" }}>
        <button
          style={navButtonStyle(this.state.activeView === Views.CustomerView)}
          onClick={() => this.setState({ activeView: Views.CustomerView })}
        >
          Customers
        </button>

        <button
          style={navButtonStyle(this.state.activeView === Views.OrderView)}
          onClick={() => this.setState({ activeView: Views.OrderView })}
        >
          Orders
        </button>
      </div>
    );
  }
}

const navButtonStyle = (active: boolean): React.CSSProperties => ({
  backgroundColor: active ? "#10b981" : "#d1fae5", // active = emerald-500, else emerald-100
  color: active ? "white" : "#065f46",             // white text on active, dark green on inactive
  border: "none",
  borderRadius: "6px",
  padding: "6px 12px",
  margin: "0 4px",
  fontSize: "0.875rem",
  fontWeight: 600,
  cursor: "pointer",
  transition: "background 0.2s ease",
});