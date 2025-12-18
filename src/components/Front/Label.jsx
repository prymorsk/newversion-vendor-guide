const Label = (props) =>{
    return(
        <>
            <label htmlFor={props.for} className={props.className}>{props.name}</label>
        </>
    )
}

export default Label