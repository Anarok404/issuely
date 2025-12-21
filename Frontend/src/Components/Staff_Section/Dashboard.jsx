import React from "react";
import AssignedIssues from "./AssignedIssue";

export default function StaffDashboard() {
  return (
    <div className="min-h-screen w-screen bg-slate-100 p-6">
      <AssignedIssues />
    </div>
  );
}
