const Modal = ({ isOpen, onClose, children }) => {
    return isOpen ? (
      
        <div data-modal-backdrop="static" data-modal-placement="top-center" tabIndex="-1" aria-hidden="true" id="request_qoute" className="fixed top-0 left-0 right-0 z-50  w-full p-6 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-0rem)] max-h-full bg-gray-500 bg-opacity-50 transition-opacity z-50">
        <div className="request_qoute_content relative sm:top-3rem left-0 right-0  w-full max-w-4xl max-h-full mx-auto" >
           <div className="relative bg-white rounded-md shadow-lg " >
            <div className="py-2 px-2">
               <button type="button" className="close_button bg-gray-800 text-white hover:bg-gray-900 hover:text-white rounded-full text-sm w-9 h-9 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-900 dark:hover:text-white  float-right"   onClick={onClose}>
                  <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
               </button>
               </div>
               <div className="py-8 sm:py-10 px-8 sm:px-16">
                 {children}
               </div>
           </div>
        </div>
     </div>
     

    ) : null;
};

export default Modal;