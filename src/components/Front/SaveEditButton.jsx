import Link from 'next/link';

const SaveEditButton = (props) => {
    return (
        
                <Link
                  href="#"
                  className="rounded-[0.7rem]  px-7 py-1 text-sm border-solid  border border-gray-500 font-semibold text-black shadow-sm hover:bg-[#B13634 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >{props.name}</Link>
             
    )
}

export default SaveEditButton;