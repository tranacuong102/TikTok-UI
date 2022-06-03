import { useState } from 'react';

import Tippy from '@tippyjs/react/headless';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleXmark,
    faSpinner,
    faMagnifyingGlass,
    faPlus,
    faEllipsisVertical,
    faEarthAsia,
    faCircleQuestion,
    faKeyboard,
} from '@fortawesome/free-solid-svg-icons';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import Button from '~/components/Button';

import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/assets/images';
import AccountItem from '~/components/AccountItem';
import Menu from '~/components/Popper/Menu';
const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia}></FontAwesomeIcon>,
        title: 'English',
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion}></FontAwesomeIcon>,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard}></FontAwesomeIcon>,
        title: 'Keyboard Shortcuts',
    },
];

function Header() {
    const [searchResult, setSearchResult] = useState('');

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <img src={images.logo} alt="TikTok" />
                <div className={cx('wrapper-search')}>
                    <Tippy
                        visible={searchResult !== ''}
                        interactive
                        render={(attrs) => (
                            <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                                <PopperWrapper>
                                    <h4 className={cx('search-title')}>Accounts</h4>
                                    <AccountItem />
                                    <AccountItem />
                                </PopperWrapper>
                            </div>
                        )}
                    >
                        <div className={cx('search')}>
                            <input
                                type="text"
                                className={cx('search-input')}
                                placeholder="Search accounts and videos"
                                spellCheck="false"
                                value={searchResult}
                                onChange={(e) => setSearchResult(e.target.value)}
                            />
                            <div className={cx('search-status')}>
                                <FontAwesomeIcon className={cx('search-status-loading')} icon={faSpinner} />
                                <FontAwesomeIcon className={cx('search-status-clear')} icon={faCircleXmark} />
                            </div>

                            <div className={cx('search-btn')}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </div>
                        </div>
                    </Tippy>
                </div>
                <div className={cx('actions')}>
                    <Button link to="./upload" sizeM leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                        Upload
                    </Button>
                    <Button primary>Login</Button>
                    <Menu items={MENU_ITEMS}>
                        <div className={cx('menu')}>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </div>
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
