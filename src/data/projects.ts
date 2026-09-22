export type ArchitectureKind = "vms" | "smtc" | "nms" | "nms-enterprise";

export type Project = {
  id: string;
  number: string;
  name: string;
  shortName: string;
  year: string;
  status: "Ongoing" | "Completed";
  tagline: string;
  description: string;
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  tech: string[];
  contribution: string[];
  architecture: ArchitectureKind;
  enterprise?: boolean;
  link: null; // No public repository — rendered as "Private / Internal Project"
};

export const projects: Project[] = [
  {
    id: "vms",
    number: "01",
    name: "VMS Camera Monitoring Tool",
    shortName: "VMS Monitor",
    year: "2026",
    status: "Ongoing",
    tagline: "Centralized CCTV health, recording and playback monitoring.",
    description:
      "A centralized VMS monitoring platform designed to monitor CCTV camera health, recording status, playback and site-based security activity.",
    overview:
      "A centralized VMS (Video Management System) monitoring platform that gives operators a single dashboard for live camera and VMS health. It detects camera issues such as blurred video, frozen feeds, offline cameras and low-quality footage, and generates alerts automatically with timestamp-based logs.",
    problem:
      "Large CCTV deployments make it hard to know which cameras are actually healthy. A camera can be online but delivering a blurred, frozen or degraded feed, and recordings can silently stop — issues that are usually discovered only after footage is needed.",
    solution:
      "A monitoring layer sits on top of the VMS and continuously checks every camera stream for blur, freeze, offline status and video quality. Faults raise alerts with timestamped logs, while recording, playback and geofencing let operators review footage by camera, date and time and monitor activity within defined site boundaries. An admin panel manages cameras, sites, users, alerts, recordings and playback access.",
    features: [
      "Camera health monitoring",
      "Blur detection",
      "Freeze detection",
      "Offline detection",
      "Video quality monitoring",
      "Automatic alerts",
      "Timestamp-based health logs",
      "Recording",
      "Playback by camera, date and time",
      "Geofencing",
      "Site management",
      "User management",
      "Alert management",
      "Recording management",
      "Admin dashboard",
    ],
    tech: ["Python", "Django", "OpenCV", "VMS", "CCTV", "Automation"],
    contribution: [
      "Designed and developed the centralized dashboard for live camera and VMS health monitoring.",
      "Implemented camera fault detection for blur, freeze, offline status and poor video quality.",
      "Built alert functionality with timestamp-based logs for camera health issues.",
      "Added recording and playback features, plus geofencing for site-based activity monitoring.",
      "Built admin features to manage cameras, sites, users, alerts, recordings and playback access.",
      "Currently working on additional automation, reporting and advanced monitoring features.",
    ],
    architecture: "vms",
    link: null,
  },
  {
    id: "smtc",
    number: "02",
    name: "SMTC Monitoring Tool",
    shortName: "SMTC Monitor",
    year: "2026",
    status: "Completed",
    tagline: "Data center infrastructure monitoring for blades, Hyper-V and chassis.",
    description:
      "Centralized infrastructure monitoring platform for Blade Servers, Hyper-V virtual machines and chassis infrastructure.",
    overview:
      "A centralized monitoring tool for Blade Servers, Hyper-V VMs and chassis infrastructure. It tracks CPU, RAM, cores, disk usage, VM performance, chassis temperature, fans, PDU status and blade health, raises smart alerts with timestamps and email notifications, and includes one-click Hyper-V VM backup to local, NAS or SAN storage.",
    problem:
      "Blade servers, chassis hardware and Hyper-V virtual machines each expose their health through different interfaces. Without a single view, overheating, failing fans, PDU issues or resource exhaustion inside a VM can go unnoticed until they affect services.",
    solution:
      "The tool collects metrics over SNMP, SSH and PowerShell from blades, chassis and Hyper-V hosts into one dashboard. A smart alert system flags high CPU, RAM, disk, temperature and node health issues and sends email notifications. Backup, inventory and admin control modules let the team manage servers, chassis, VMs, alerts, backups and users from a single place.",
    features: [
      "CPU, RAM, core and disk monitoring",
      "Hyper-V VM monitoring with resource usage and running status",
      "Chassis temperature monitoring",
      "Fan and PDU status monitoring",
      "Blade health, slot status and blade count",
      "Overheating detection",
      "Smart alert generation with timestamps",
      "Email notifications",
      "One-click Hyper-V VM backup",
      "Local / NAS / SAN backup paths",
      "Inventory management",
      "Admin control panel",
    ],
    tech: [
      "Python",
      "Django",
      "Flask",
      "PowerShell",
      "SNMP",
      "SSH",
      "Hyper-V",
      "Windows Server",
      "Linux",
      "NAS",
      "SAN",
      "PostgreSQL",
      "REST API",
    ],
    contribution: [
      "Built the centralized monitoring dashboard for blade servers, Hyper-V VMs and chassis infrastructure.",
      "Implemented real-time CPU, RAM, core, disk, uptime and performance monitoring.",
      "Developed chassis monitoring for fans, PDU status, blade count, slot status and temperature, with overheating detection.",
      "Implemented the smart alert system and email notification integration.",
      "Built one-click Hyper-V VM backup to Local, NAS or SAN storage paths.",
      "Created inventory management and the admin panel for servers, VMs, chassis, alerts, backups and users.",
    ],
    architecture: "smtc",
    link: null,
  },
  {
    id: "nms-ti",
    number: "03",
    name: "Network Monitoring System",
    shortName: "NMS + Threat Intel",
    year: "2025",
    status: "Completed",
    tagline: "Linux server status monitoring with threat intelligence.",
    description:
      "Custom Network Monitoring System for server availability, performance monitoring and threat intelligence.",
    overview:
      "A custom Network Monitoring System that monitors server availability and performance using ICMP ping and SSH-based health checks for Linux servers. It provides insights into server status (CPU, memory, disk and uptime) and network availability, and integrates a threat intelligence module that analyzes IP addresses and provides malicious scores.",
    problem:
      "Knowing that a server responds to ping is not the same as knowing it is healthy — and knowing which external IPs are talking to your servers is a separate question again. Both usually require separate tools.",
    solution:
      "The system combines ICMP reachability checks with SSH-based health collection (CPU, memory, disk, uptime) for Linux servers, and adds a threat intelligence module that looks up IP reputation and malicious scores so potentially harmful connections can be identified proactively. Alerts and reports surface both availability and security signals.",
    features: [
      "ICMP ping-based availability checks",
      "SSH-based Linux health checks",
      "CPU monitoring",
      "Memory monitoring",
      "Disk monitoring",
      "Uptime monitoring",
      "Network availability",
      "Threat intelligence integration",
      "IP reputation lookup",
      "Malicious IP scoring",
      "Real-time alerts",
      "Reporting",
    ],
    tech: ["Python", "Linux", "SSH", "Threat Intelligence", "REST API"],
    contribution: [
      "Developed the ping-based availability and SSH-based health monitoring for Linux servers.",
      "Integrated the threat intelligence module for IP reputation and malicious score lookup.",
      "Implemented real-time alerts and reporting.",
    ],
    architecture: "nms",
    link: null,
  },
  {
    id: "nms-platform",
    number: "04",
    name: "NMS — Network Monitoring & Inventory Platform",
    shortName: "NMS Platform",
    year: "2025",
    status: "Completed",
    tagline: "Enterprise monitoring with SLA reporting, ticketing, inventory and topology.",
    description:
      "A full-featured NMS platform that monitors servers, tracks uptime, generates SLA reports, manages tickets, handles inventory and displays network topology — with role-based access for admins and general users.",
    overview:
      "An enterprise-style Network Monitoring platform covering server groups with live UP / DOWN / Maintenance status, ping history, SLA and uptime reporting, a built-in ticketing tool, inventory management with Excel bulk import, a network topology builder and role-based user and menu access management.",
    problem:
      "Operations teams typically juggle separate tools for monitoring, ticketing, inventory and network documentation. Producing SLA reports means pulling data from several places by hand.",
    solution:
      "A single platform: automated ping reachability keeps every server group status current, logs record ping history and last-checked status, and SLA / uptime reports can be generated for any date range and downloaded as PDF or Excel. Tickets, inventory (with Excel bulk upload) and a visual topology builder live alongside monitoring, and role-based user and menu management controls what admins and general users can see.",
    features: [
      "Server groups with live UP / DOWN / Maintenance status",
      "Automated ping reachability checks",
      "Ping history and last-checked logs",
      "Server health view",
      "SLA reporting with date-range selection",
      "Uptime reports",
      "Excel / CSV export",
      "PDF reports",
      "In-built ticketing system (create, assign, track, close)",
      "Inventory management",
      "Excel bulk import",
      "Network topology builder",
      "Role-based access",
      "User & menu management",
    ],
    tech: ["Python", "Django", "PostgreSQL", "Bootstrap", "JavaScript", "REST API", "ICMP"],
    contribution: [
      "Built the central dashboard with server groups and live UP / DOWN / Maintenance status.",
      "Implemented automated ping reachability checks with detailed ping history logs.",
      "Developed SLA and uptime reporting with PDF and Excel / CSV export.",
      "Built the ticketing tool, inventory management with Excel bulk upload and the network topology builder.",
      "Implemented role-based user and menu access management.",
    ],
    architecture: "nms-enterprise",
    enterprise: true,
    link: null,
  },
];
