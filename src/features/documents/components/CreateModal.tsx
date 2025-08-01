import React, { useState } from "react";
import { Plus, X } from "lucide-react";

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  openConfirmationModal:() => void;
}

const CreateModal: React.FC<CreateModalProps> = ({ isOpen, onClose, openConfirmationModal }) => {
  const [formData, setFormData] = useState({
    number1: "",
    select: "",
    text1: "",
    date1: "",
    email: "",
    password: "",
    tel: "",
    url: "",
    search: "",
    textarea: "",
    file: null as File | null,
    passport: "",
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const target = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, file: target.files?.[0] || null }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };


  const handleConfirmation = () => {
    onClose()
    openConfirmationModal()
  }
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50  py-4">
      <div className="bg-white rounded-lg p-5 max-w-4xl w-full mx-4 my-8">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-blue-800">Create New Entry</h2>
          <button onClick={onClose}>
            <X className="bg-blue-100 rounded-full p-1 text-2xl text-blue-800 hover:bg-blue-200" />
          </button>
        </div>
        
        <div className="flex flex-wrap w-full justify-between overflow-y-auto" style={{ maxHeight: '85vh' }}>
          {/* Number Input */}
          <div className="border-2 border-blue-200 rounded-lg px-4 py-2 mb-3 w-[48%] bg-blue-50">
            <p className="text-blue-600 mb-1 font-medium">Number Inputttt</p>
            <div className="flex gap-3 items-center">
              <input  
                type="number"
                name="number1"
                value={formData.number1}
                onChange={handleChange}
                placeholder="Enter a number"
                className="flex-1 p-3 border border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
              <Plus onClick={handleConfirmation} className="bg-blue-200 rounded-full p-1 w-8 h-8 text-blue-700 hover:bg-blue-300 cursor-pointer" />
            </div>
          </div>

          {/* Select Input */}
          <div className="border-2 border-blue-200 rounded-lg px-4 py-2 mb-3 w-[48%] bg-blue-50">
            <p className="text-blue-600 mb-1 font-medium">Select Option</p>
            <div className="flex gap-3 items-center">
              <select
                name="select"
                value={formData.select}
                onChange={handleChange}
                className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="">Choose an option</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
              </select>
              <Plus className="bg-blue-200 rounded-full p-1 w-8 h-8 text-blue-700 hover:bg-blue-300 cursor-pointer" />
            </div>
          </div>

          {/* Text Input */}
          <div className="border-2 border-blue-200 rounded-lg px-4 py-2 mb-3 w-[48%] bg-blue-50">
            <p className="text-blue-600 mb-1 font-medium">Text Input</p>
            <div className="flex gap-3 items-center">
              <input
                type="text"
                name="text1"
                value={formData.text1}
                onChange={handleChange}
                placeholder="Enter text"
                className="flex-1 p-3 border border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
              <Plus className="bg-blue-200 rounded-full p-1 w-8 h-8 text-blue-700 hover:bg-blue-300 cursor-pointer" />
            </div>
          </div>

          {/* Date Input */}
          <div className="border-2 border-blue-200 rounded-lg px-4 py-2 mb-3 w-[48%] bg-blue-50">
            <p className="text-blue-600 mb-1 font-medium">Date Input</p>
            <div className="flex gap-3 items-center">
              <input
                type="date"
                name="date1"
                value={formData.date1}
                onChange={handleChange}
                className="flex-1 p-3 border border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
              <Plus className="bg-blue-200 rounded-full p-1 w-8 h-8 text-blue-700 hover:bg-blue-300 cursor-pointer" />
            </div>
          </div>

          {/* Email Input */}
          <div className="border-2 border-blue-200 rounded-lg px-4 py-2 mb-3 w-[48%] bg-blue-50">
            <p className="text-blue-600 mb-1 font-medium">Email Input</p>
            <div className="flex gap-3 items-center">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="flex-1 p-3 border border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
              <Plus className="bg-blue-200 rounded-full p-1 w-8 h-8 text-blue-700 hover:bg-blue-300 cursor-pointer" />
            </div>
          </div>

          {/* Password Input */}
          <div className="border-2 border-blue-200 rounded-lg px-4 py-2 mb-3 w-[48%] bg-blue-50">
            <p className="text-blue-600 mb-1 font-medium">Password Input</p>
            <div className="flex gap-3 items-center">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="flex-1 p-3 border border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
              <Plus className="bg-blue-200 rounded-full p-1 w-8 h-8 text-blue-700 hover:bg-blue-300 cursor-pointer" />
            </div>
          </div>

          {/* Telephone Input */}
          <div className="border-2 border-blue-200 rounded-lg px-4 py-2 mb-3 w-[48%] bg-blue-50">
            <p className="text-blue-600 mb-1 font-medium">Telephone Input</p>
            <div className="flex gap-3 items-center">
              <input
                type="tel"
                name="tel"
                value={formData.tel}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="flex-1 p-3 border border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
              <Plus className="bg-blue-200 rounded-full p-1 w-8 h-8 text-blue-700 hover:bg-blue-300 cursor-pointer" />
            </div>
          </div>

          {/* URL Input */}
          <div className="border-2 border-blue-200 rounded-lg px-4 py-2 mb-3 w-[48%] bg-blue-50">
            <p className="text-blue-600 mb-1 font-medium">URL Input</p>
            <div className="flex gap-3 items-center">
              <input
                type="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                placeholder="Enter URL"
                className="flex-1 p-3 border border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
              <Plus className="bg-blue-200 rounded-full p-1 w-8 h-8 text-blue-700 hover:bg-blue-300 cursor-pointer" />
            </div>
          </div>

          {/* Search Input */}
          <div className="border-2 border-blue-200 rounded-lg px-4 py-2 mb-3 w-[48%] bg-blue-50">
            <p className="text-blue-600 mb-1 font-medium">Search Input</p>
            <div className="flex gap-3 items-center">
              <input
                type="search"
                name="search"
                value={formData.search}
                onChange={handleChange}
                placeholder="Search..."
                className="flex-1 p-3 border border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
              <Plus className="bg-blue-200 rounded-full p-1 w-8 h-8 text-blue-700 hover:bg-blue-300 cursor-pointer" />
            </div>
          </div>

          {/* Textarea */}
          <div className="border-2 border-blue-200 rounded-lg px-4 py-2 mb-3 w-[48%] bg-blue-50">
            <p className="text-blue-600 mb-1 font-medium">Textarea</p>
            <div className="flex gap-3">
              <textarea
                name="textarea"
                value={formData.textarea}
                onChange={handleChange}
                placeholder="Enter long text"
                className="flex-1 p-3 border border-blue-300 rounded-lg h-24 resize-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
              <Plus className="bg-blue-200 rounded-full p-1 w-8 h-8 text-blue-700 hover:bg-blue-300 cursor-pointer self-center" />
            </div>
          </div>

          {/* File Input */}
          <div className="border-2 border-blue-200 rounded-lg px-4 py-2 mb-3 w-[48%] bg-blue-50">
            <p className="text-blue-600 mb-1 font-medium">File Upload</p>
            <div className="flex gap-3">
              <button
                type="button"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-200"
                onClick={() => document.getElementById("fileInput")?.click()}
              >
                Upload File
              </button>
              <input
                type="file"
                id="fileInput"
                name="file"
                onChange={handleChange}
                className="hidden"
              />
              <Plus className="bg-blue-200 rounded-full p-1 w-8 h-8 text-blue-700 hover:bg-blue-300 cursor-pointer self-center" />
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="mt-5 flex justify-end gap-4">
          <button 
            onClick={onClose}
            className="px-5 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            Cancel
          </button>
          <button 
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;