import allusers from "@/assets/icons/allusers.png";
import contracts from "@/assets/icons/contracts.png";
import pending from "@/assets/icons/pending.png";
import trending from "@/assets/icons/trending.png";
import ChartComponent from "../../../components/ChartComponent";
const Home = () => {
  return (
    <div className="p-6  min-h-[87vh] overflow-hidden">
      <h1 className="text-2xl font-bold mb-6">Boshqaruv paneli</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Users Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500 text-sm font-medium">
                Jami foydalanuvchi
              </h3>
              <img src={allusers} alt="Users icon" />
            </div>
            <div className="flex items-end">
              <p className="text-2xl font-bold text-gray-800">40,689</p>
            </div>
            <div className="flex items-center text-green-500 text-sm mt-2">
              <img src={trending} alt="Increase" className="w-4 h-4 mr-1" />
              <span>8.5% Kechagi kundan boshlab</span>
            </div>
          </div>
        </div>

        {/* Contracts Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500 text-sm font-medium">
                Jami shartnomalar
              </h3>
              <img src={contracts} alt="Contracts icon" />
            </div>
            <div className="flex items-end">
              <p className="text-2xl font-bold text-gray-800">1,245</p>
            </div>
            <div className="flex items-center text-green-500 text-sm mt-2">
              <img src={trending} alt="Increase" className="w-4 h-4 mr-1" />
              <span>3.2% Kechagi kundan boshlab</span>
            </div>
          </div>
        </div>

        {/* Pending Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500 text-sm font-medium">Kutilmoqda</h3>
              <img src={pending} alt="Pending icon" />
            </div>
            <div className="flex items-end">
              <p className="text-2xl font-bold text-gray-800">328</p>
            </div>
            <div className="flex items-center text-green-500 text-sm mt-2">
              <img src={trending} alt="Decrease" className="w-4 h-4 mr-1" />
              <span>1.8% Kechagi kundan boshlab</span>
            </div>
          </div>
        </div>
      </div>

      <ChartComponent />
    </div>
  );
};

export default Home;
