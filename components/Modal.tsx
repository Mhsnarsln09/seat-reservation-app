import React from 'react';

interface ModalProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded p-6 w-96 shadow-lg">
                <p className="text-lg mb-4">{message}</p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onCancel}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Hayır
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Devam Et
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
