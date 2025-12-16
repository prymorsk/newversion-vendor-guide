const Input = (props) => {

  return (
                        <input type={`${props.name}`}  name={`${props.name}`} id={`${props.id}`} className="appearance-none w-full border-solid border border-black px-4 text-[0.55rem] md:text-xl focus:outline-none focus:shadow-outline focus:border-[#221F20] placeholder:text-black placeholder:font-normal" placeholder={`${props.placeholder}`} value={`${props.value}`}
                      />
  ) 
}

export default Input;
