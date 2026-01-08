const Lable = (props) => {

  return (
                       <label for={`${props.id}`} className="absolute top-2 left-0 text-black pointer-events-none transition duration-200 ease-in-outbg-white px-3 text-grey-darker font-bold text-[0.55rem] md:text-[0.77rem]">{props.lable}</label>
  ) 
}

export default Lable;
