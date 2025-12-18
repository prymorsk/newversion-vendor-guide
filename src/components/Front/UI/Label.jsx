const label = (props) => {
    return (
        <label className={`block text-lg font-semibold leading-6 text-[#3B3C40] ${props.required}`} {...props}>
            {props.label}
            {props.required === "required" && (
                <span className="text-[#c13e27] text-sm font-normal italic">*</span>
            )}
        </label>
    )
}

export default label                                                                                                                                                                                                                                                                                                                                                                                                            