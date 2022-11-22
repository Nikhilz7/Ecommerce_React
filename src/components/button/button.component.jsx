import './button.styles.scss';

const BUTTON_TYPES_CLASSES = { 
    google: 'google-sign-in',
    inverted: 'inverted'
};

const Button = ({ childern, buttonType, ...otherProps }) => {
    return(
        <button className={`button-container ${BUTTON_TYPES_CLASSES[buttonType]}`} {...otherProps}>
            {childern}
        </button>  
    )
}

export default Button;