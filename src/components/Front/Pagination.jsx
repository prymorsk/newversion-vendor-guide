import React from 'react'
import Link from "next/link";


function Pagnation({totalPostCount}) {
//  const router = useRouter()

/*
 pages give number,base on number we create a array. base on array we map a list elements
 totalPostCount = 3
 conver into array [0,1,2]
 base on array create list in array
 
*/

  let pageIntoArray = Array.from(Array(totalPostCount).keys())
  

  return (
    <nav >
        {
          pageIntoArray.map(page => {
            return < >
              <Link href={ page === 0 ? "/resources" : `/resources/${page + 1}` } className="relative inline-flex items-center px-2 py-2 text-sm font-semibold text-gray-900  hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                {page + 1} 
              </Link>
            </>
          })
        }
    </nav>
  )
}

export default Pagnation