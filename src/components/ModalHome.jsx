"use client";

const ModalHome = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 bg-gray-500 bg-opacity-50 setzindexc"
      onClick={onClose} // overlay click
    >
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-white rounded-md shadow-lg w-full max-w-4xl">
          
          {/* ❌ CLOSE BUTTON */}
          <button
            type="button"
            className="absolute top-3 right-3 z-50 bg-gray-800 text-white hover:bg-gray-900 rounded-full w-9 h-9 flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            ✕
          </button>

          <div className="py-8 sm:py-10 px-8 sm:px-16 requestpopupc ">
            {children}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ModalHome;
