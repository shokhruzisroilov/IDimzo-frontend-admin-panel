import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "5k", uv: 5, pv: 2400 },
  { name: "10k", uv: 20, pv: 1398 },
  { name: "15k", uv: 30, pv: 9800 },
  { name: "20k", uv: 40, pv: 3908 },
  { name: "25k", uv: 100, pv: 4800 },
  { name: "30k", uv: 80, pv: 3800 },
  { name: "35k", uv: 60, pv: 4300 },
  { name: "40k", uv: 50, pv: 2400 },
  { name: "45k", uv: 40, pv: 2400 },
  { name: "50k", uv: 30, pv: 1398 },
  { name: "55k", uv: 20, pv: 9800 },
  { name: "60k", uv: 64.364, pv: 3908 },
];

const ChartComponent: React.FC = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold mb-4">
          Foydalanuvchilar Statistikasisi
        </h2>
        <select className="mt-2 p-2 border rounded">
          <option>Yanvar</option>
          <option>Fevral</option>
          <option>Mart</option>
          <option>Aprel</option>
          <option>May</option>
          <option>Iyun</option>
          <option>Iyul</option>
          <option>Avgust</option>
          <option>Sentabr</option>
          <option>Oktyabr</option>
          <option>Noyabr</option>
          <option>Dekabr</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="uv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;
