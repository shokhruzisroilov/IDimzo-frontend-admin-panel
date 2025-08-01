import { FilePlus, Save } from "lucide-react";
import EN from "@/assets/icons/EN.png";
import UZ from "@/assets/icons/UZ.png";
import RU from "@/assets/icons/RU.png";
import { Link } from "react-router-dom";

const CreateDocuments = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Hujjat / Yaratish
      </h1>
      <div className="bg-white rounded-xl shadow-md p-6  mx-auto">
        {/* Form Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Nomi"
            className="w-full sm:w-1/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <select className="w-full sm:w-1/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
            <option value="">Kategoriyalar</option>
            <option value="shartnoma">Shartnoma</option>
            <option value="hisobot">Hisobot</option>
            <option value="dalolatnoma">Dalolatnoma</option>
            <option value="arizalar">Arizalar</option>
          </select>
          <button className="flex justify-center items-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto">
            <Save size={20} />
            <span>Saqlash</span>
          </button>
        </div>
        {/* Document Buttons Section */}
        <div className="grid gap-4">
          {[
            { flag: UZ, text: "O'zbekcha hujjat", url: "uz" },
            { flag: UZ, text: "Ўзбекча ҳужжат", url: "oz" },
            { flag: RU, text: "Русский hujjat", url: "ru" },
            { flag: EN, text: "English hujjat", url: "en" },
          ].map((doc, index) => (
            <Link to={doc?.url} key={index}>
              <button className="flex justify-between items-center w-full p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition">
                <div className="flex items-center gap-3">
                  <img
                    src={doc.flag}
                    alt={`${doc.text} flag`}
                    className="w-8 h-8 object-contain"
                  />
                  <span className="text-gray-800 font-medium">{doc.text}</span>
                </div>
                <FilePlus size={20} className="text-black" />
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateDocuments;
