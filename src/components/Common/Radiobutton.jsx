const Input = (props) => {

  return (
                      <input
                      type="radio"
                      name={`${props.name}`} id={`${props.id}`}
                      className="w-5 h-5  ring-0 ring-offset-0 focus:bg-violet-500  border-black"
                    />
  ) 
}

export default Input;
