import logo from "@/assets/icons/Logo.png";
import { Link } from "react-router-dom";

const SidebarIcon = () => {
  return (
    <div className="p-2 ">
      <Link to={"/"}>
        <img src={logo} alt="Idimzo Logo" />
      </Link>
    </div>
  );
};

export default SidebarIcon;
