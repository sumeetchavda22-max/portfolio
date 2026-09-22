export type SkillCategory = { name: string; code: string; items: string[] };

export const skillCategories: SkillCategory[] = [
  {
    name: "Infrastructure",
    code: "INFRA",
    items: [
      "Dell PowerEdge",
      "Dell M1000e",
      "Dell Blade Servers",
      "Dell EMC Isilon",
      "SAN",
      "NAS",
      "RAID",
      "iDRAC",
    ],
  },
  { name: "Virtualization", code: "VIRT", items: ["Hyper-V", "VMware", "Oracle VirtualBox"] },
  { name: "Operating Systems", code: "OS", items: ["Windows Server", "Linux Server"] },
  {
    name: "Networking",
    code: "NET",
    items: ["Networking", "Subnetting", "DNS", "DHCP", "NTP", "SSH", "SNMP"],
  },
  {
    name: "Cybersecurity",
    code: "SEC",
    items: ["NDR", "Fortinet Firewall", "Threat Detection", "IOC Analysis", "Wireshark", "Syslog"],
  },
  {
    name: "Programming",
    code: "CODE",
    items: ["Python", "Bash", "PowerShell", "HTML", "CSS", "JavaScript"],
  },
  { name: "Frameworks", code: "FW", items: ["Django", "Flask", "Bootstrap"] },
  { name: "Databases", code: "DB", items: ["PostgreSQL", "SQLite", "SQL"] },
  {
    name: "Monitoring",
    code: "MON",
    items: [
      "Server Monitoring",
      "VM Monitoring",
      "Blade Monitoring",
      "Chassis Monitoring",
      "Camera Monitoring",
      "CPU/RAM/Disk Monitoring",
    ],
  },
  {
    name: "Automation",
    code: "AUTO",
    items: ["Email Alerting", "Backup Automation", "NAS/SAN Integration"],
  },
];

/* Constellation groups (interactive visualization) */
export type ConstellationGroup = {
  id: string;
  label: string;
  color: "accent" | "cyan" | "violet";
  items: string[];
};

export const constellation: ConstellationGroup[] = [
  {
    id: "infrastructure",
    label: "Infrastructure",
    color: "accent",
    items: [
      "Dell PowerEdge",
      "M1000e Chassis",
      "Blade Servers",
      "Dell EMC Isilon",
      "SAN / NAS",
      "RAID",
      "iDRAC",
      "Active Directory",
      "DNS / DHCP / NTP",
    ],
  },
  {
    id: "security",
    label: "Security",
    color: "violet",
    items: [
      "NDR",
      "Fortinet Firewall",
      "Threat Detection",
      "IOC Analysis",
      "Wireshark",
      "Syslog",
      "SIEM Integration",
      "Packet Inspection",
    ],
  },
  {
    id: "monitoring",
    label: "Monitoring",
    color: "cyan",
    items: [
      "Server Health",
      "VM Monitoring",
      "Blade Monitoring",
      "Chassis Monitoring",
      "Camera / VMS",
      "CPU / RAM / Disk",
      "SNMP",
      "ICMP / SSH Checks",
    ],
  },
  {
    id: "virtualization",
    label: "Virtualization",
    color: "accent",
    items: ["Hyper-V", "VMware", "Oracle VirtualBox", "Windows Server", "Linux Server", "VM Backup"],
  },
  {
    id: "automation",
    label: "Automation",
    color: "cyan",
    items: [
      "Email Alerting",
      "Backup Automation",
      "NAS / SAN Integration",
      "PowerShell",
      "Bash",
      "Python Scripts",
    ],
  },
  {
    id: "development",
    label: "Development",
    color: "violet",
    items: ["Python", "Django", "Flask", "PostgreSQL", "SQLite", "REST API", "JavaScript", "Bootstrap"],
  },
];

/* About: technical profile domains (decorative categorization, no percentages) */
export const domains = [
  { name: "Infrastructure", code: "DC-OPS", note: "Dell PowerEdge, Isilon, SAN/NAS, RAID, iDRAC" },
  { name: "Cybersecurity", code: "SEC-OPS", note: "NDR, Fortinet, threat detection, IOC analysis" },
  { name: "Monitoring", code: "NOC", note: "Server, VM, chassis, camera & network monitoring" },
  { name: "Virtualization", code: "HYPERVISOR", note: "Hyper-V, VMware, VirtualBox" },
  { name: "Automation", code: "AUTO", note: "Alerting, backup automation, PowerShell & Python" },
  {
    name: "Server Administration",
    code: "SYS-ADMIN",
    note: "Windows Server, Linux, AD, DNS/DHCP/NTP",
  },
] as const;
