import { useEffect, useRef, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';

import * as searchService from '~/services/searchService';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icon';
import { useDebounce } from '~/hooks';

import classNames from 'classnames/bind';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const debounced = useDebounce(searchValue, 800);

    const inputRef = useRef();

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);
            const result = await searchService.search(debounced);
            setSearchResult(result);
            setLoading(false);
        };
        fetchApi();
    }, [debounced]);

    const handleClearSearchValue = () => {
        setSearchValue('');
        inputRef.current.focus();
        setSearchResult([]);
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChangeValue = (e) => {
        const valueSearch = e.target.value;
        if (valueSearch.startsWith(' ')) {
            return;
        } else {
            setSearchValue(valueSearch);
        }
    };

    return (
        <div className={cx('wrapper-search')}>
            <Tippy
                visible={showResult && searchResult.length > 0}
                interactive
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <div className={cx('search-title')}>Accounts</div>
                            {searchResult.map((result) => (
                                <AccountItem key={result.id} data={result} />
                            ))}
                            {searchValue && (
                                <h4 className={cx('search-results')}>View all results for "{searchValue}"</h4>
                            )}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        type="text"
                        ref={inputRef}
                        className={cx('search-input')}
                        placeholder="Search accounts and videos"
                        spellCheck="false"
                        value={searchValue}
                        onChange={handleChangeValue}
                        onFocus={() => setShowResult(true)}
                    />
                    <div className={cx('search-status')}>
                        {!!searchValue && !loading && (
                            <FontAwesomeIcon
                                className={cx('search-status-clear')}
                                icon={faCircleXmark}
                                onClick={handleClearSearchValue}
                            />
                        )}
                        {loading && <FontAwesomeIcon className={cx('search-status-loading')} icon={faSpinner} />}
                    </div>

                    <div className={cx('search-btn')}>
                        <SearchIcon />
                    </div>
                </div>
            </Tippy>
        </div>
    );
}

export default Search;
