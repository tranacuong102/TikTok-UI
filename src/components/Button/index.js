import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    primary,
    outline,
    rounded,
    link,
    disable,
    sizeM,
    to,
    href,
    children,
    leftIcon,
    onClick,
    ...passProps
}) {
    const props = {
        onClick,
        ...passProps,
    };
    const classes = cx('btn', {
        primary,
        outline,
        rounded,
        link,
        sizeM,
        disable,
    });

    // Remove events listener when btn is disable
    if (disable) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

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
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
        </CompStyle>
    );
}

export default Button;
