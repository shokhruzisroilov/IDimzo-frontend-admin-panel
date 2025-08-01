import { ArrowDownFromLine, ChevronUp } from "lucide-react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "1-Iyun", amount: 100000 },
  { day: "2-Iyun", amount: 250000 },
  { day: "3-Iyun", amount: 150000 },
  { day: "4-Iyun", amount: 300000 },
  { day: "5-Iyun", amount: 200000 },
  { day: "6-Iyun", amount: 350000 },
  { day: "7-Iyun", amount: 180000 },
];

const AccountStatement = () => {
  return (
    <div className="p-6  min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Hisob kitob</h1>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Chart Section */}
        <div className="w-full lg:w-2/3 bg-white rounded-xl shadow-md p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h1 className="text-lg font-semibold text-gray-700 mb-2 sm:mb-0">Umumiy ko'rinish Balans</h1>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
              <option>Kunlik</option>
              <option>Haftalik</option>
              <option>Oylik</option>
              <option>Yillik</option>
            </select>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <h1 className="text-gray-600">
              O'tkan hafta: <span className="text-green-600 font-medium">563 443 289 so'm</span>
            </h1>
            <div className="flex items-center mt-2 sm:mt-0">
              <span className="mr-3 font-medium">563 443 296 so'm</span>
              <span className="flex items-center text-green-600 font-medium">
                <ChevronUp className="mr-1" />
                7%
              </span>
            </div>
          </div>
          
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="day" 
                  tick={{ fill: '#6b7280' }}
                  axisLine={{ stroke: '#d1d5db' }}
                />
                <YAxis
                  tickFormatter={(value) => `${value / 1000}K`}
                  tick={{ fill: '#6b7280' }}
                  axisLine={{ stroke: '#d1d5db' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value) => [`${value.toLocaleString()} so'm`, "Pul"]}
                  labelFormatter={(label) => `Kun: ${label}`}
                />
                <Legend />
                <Bar
                  dataKey="amount"
                  fill="#4f46e5"
                  name="Daromad"
                  radius={[4, 4, 0, 0]}
                  activeBar={<Rectangle fill="#6366f1" stroke="#312e81" />}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Wallet Activity Section */}
        <div className="w-full lg:w-1/3 bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-700">Hamyon faoliyati</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm rounded-lg border border-gray-300 hover:bg-gray-50">
                Oylik
              </button>
              <button className="px-3 py-1 text-sm rounded-lg border border-gray-300 hover:bg-gray-50">
                Haftalik
              </button>
              <button className="px-3 py-1 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
                Bugun
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="p-2 border border-gray-200 rounded-full mr-4">
                  <ArrowDownFromLine className="text-indigo-600" size={18} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">788 913 321 so'm</p>
                  <p className="text-sm text-gray-500">06:24:45 AM</p>
                </div>
                <div className="text-green-600 font-medium">+100 000</div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-6 py-2 text-indigo-600 font-medium rounded-lg border border-indigo-600 hover:bg-indigo-50 transition-colors">
            Barchasini ko'rish
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountStatement;