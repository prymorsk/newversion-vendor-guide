import Link from "next/link";

// import BasicModal from "@/components/BasicModal";
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';

const Sidecount = (props) => {
 
  return (
    <li>
      <Link
        href={props.name=="New Messages"?'/message':''}
        onClick={(e)=>{props.name=="New Messages"?'':e.preventDefault()}}
        className="text-[#171717] text-base lg:text-lg  xl:text-xl font-semibold p-3 xl:py-6 xl:px-9 block border-t border-[#171717]"
      >
        <span className="text-[#B13634] rounded ltr:ml-1 rtl:mr-1 ltr:float-right rtl:float-left text-3xl text-semibold py-0.5 px-1  pr-3 pl-5 lg:pl-0">
          {props.count}
        </span>
        {props.name}
      </Link>
    </li>
  );
};

export default Sidecount;
