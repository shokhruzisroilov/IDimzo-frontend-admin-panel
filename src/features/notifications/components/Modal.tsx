"use client";

import * as React from "react";
import { Calendar } from "../../../components/ui/calendar";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ isOpen, onClose }: ModalProps) => {
  const [startDate, setStartDate] = React.useState<Date | undefined>(
    new Date()
  );

  const [endDate, setEndDate] = React.useState<Date | undefined>();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-xl w-full">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-center mb-6">
            Bildirishnoma qo’shish
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="mb-2 font-semibold">Boshlanish sanasi</h2>
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                className="rounded-lg border shadow-sm"
              />

              <div className="mt-4 flex justify-end">
                <button
                  className="px-4 py-2 bg-mainColor hover:bg-blue-700 text-white rounded"
                >
                  Saqlash
                </button>
              </div>
            </div>

            <div>
              <h2 className="mb-2 font-semibold">Tugash sanasi</h2>
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                defaultMonth={startDate}
                className="rounded-lg border shadow-sm"
              />
              <div className="mt-4 flex justify-start">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded"
                >
                  Bekor qilish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
