import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({ to, href, children, onClick, primary }) {
    const classes = cx('btn', {
        primary,
    });
    const props = {
        onClick,
    };
    let CompStyle = 'button';

    if (to) {
        props.to = to;
        CompStyle = Link;
    } else if (href) {
        props.href = href;
        CompStyle = 'a';
    }

    return (
        <CompStyle className={classes} {...props}>
            <span>{children}</span>
        </CompStyle>
    );
}

export default Button;
