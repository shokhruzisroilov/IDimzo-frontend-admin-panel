import { Plus } from "lucide-react";
import SidebarIcon from "../../../components/common/SidebarIcon";
import type { FC } from "react";

interface SideBarProps {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar: FC<SideBarProps> = ({ setIsOpenModal }) => {
  return (
    <nav className="flex-1 overflow-y-auto">
      <SidebarIcon />
      <ul className="p-2 mt-3">
        <li className="mb-1">
          <button
            onClick={() => setIsOpenModal(true)}
            className="flex justify-center items-center p-2 rounded bg-mainColor text-white w-full gap-1"
          >
            <Plus />
            <span>Bo'lim qo'shish</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default SideBar;
