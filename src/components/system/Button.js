const Button = ({ field, size, fill, disabled, onClick, url }) => {
    return (
        <div
            className="button"
            data-type={fill ? 'fill' : 'default'}
            onClick={onClick}
            style={{
                opacity: disabled ? 0.5 : 1,
                cursor: disabled ? 'not-allowed' : 'pointer',
                pointerEvents: disabled ? 'none' : 'auto',
            }}
        >
            <div className="button_wrapper" data-size={size === 'big' ? 'big' : 'small'}>
                <div className="button_text">
                    {url ? <a href={url}>{field}</a> : <span>{field}</span>}
                </div>

                <div className="button_icon">
                    <div className="button_icon_circle">
                        <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.93275 2.588L1.00475 11.5L0.09275 10.604L9.03675 1.676H2.66875V0.459999L10.2528 0.459999L11.1648 1.356V8.94H9.93275V2.588Z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Button;
