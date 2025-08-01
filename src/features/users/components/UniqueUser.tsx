import { Switch } from "../../../components/ui/switch";
import { ArrowLeft, Download } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UniqueUser = () => {
  const [activeTab, setActiveTab] = useState("malumotlar");
  const navigate = useNavigate();
  return (
    <div className="user-profile p-4 bg-white">
      <button
        onClick={() => navigate("/users")}
        className="flex justify-center items-center gap-3 bg-mainColor text-white p-2 rounded-lg"
      >
        <ArrowLeft />
        <span>Orqaga chiqish</span>
      </button>
      <div className="tabs mb-4 border-b border-gray-200">
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "malumotlar"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("malumotlar")}
        >
          Malumotlar
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "xizmatlar"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("xizmatlar")}
        >
          Xizmardan foydalanishlar
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "xavfsizlik"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("xavfsizlik")}
        >
          Xavfsizlik
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "malumotlar" && (
          <div className="p-4 border border-gray-200 rounded-lg">
            <img
              className="w-[200px] rounded-md"
              src="https://t3.ftcdn.net/jpg/01/93/56/24/360_F_193562494_uZu3hswS738ZiuypuRl2oID4gM7mmAHX.jpg"
              alt="Image"
            />
            <h1>David Razviyev</h1>
            <h1>203 112 765</h1>
          </div>
        )}

        {activeTab === "xizmatlar" && (
          <div className="p-4 border border-gray-200 rounded-lg">
            <button className="w-full flex justify-between items-center p-3">
              <span>Ko‘chmas mulkka oid shartnoma</span>
              <Download />
            </button>
          </div>
        )}

        {activeTab === "xavfsizlik" && (
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="w-full flex justify-between items-center p-3">
              <span>Foudalanuvchini bloklash yoki blokdan chiqarish</span>
              <Switch id="airplane-mode" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UniqueUser;
