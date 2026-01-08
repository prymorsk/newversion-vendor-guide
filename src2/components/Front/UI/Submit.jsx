import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
const   Submit = (props) => {
    return (
        <button type="submit" className="block sm:w-auto w-full rounded-md bg-[#c13e27] px-10 py-3 text-center text-base font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        disabled={props.disabled} >{props.button} {(props.is_loding==true) ? <FontAwesomeIcon icon={faSpinner} spin /> : ""}</button>
        // <button {...props} />
    )
}

export default Submit                                                                                                                                                                                                                                                                                                                                                                                                            