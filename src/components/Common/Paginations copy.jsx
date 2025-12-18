// import Link from "next/link";
// import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
//   const pageNumbers = Array.from({ length: nPages }, (_, i) => i + 1);

//   const renderPageNumbers = () => {
//     const maxPagesToShow = 5;
//     const firstPage = Math.max(1, currentPage - 1);
//     const lastPage = Math.min(nPages, firstPage + maxPagesToShow - 1);

//     return pageNumbers.slice(firstPage - 1, lastPage).map((pageNumber) => (
//       <Link
//         key={pageNumber}
//         href="#"
//         onClick={(e) => { e.preventDefault(); setCurrentPage(pageNumber) }}
//         aria-current={currentPage === pageNumber ? 'page' : undefined}
//         className={`relative inline-flex items-center px-3 py-2 text-sm font-semibold ${
//           currentPage === pageNumber
//             ? 'text-white bg-[#B13634] hover:bg-[#B13634]'
//             : 'text-gray-900 hover:bg-gray-50'
//         } focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 border border-gray-300`}
//       >
//         {pageNumber}
//       </Link>
//     ));
//   };

//   return (
//     <div className="flex items-center justify-center px-4 py-3 sm:px-6 pt-10">
//       <div className="sm:flex sm:flex-1 sm:items-center sm:justify-center">
//         <Link
//           href="#"
//           onClick={(e) => { e.preventDefault(); setCurrentPage(currentPage - 1) }}
//           className={`relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50`}
//         >
//           <span className="mr-2">
//             <FontAwesomeIcon icon={faAngleLeft} />
//           </span>
//         </Link>
        
//         {renderPageNumbers()}
        
//         <Link
//           href="#"
//           onClick={(e) => { e.preventDefault(); setCurrentPage(currentPage + 1) }}
//           className={`${
//             currentPage === nPages ? 'hidden' : ''
//           } relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-700 hover-bg-gray-50`}
//         >
//           <span className="ml-2">
//             <FontAwesomeIcon icon={faAngleRight} />
//           </span>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Pagination;


import Link from "next/link";
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Pagination = ({ nPages, currentPage, onPageChange }) => {
  const pageNumbers = Array.from({ length: nPages }, (_, i) => i + 1);

  const renderPageNumbers = () => {
    const maxPagesToShow = 5;
    const firstPage = Math.max(1, currentPage -  Math.floor(maxPagesToShow / 2));
    const lastPage = Math.min(nPages, firstPage + maxPagesToShow - 1);

    console.log('firstPage=' , firstPage);
    console.log('lastpage=' , lastPage);

    return pageNumbers.slice(firstPage - 1, lastPage).map((pageNumber) => (
      <Link
        key={pageNumber}
        href="#"
        onClick={(e) => { e.preventDefault(); onPageChange(pageNumber) }}
        aria-current={currentPage === pageNumber ? 'page' : undefined}
        className={`relative inline-flex items-center px-3 py-2 text-sm font-semibold ${
          currentPage === pageNumber
            ? 'text-white bg-[#B13634] hover:bg-[#B13634]'
            : 'text-gray-900 hover:bg-gray-50'
        } focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 border border-gray-300`}
      >
        {pageNumber}
      </Link>
    ));
  };

  

  return (
    <div className="flex items-center justify-center px-4 py-3 sm:px-6 pt-10">
      <div className="sm:flex sm:flex-1 sm:items-center sm:justify-center">
        <Link
          href="#"
          onClick={(e) => { e.preventDefault(); onPageChange(currentPage - 1) }}
          className={`relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50`}
        >
          <span className="mr-2">
            <FontAwesomeIcon icon={faAngleLeft} />
          </span>
        </Link>
        
        {renderPageNumbers()}
        
        <Link
          href="#"
          onClick={(e) => { e.preventDefault(); onPageChange(currentPage + 1) }}
          className={`${
            currentPage === nPages ? 'hidden' : ''
          } relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50`}
        >
          <span className="ml-2">
            <FontAwesomeIcon icon={faAngleRight} />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Pagination;