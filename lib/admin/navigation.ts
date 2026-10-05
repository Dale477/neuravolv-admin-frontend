import {
  Activity,
  Boxes,
  BriefcaseBusiness,
  Cable,
  CircleDollarSign,
  Database,
  FileSearch,
  Film,
  Gauge,
  HardDrive,
  HeartPulse,
  ListChecks,
  Network,
  PackageSearch,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Users,
  Wrench,
} from "lucide-react";

export type AdminSurfaceState =
  | "operational"
  | "partial"
  | "backend_required";

export type AdminNavigationItem = {
  label: string;
  href: string;
  icon: typeof Gauge;
  state: AdminSurfaceState;
  description: string;
};

export const adminNavigation: AdminNavigationItem[] = [
  {
    label: "Overview",
    href: "/overview",
    icon: Gauge,
    state: "operational",
    description: "Platform-wide operational summary",
  },
  {
    label: "Users",
    href: "/users",
    icon: Users,
    state: "operational",
    description: "Accounts, limits, suspension, and usage",
  },
  {
    label: "Plans & Billing",
    href: "/plans-billing",
    icon: CircleDollarSign,
    state: "operational",
    description: "Plans, entitlements, limits, and billing",
  },
  {
    label: "Usage & Costs",
    href: "/usage-costs",
    icon: Activity,
    state: "operational",
    description: "Usage, cost, revenue, and margin",
  },
  {
    label: "Models & Providers",
    href: "/models-providers",
    icon: Network,
    state: "operational",
    description: "Model access and provider restrictions",
  },
  {
    label: "Tools & Functions",
    href: "/tools-functions",
    icon: Wrench,
    state: "backend_required",
    description: "Platform tool inventory and governance",
  },
  {
    label: "Connectors",
    href: "/connectors",
    icon: Cable,
    state: "backend_required",
    description: "Connector readiness and configuration",
  },
  {
    label: "Workers",
    href: "/workers",
    icon: BriefcaseBusiness,
    state: "partial",
    description: "Digital Worker operational oversight",
  },
  {
    label: "Workforces",
    href: "/workforces",
    icon: Boxes,
    state: "backend_required",
    description: "Digital Workforce operations and versions",
  },
  {
    label: "Enterprise",
    href: "/enterprise",
    icon: ShieldCheck,
    state: "backend_required",
    description: "Enterprise organizations and API governance",
  },
  {
    label: "Outcome Studios",
    href: "/outcome-studios",
    icon: Film,
    state: "backend_required",
    description: "Outcome Studio platform operations",
  },
  {
    label: "Media",
    href: "/media",
    icon: HardDrive,
    state: "backend_required",
    description: "Media jobs, failures, retries, and storage",
  },
  {
    label: "RAG & Assets",
    href: "/rag-assets",
    icon: Database,
    state: "backend_required",
    description: "Assets, ingestion, retrieval, and vector health",
  },
  {
    label: "Web / NeuraSearch",
    href: "/web-search",
    icon: Search,
    state: "operational",
    description: "Search providers and governed search state",
  },
  {
    label: "Platform Health",
    href: "/platform-health",
    icon: HeartPulse,
    state: "operational",
    description: "Administrative platform health and readiness",
  },
  {
    label: "Feature Controls",
    href: "/feature-controls",
    icon: SlidersHorizontal,
    state: "backend_required",
    description: "Governed platform feature controls",
  },
  {
    label: "Audit Log",
    href: "/audit-log",
    icon: FileSearch,
    state: "operational",
    description: "Administrative change history",
  },
  {
    label: "System Settings",
    href: "/system-settings",
    icon: Settings,
    state: "backend_required",
    description: "Governed platform configuration",
  },
];

export function adminSurfaceStateLabel(
  state: AdminSurfaceState,
): string {
  switch (state) {
    case "operational":
      return "Operational";
    case "partial":
      return "Partial";
    case "backend_required":
      return "Backend authority required";
  }
}
