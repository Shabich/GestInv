import React from 'react'

const DeletePopup = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg text-center max-w-xs">
        <p className="mb-5 text-gray-800">{message}</p>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue text-white rounded hover:bg-blue transition"
          >
            Annuler
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red text-white rounded hover:bg-red transition"
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeletePopup
