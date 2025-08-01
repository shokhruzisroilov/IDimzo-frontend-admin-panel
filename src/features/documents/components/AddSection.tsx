import { useState, useRef, useEffect } from "react";
import SideBar from "./SideBar";
import Modal from "../../../components/ui/Modal";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import CreateModal from "./CreateModal";
import ConfirmationModal from "./ConfirmationModal";

const AddSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState<string>("");
  const quillRef = useRef<HTMLDivElement>(null);
  const quillInstance = useRef<Quill | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isConfirmation, setIsConfirmation] = useState(false);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  useEffect(() => {
    if (quillRef.current && !quillInstance.current) {
      while (quillRef.current.firstChild) {
        quillRef.current.removeChild(quillRef.current.firstChild);
      }

      const editorContainer = document.createElement("div");
      editorContainer.style.minHeight = "500px";
      quillRef.current.appendChild(editorContainer);

      quillInstance.current = new Quill(editorContainer, {
        theme: "snow",
        modules,
        placeholder: "Hujjat matnini yozing...",
      });

      if (content) {
        quillInstance.current.root.innerHTML = content;
      }

      quillInstance.current.on("text-change", () => {
        setContent(quillInstance.current!.root.innerHTML);
      });
    }

    return () => {
      if (quillInstance.current) {
        quillInstance.current.off("text-change");
        quillInstance.current = null;
      }
    };
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200">
        <SideBar setIsOpenModal={setIsOpenModal} />
      </aside>

      <div className="flex-1 flex flex-col">
        <nav
          className="w-full h-16 bg-white shadow flex items-center justify-end group transition"
          onClick={() => setIsModalOpen(true)}
          role="button"
          aria-label="User profile options"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setIsModalOpen(true)}
        >
          <div className="flex items-center hover:bg-mainColor px-4 py-2 cursor-pointer rounded-lg">
            <div className="w-10 h-10 rounded-full mr-3 overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="https://i.pravatar.cc/40?u=1"
                alt="Avatar"
              />
            </div>
            <div className="flex flex-col mr-3">
              <span className="group-hover:text-white">Amelia Rosewood</span>
              <span className="text-sm text-gray-500 group-hover:text-white">
                Admin
              </span>
            </div>
          </div>
        </nav>

        <main className="flex-1 px-6 py-2 space-y-4 overflow-auto">
          <h1 className="text-2xl font-semibold">O'zbekcha hujjat qo'shish</h1>
          <form>
            <div className="mb-8">
              <div
                className="w-full rounded-lg border border-gray-300 bg-white"
                style={{ minHeight: "500px" }}
                ref={quillRef}
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Hujjatni Saqlash
              </button>
            </div>
          </form>
        </main>
      </div>

      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
      <CreateModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} openConfirmationModal={() => setIsConfirmation(true)}/>
      <ConfirmationModal isOpen={isConfirmation} onClose={() => setIsConfirmation(false)}/>
    </div>
  );
};

export default AddSection;
