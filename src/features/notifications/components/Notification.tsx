import { Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../../components/common/DeleteModal";

const Notification = () => {
  const navigate = useNavigate();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [title, setTitle] = useState("Assalomu alaykum");

  useEffect(() => {
    console.log(setTitle("Yangilik"));
  }, []);
  const toggleModal = () => {
    setOpenDeleteModal(!openDeleteModal);
  };
  return (
    <div className="p-6  min-h-[87vh] overflow-hidden">
      <h1 className="text-2xl font-bold mb-6">Bildirishnoma</h1>
      <button
        onClick={() => navigate("create-notification")}
        className="bg-mainColor flex items-center gap-2 py-2 px-6 rounded-lg text-white mb-10"
      >
        <Plus className="w-5 h-5" /> <span>Qo'shish</span>
      </button>

      <ul className="flex items-center border-2 border-gray-200 px-4 py-6 rounded-xl cursor-pointer mb-5">
        <li className="w-[3%] ">1</li>
        <li className="w-[10%] ">
          <h2 className="font-bold">Message</h2>
          <span className="text-slate-400">Assalomu alaykum</span>
        </li>
        <li className="w-[50%] "></li>
        <li className="w-[15%] ">
          <h2 className="font-bold">Chiqish sanasi</h2>
          <span className="text-slate-400">15.04.2025</span>
        </li>
        <li className="w-[15%] ">
          <h2 className="font-bold">Tugash sanasi</h2>
          <span className="text-slate-400">25.04.2025</span>
        </li>
        <li className="ml-auto">
          <button
            onClick={toggleModal}
            className="group flex items-center gap-2 py-2 px-6 rounded-xl text-white border border-red-500 hover:bg-red-500"
          >
            <span className="text-red-500 font-bold group-hover:text-white">
              O'chirish
            </span>
            <Trash className="w-5 h-5 text-red-500 group-hover:text-white" />
          </button>
        </li>
      </ul>
      <ul className="flex items-center border-2 border-gray-200 px-4 py-6 rounded-xl cursor-pointer mb-5">
        <li className="w-[3%] ">1</li>
        <li className="w-[10%] ">
          <h2 className="font-bold">Message</h2>
          <span className="text-slate-400">Assalomu alaykum</span>
        </li>
        <li className="w-[50%] "></li>
        <li className="w-[15%] ">
          <h2 className="font-bold">Chiqish sanasi</h2>
          <span className="text-slate-400">15.04.2025</span>
        </li>
        <li className="w-[15%] ">
          <h2 className="font-bold">Tugash sanasi</h2>
          <span className="text-slate-400">25.04.2025</span>
        </li>
        <li className="ml-auto">
          <button
            onClick={toggleModal}
            className="group flex items-center gap-2 py-2 px-6 rounded-xl text-white border border-red-500 hover:bg-red-500"
          >
            <span className="text-red-500 font-bold group-hover:text-white">
              O'chirish
            </span>
            <Trash className="w-5 h-5 text-red-500 group-hover:text-white" />
          </button>
        </li>
      </ul>
      <ul className="flex items-center border-2 border-gray-200 px-4 py-6 rounded-xl cursor-pointer mb-5">
        <li className="w-[3%] ">1</li>
        <li className="w-[10%] ">
          <h2 className="font-bold">Message</h2>
          <span className="text-slate-400">Assalomu alaykum</span>
        </li>
        <li className="w-[50%] "></li>
        <li className="w-[15%] ">
          <h2 className="font-bold">Chiqish sanasi</h2>
          <span className="text-slate-400">15.04.2025</span>
        </li>
        <li className="w-[15%] ">
          <h2 className="font-bold">Tugash sanasi</h2>
          <span className="text-slate-400">25.04.2025</span>
        </li>
        <li className="ml-auto">
          <button
            onClick={toggleModal}
            className="group flex items-center gap-2 py-2 px-6 rounded-xl text-white border border-red-500 hover:bg-red-500"
          >
            <span className="text-red-500 font-bold group-hover:text-white">
              O'chirish
            </span>
            <Trash className="w-5 h-5 text-red-500 group-hover:text-white" />
          </button>
        </li>
      </ul>
      <ul className="flex items-center border-2 border-gray-200 px-4 py-6 rounded-xl cursor-pointer mb-5">
        <li className="w-[3%] ">1</li>
        <li className="w-[10%] ">
          <h2 className="font-bold">Message</h2>
          <span className="text-slate-400">Assalomu alaykum</span>
        </li>
        <li className="w-[50%] "></li>
        <li className="w-[15%] ">
          <h2 className="font-bold">Chiqish sanasi</h2>
          <span className="text-slate-400">15.04.2025</span>
        </li>
        <li className="w-[15%] ">
          <h2 className="font-bold">Tugash sanasi</h2>
          <span className="text-slate-400">25.04.2025</span>
        </li>
        <li className="ml-auto">
          <button
            onClick={toggleModal}
            className="group flex items-center gap-2 py-2 px-6 rounded-xl text-white border border-red-500 hover:bg-red-500"
          >
            <span className="text-red-500 font-bold group-hover:text-white">
              O'chirish
            </span>
            <Trash className="w-5 h-5 text-red-500 group-hover:text-white" />
          </button>
        </li>
      </ul>

      <DeleteModal
        isOpen={openDeleteModal}
        onClose={toggleModal}
        title={title}
      />
    </div>
  );
};

export default Notification;
