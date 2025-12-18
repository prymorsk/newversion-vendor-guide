import Link from "next/link";

const HeaderDropdown = ({ magazines, activemenu }) => {
 
  return (
    <>
       <ul className="head_pulbication_dropdown-menu absolute left-[8.2rem] top-0  hidden w-[8rem] text-gray-700 pt-1 mt-2 z-50 bg-white shadow-solid-primary ">
              
              {magazines && magazines?.data.map((item, index) => (
                <li className="py-1" key={index}>
               
    { (item.front_image_link) 
	?

			   <Link
				  target="_blank"  href={`${item.front_image_link}`}
                  className="px-3 pt-2 text-sm font-bold hover:bg-gray-50/50 block dark:hover:bg-zinc-700/50"
				  > 
				  <i className="mdi mdi-face-man text-16 align-middle mr-1"></i>
                  {item.title}
                </Link>
				   
				  
                
				   :
				   
                   <Link 
				  href={`/publication/${item.slug}`}
                  className="px-3 pt-2 text-sm font-bold hover:bg-gray-50/50 block dark:hover:bg-zinc-700/50"
				  >
				  <i className="mdi mdi-face-man text-16 align-middle mr-1"></i>
                  {item.title}
                </Link>
				  
				  
                
                
				
				}
				
              </li>
              ))}               
          </ul>
    </>
  );
};

export default HeaderDropdown;
