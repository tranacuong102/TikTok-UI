import { useState } from 'react';

import Tippy from '@tippyjs/react/headless';
import TippyToolTip from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

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
    faCoins,
    faGear,
    faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { faEnvelope, faMessage, faUser } from '@fortawesome/free-regular-svg-icons';

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
        children: {
            title: 'Languages',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
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

const USER_MENU = [
    {
        icon: <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>,
        title: 'View Profile',
        to: '/@username',
    },
    {
        icon: <FontAwesomeIcon icon={faCoins}></FontAwesomeIcon>,
        title: 'Get Coins',
        to: '/coin',
    },
    {
        icon: <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>,
        title: 'Settings',
        to: '/settings',
    },
    ...MENU_ITEMS,
    {
        icon: <FontAwesomeIcon icon={faArrowRightFromBracket}></FontAwesomeIcon>,
        title: 'Log out',
        to: '/logout',
        separate: true,
    },
];

function Header() {
    const [searchResult, setSearchResult] = useState('');

    // Handle Logic
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                console.log(menuItem);
                break;
            default:
                throw new Error('Invalid type');
        }
    };

    const userLogin = true;

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
                    {userLogin ? (
                        <>
                            <div className={cx('actions-btns')}>
                                <TippyToolTip delay={[0, 300]} content="Message" placement="bottom">
                                    <button className={cx('actions-btn')}>
                                        <FontAwesomeIcon icon={faMessage} />
                                    </button>
                                </TippyToolTip>
                                <TippyToolTip content="Inbox" placement="bottom">
                                    <button className={cx('actions-btn')}>
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </button>
                                </TippyToolTip>
                            </div>
                            <Menu items={USER_MENU} onChange={handleMenuChange}>
                                <div className={cx('avatar')}>
                                    <img
                                        className={cx('avatar-user')}
                                        src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/7105171291010760709~c5_100x100.jpeg?x-expires=1654473600&x-signature=f6DBxH90RoVLSqB1VsrRkzPQrZE%3D"
                                        alt="Trần Anh Cường"
                                    />
                                </div>
                            </Menu>
                        </>
                    ) : (
                        <>
                            <Button link to="./upload" sizeM leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                                Upload
                            </Button>
                            <Button primary>Login</Button>
                            <Menu items={MENU_ITEMS} onChange={handleMenuChange}>
                                <div className={cx('menu')}>
                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                </div>
                            </Menu>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
