import React from "react";

export const InfoCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-secondary/50 border border-border/50">
    <div className="text-primary mt-0.5">{icon}</div>
    <div className="min-w-0">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium text-foreground truncate" style={{ fontFamily: "var(--font-mono)" }}>
        {value}
      </p>
    </div>
  </div>
);
