// Get table reference
const table = document.getElementById("healthTable");

// Sample elderly data (65+)
let patients = [
  { name: "Ramesh", age: 70 },
  { name: "Sita", age: 68 },
  { name: "Joseph", age: 75 },
  { name: "Lakshmi", age: 72 }
];

// Function to generate random health values
function generateHealthData() {
  return {
    heartRate: Math.floor(60 + Math.random() * 40),
    bp: `${Math.floor(110 + Math.random() * 30)}/${Math.floor(70 + Math.random() * 20)}`,
    oxygen: Math.floor(90 + Math.random() * 10),
    sugar: Math.floor(90 + Math.random() * 80)
  };
}

// Risk calculation
function calculateRisk(hr, oxygen, sugar) {
  if (hr > 100 || oxygen < 92 || sugar > 160) return "High";
  if (hr > 85 || oxygen < 95 || sugar > 130) return "Medium";
  return "Low";
}

// Update table every 3 seconds (real-time simulation)
function updateTable() {
  // Clear old rows (except header)
  table.innerHTML = `
    <tr>
      <th>Name</th>
      <th>Age</th>
      <th>Heart Rate</th>
      <th>Blood Pressure</th>
      <th>Oxygen</th>
      <th>Sugar</th>
      <th>Risk</th>
    </tr>
  `;

  patients.forEach(p => {
    const data = generateHealthData();
    const risk = calculateRisk(data.heartRate, data.oxygen, data.sugar);

    let riskClass = risk.toLowerCase();

    const row = table.insertRow();
    row.innerHTML = `
      <td>${p.name}</td>
      <td>${p.age}</td>
      <td>${data.heartRate} bpm</td>
      <td>${data.bp}</td>
      <td>${data.oxygen}%</td>
      <td>${data.sugar} mg/dL</td>
      <td class="${riskClass}">${risk}</td>
    `;
  });
}

// Run every 3 seconds
setInterval(updateTable, 3000);
updateTable();
// Chart.js - Heart Rate Monitoring
const ctx = document.getElementById('overallChart').getContext('2d');

let heartRateData = {
  labels: [],
  datasets: [{
    label: 'Average Heart Rate',
    data: [],
    borderColor: '#e63946',
    fill: false,
    tension: 0.4
  }]
};

const overallChart = new Chart(ctx, {
  type: 'line',
  data: heartRateData,
  options: {
    responsive: true,
    scales: {
      y: {
        min: 50,
        max: 120
      }
    }
  }
});

// Update chart in real-time
setInterval(() => {
  const avgHR = Math.floor(70 + Math.random() * 30);
  const time = new Date().toLocaleTimeString();

  if (heartRateData.labels.length > 6) {
    heartRateData.labels.shift();
    heartRateData.datasets[0].data.shift();
  }

  heartRateData.labels.push(time);
  heartRateData.datasets[0].data.push(avgHR);
  overallChart.update();
}, 3000);
