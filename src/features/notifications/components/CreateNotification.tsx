import { CirclePlus, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import Modal from "./Modal";
import type { ChangeEvent } from "react";

type LanguageCode = "uz" | "uzc" | "kaa" | "ru" | "en";

interface NotificationFormData {
  content: string;
  media: {
    file: File | null;
    previewUrl: string;
  };
}

const CreateNotification = () => {
  const [formData, setFormData] = useState<{
    [key in LanguageCode]: NotificationFormData;
  }>({
    uz: { content: "", media: { file: null, previewUrl: "" } },
    uzc: { content: "", media: { file: null, previewUrl: "" } },
    kaa: { content: "", media: { file: null, previewUrl: "" } },
    ru: { content: "", media: { file: null, previewUrl: "" } },
    en: { content: "", media: { file: null, previewUrl: "" } },
  });

  const [openModal, setOpenModal] = useState(false);

  // Har bir Quill instansiyasi uchun ref'lar
  const quillInstances = useRef<{
    uz: Quill | null;
    uzc: Quill | null;
    kaa: Quill | null;
    ru: Quill | null;
    en: Quill | null;
  }>({
    uz: null,
    uzc: null,
    kaa: null,
    ru: null,
    en: null,
  });

  // Har bir editor uchun container ref'lari
  const editorRefs: Record<LanguageCode, React.RefObject<HTMLDivElement>> = {
    uz: useRef(null),
    uzc: useRef(null),
    kaa: useRef(null),
    ru: useRef(null),
    en: useRef(null),
  };

  // Fayl input ref'lari
  const fileInputRefs: Record<LanguageCode, React.RefObject<HTMLInputElement>> = {
    uz: useRef(null),
    uzc: useRef(null),
    kaa: useRef(null),
    ru: useRef(null),
    en: useRef(null),
  };

  // Quill toolbar sozlamalari
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  // Quill muharririni yaratish
  const setupEditor = (
    ref: React.RefObject<HTMLDivElement>,
    key: LanguageCode,
    value: string,
    setValue: (langCode: LanguageCode, content: string) => void
  ) => {
    if (ref.current && !quillInstances.current[key]) {
      const quill = new Quill(ref.current, {
        theme: "snow",
        modules,
        placeholder: "Xabarni yozing...",
      });

      // Dastlabki qiymatni o'rnatish
      if (value) {
        quill.root.innerHTML = value;
      }

      // Matn o'zgarganda holatni yangilash
      quill.on("text-change", () => {
        setValue(key, quill.root.innerHTML);
      });

      quillInstances.current[key] = quill;
    }
  };

  // Har bir editorni sozlash
  useEffect(() => {
    setupEditor(editorRefs.uz, "uz", formData.uz.content, (langCode, content) =>
      setFormData((prev) => ({
        ...prev,
        [langCode]: { ...prev[langCode], content },
      }))
    );
    setupEditor(
      editorRefs.uzc,
      "uzc",
      formData.uzc.content,
      (langCode, content) =>
        setFormData((prev) => ({
          ...prev,
          [langCode]: { ...prev[langCode], content },
        }))
    );
    setupEditor(
      editorRefs.kaa,
      "kaa",
      formData.kaa.content,
      (langCode, content) =>
        setFormData((prev) => ({
          ...prev,
          [langCode]: { ...prev[langCode], content },
        }))
    );
    setupEditor(
      editorRefs.ru,
      "ru",
      formData.ru.content,
      (langCode, content) =>
        setFormData((prev) => ({
          ...prev,
          [langCode]: { ...prev[langCode], content },
        }))
    );
    setupEditor(
      editorRefs.en,
      "en",
      formData.en.content,
      (langCode, content) =>
        setFormData((prev) => ({
          ...prev,
          [langCode]: { ...prev[langCode], content },
        }))
    );

    // Komponent unmount bo'lganda tozalash
    return () => {
      Object.values(quillInstances.current).forEach((quill) => {
        if (quill) {
          quill.off("text-change");
        }
      });
    };
  }, [formData]);

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    langCode: LanguageCode
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        [langCode]: {
          ...prev[langCode],
          media: {
            file,
            previewUrl: URL.createObjectURL(file),
          },
        },
      }));
    }
  };

  const handleRemoveFile = (langCode: LanguageCode) => {
    setFormData((prev) => ({
      ...prev,
      [langCode]: {
        ...prev[langCode],
        media: { file: null, previewUrl: "" },
      },
    }));
    if (fileInputRefs[langCode].current) {
      fileInputRefs[langCode].current!.value = "";
    }
  };

  // Formani yuborish
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // const notificationData = {
    //   content: {
    //     uz: formData.uz.content,
    //     uzc: formData.uzc.content,
    //     kaa: formData.kaa.content,
    //     ru: formData.ru.content,
    //     en: formData.en.content,
    //   },
    //   media: {
    //     uz: formData.uz.media,
    //     uzc: formData.uzc.media,
    //     kaa: formData.kaa.media,
    //     ru: formData.ru.media,
    //     en: formData.en.media,
    //   },
    // };
    setOpenModal(true);
  };

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const languages: { code: LanguageCode; label: string }[] = [
    { code: "uz", label: "O'zbekcha Message" },
    { code: "uzc", label: "Узбекский Message" },
    { code: "kaa", label: "Qaraqalpaq Message" },
    { code: "ru", label: "Русский Message" },
    { code: "en", label: "English Message" },
  ];

  return (
    <div className="p-6 min-h-[87vh] overflow-hidden">
      <h1 className="text-2xl font-bold mb-6">Bildirishnoma / Qo'shish</h1>

      <form onSubmit={handleSubmit}>
        {languages.map((lang) => (
          <div key={lang.code} className="mb-8">
            <h2 className="mb-2 text-lg font-semibold">{lang.label}</h2>
            <div className="flex gap-4 items-start">
              <div className="w-[60%] rounded-lg border border-gray-300 bg-white">
                <div
                  ref={editorRefs[lang.code]}
                  style={{ minHeight: "227px" }}
                />
              </div>
              <div className="w-[20%]">
                <p className="mb-2 font-medium">
                  375x816 (WEBP, PNG, JPG)(10MB)*
                </p>
                <input
                  type="file"
                  ref={fileInputRefs[lang.code]}
                  onChange={(e) => handleFileChange(e, lang.code)}
                  accept=".webp,.png,.jpg,.jpeg"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRefs[lang.code].current?.click()}
                  className="w-[100px] h-[100px] bg-gray-200 rounded-lg border-dotted border-2 flex items-center justify-center relative overflow-hidden"
                >
                  {formData[lang.code].media.previewUrl ? (
                    <div className="relative w-full h-full">
                      <img
                        src={formData[lang.code].media.previewUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFile(lang.code);
                        }}
                        className="absolute -top-0 -right-0 bg-red-500 text-white rounded-full p-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <CirclePlus className="w-6 h-6 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Bildirishnomani Saqlash
          </button>
        </div>

        <Modal isOpen={openModal} onClose={toggleModal} />
      </form>
    </div>
  );
};

export default CreateNotification;