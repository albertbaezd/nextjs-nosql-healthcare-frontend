// Modal.tsx
import React from "react";

import { Button } from "@material-tailwind/react";
import YouTube from "react-youtube";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  buttonLabel: string;
  onButtonClick: () => void; // Callback action
  videoId?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  buttonLabel,
  onButtonClick,
  videoId,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/2 max-w-[70%]">
        {videoId ? (
          <div>
            <YouTube
              videoId={videoId}
              opts={{ width: "100%", height: "315px" }}
            />
            <button
              onClick={onClose}
              className="mt-4 bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-red-300"
            >
              Close
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-semibold mb-4">{title}</h2>
            <p>{description}</p>
            <button
              onClick={onButtonClick} // API call action
              className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              {buttonLabel}
            </button>
            <button
              onClick={onClose}
              className="mt-4 bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-red-300"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
