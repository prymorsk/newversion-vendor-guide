
import Link  from "next/link"
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Pagination = (props) => {

  return (
    <>
    <div className="flex flex-1 justify-between sm:hidden">
      <Link
        href="#"
        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >Previous</ Link>
      <Link
        href="#"
        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >Next</ Link>
    </div>
    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center pb-10">
      <div>
     
        <Link
          href="#"
          aria-current="page"
          className="relative  border-b-2 border-red-400 z-10 inline-flex items-center  px-2 py-2 text-sm font-semibold text-black focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >1</ Link>
        <Link
          href="#"
          className="relative inline-flex items-center px-2 py-2 text-sm font-semibold text-gray-900  hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        >2</ Link>
        <Link
          href="#"
          className="relative hidden items-center px-2 py-2 text-sm font-semibold text-gray-900  hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
        >3</ Link>
        <span className="relative inline-flex items-center px-2 py-2 text-sm font-semibold text-gray-700  focus:outline-offset-0">4</span>
        <Link
          href="#"
          className="relative hidden items-center px-2 py-2 text-sm font-semibold text-gray-900  hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
        >5</ Link>
        <Link
          href="#"
          className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-900  hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        >
          <span className="sr-only">Next</span>
          <FontAwesomeIcon icon={faAngleRight} />
        </ Link>
      
      </div>
    </div>
  </>
  )
}

export default Pagination;
