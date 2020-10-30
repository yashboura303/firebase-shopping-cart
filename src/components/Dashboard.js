import React from "react";

export default function DashBoard({ user }) {
    return <div className="dashboard-page">{user.displayName}</div>;
}
