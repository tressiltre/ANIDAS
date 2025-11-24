export const generateChartData = () => {
  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0");
    return {
      time: `${hour}:00`,
      count: Math.floor(Math.random() * 50) + 10,
    };
  });
  return hours;
};

export const generateProtocolData = () => {
  return [
    { name: "TCP", value: 45 },
    { name: "UDP", value: 30 },
    { name: "HTTP", value: 15 },
    { name: "HTTPS", value: 8 },
    { name: "Other", value: 2 },
  ];
};
