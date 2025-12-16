const Input = (props) =>{
    return(
        <>
            <input type={props.type} className={props.className} id={props.id} placeholder={props.placeHolder}/>
        </>
    )
}

export default Input