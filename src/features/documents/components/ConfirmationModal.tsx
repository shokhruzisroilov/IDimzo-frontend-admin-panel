import { X } from "lucide-react";
import { useState } from "react";

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConfirmationModal: React.FC<CreateModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [isRequired, setIsRequired] = useState<boolean | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50 py-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center border-b pb-4">
          <h2 className="text-xl font-bold text-blue-800">
            Input nomini kiriting
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Name Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Nomi</label>
            <input 
              type="text" 
              placeholder="Input nomi" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Required Field */}
          <div className="space-y-2">
            <p className="block text-sm font-medium text-gray-700">
              Ushbu bo'limni to'ldirish majburiymi?
            </p>
            <div className="flex justify-between gap-4">
              {/* Yes Option */}
              <label className="flex-1 flex items-center justify-between border-2 border-blue-500 px-4 py-3 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
                <span className="text-lg">Ha</span>
                <input 
                  type="radio" 
                  name="required"
                  checked={isRequired === true}
                  onChange={() => setIsRequired(true)}
                  className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                />
              </label>

              {/* No Option */}
              <label className="flex-1 flex items-center justify-between border-2 border-blue-500 px-4 py-3 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
                <span className="text-lg">Yo'q</span>
                <input 
                  type="radio" 
                  name="required"
                  checked={isRequired === false}
                  onChange={() => setIsRequired(false)}
                  className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
          >
            Bekor qilish
          </button>
          <button
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors disabled:opacity-50"
            disabled={!name || isRequired === null}
          >
            Tasdiqlash
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;