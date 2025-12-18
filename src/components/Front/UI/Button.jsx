import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Button = ({ is_loding, ...props }) => (
  <button {...props} disabled={props.disabled || is_loding}>Submit {is_loding ? <FontAwesomeIcon icon={faSpinner} spin /> : ''}
  </button>
);

export default Button;
