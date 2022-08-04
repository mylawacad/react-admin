import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

const trafficShares = [
  { id: 1, label: "Injury", value: 60, color: "secondary", icon: faBriefcase },
  { id: 2, label: "Labor", value: 30, color: "primary", icon: faBriefcase },
  {
    id: 3,
    label: "Immigration",
    value: 10,
    color: "tertiary",
    icon: faBriefcase,
  },
];

const totalOrders = [
  { id: 1, label: "July", value: [1, 5, 2, 5, 4, 3], color: "primary" },
  { id: 2, label: "August", value: [2, 3, 4, 8, 1, 2], color: "secondary" },
];

export { trafficShares, totalOrders };
