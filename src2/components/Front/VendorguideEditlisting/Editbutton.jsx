import Link  from "next/link"
const Editbutton = (props) =>{
    return(
        <>
      
                          <Link
                            href={props.link}
                            className={`${props.property} px-8 sm:px-10 lg:px-12 py-2 lg:py-2 text-center  bg-[#221F20] md:text-base text:lg tracking-wide font-medium font-lato text-white shadow-sm hover:bg-[#221F20] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#221F20]`}
                          >
                          {props.name}
                          </Link>
                     
        </>
    )
}

export default Editbutton