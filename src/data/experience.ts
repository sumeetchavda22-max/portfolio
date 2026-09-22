export type Experience = {
  id: string;
  role: string;
  company: string;
  context: string;
  period: string;
  start: string;
  current?: boolean;
  summary: string;
  responsibilities: string[];
  tech: string[];
};

export const experience: Experience[] = [
  {
    id: "pixcel",
    role: "Data Center Technical Support Engineer & Infrastructure Engineer",
    company: "Pixcel PIC",
    context: "System Integrator for Lookman at SASA Smart City Project, Ahmedabad",
    period: "Jan 2026 – Present",
    start: "2026",
    current: true,
    summary:
      "Managing complete Data Center operations for TCC and CCC infrastructure environments.",
    responsibilities: [
      "Handling Dell PowerEdge M1000e chassis and Dell PowerEdge M630 / M640 blade servers — deployment, troubleshooting, maintenance and hardware diagnostics.",
      "Managing Dell EMC Isilon storage along with SAN and NAS infrastructure environments.",
      "Working on Hyper-V, VMware and Oracle VirtualBox with Linux and Windows virtual machines and host servers.",
      "Administration and troubleshooting for Active Directory, DNS, DHCP and NTP server configuration.",
      "RAID management, backup monitoring and enterprise server infrastructure support.",
      "Monitoring server health, uptime, storage performance, virtualization resources, network connectivity and critical infrastructure alerts.",
      "Firmware updates and remote server management over SSH, RDP and iDRAC.",
      "Coordinating with technical teams for operational support and infrastructure optimization.",
    ],
    tech: [
      "Dell PowerEdge",
      "M1000e",
      "M630 / M640",
      "Dell EMC Isilon",
      "SAN / NAS",
      "Hyper-V",
      "VMware",
      "VirtualBox",
      "Active Directory",
      "DNS / DHCP / NTP",
      "RAID",
      "iDRAC",
      "Linux",
      "Windows Server",
    ],
  },
  {
    id: "velocity",
    role: "Security Analyst & Technical Support Engineer",
    company: "Velocity Bytes Tech",
    context: "System Integrator for BSNL at Smart City Project, Ahmedabad",
    period: "Feb 2025 – Jan 2026",
    start: "2025",
    summary:
      "Technical support and implementation for NDR (Network Detection and Response) solutions in enterprise cybersecurity environments.",
    responsibilities: [
      "NDR implementation focused on network traffic analysis, anomaly detection and real-time threat response.",
      "Deployment, configuration and troubleshooting of the NDR tool across client environments.",
      "Integration with existing firewall and SIEM systems.",
      "Log analysis, packet inspection and alert tuning to reduce false positives and improve detection accuracy.",
      "Policy creation, rule optimization and dashboard customization per use-case requirements.",
      "Technical documentation and end-user / technical team training on the NDR platform.",
    ],
    tech: ["NDR / ATF", "Fortinet Firewall", "Linux", "Wireshark", "Syslog", "PuTTY"],
  },
  {
    id: "smartcity",
    role: "Data Analyst & Operations Supervisor",
    company: "Ahmedabad Smart City Project",
    context: "Urban technology, surveillance and smart infrastructure",
    period: "Feb 2023 – Feb 2025",
    start: "2023",
    summary:
      "City-wide CCTV operations, CCRS portal management and MIS reporting for smart city infrastructure.",
    responsibilities: [
      "City-wide CCTV camera operations — monitoring, maintenance coordination and incident analysis.",
      "Team in-charge for 10 staff members: daily task assignment, performance supervision and on-ground issue resolution.",
      "Managed the CCRS (City Command and Control Room System) portal — data reporting, escalation handling and dashboard maintenance.",
      "Daily and monthly reporting for Smart Toilets, Smart Parking, street lighting, solid waste monitoring and environmental sensors.",
      "Field operations and real-time coordination with municipal officials, system integrators and technology vendors.",
      "Data collection, analytics and MIS reporting for internal use and city governance dashboards.",
    ],
    tech: [
      "CCRS Portal",
      "CCTV Operations",
      "Excel",
      "MIS Reporting",
      "Smart City IoT",
      "Team Supervision",
    ],
  },
];
