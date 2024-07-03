'use client';

import styles from '@/styles/components/common/multi-select.module.scss';
import { handleClickOutside } from '@/utils/functions/handle-click-outside';
import { toggleItemSelection } from '@/utils/functions/toggle-item-selection';
import { useEffect, useRef, useState } from 'react';

export const MultiSelect = ({ data, defaultValues, name, title }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState(
        defaultValues ? defaultValues.map((item) => item.value) : []
    );
    const dropdownRef = useRef(null);

    const handleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    useEffect(() => {
        document.addEventListener('mousedown', (event) =>
            handleClickOutside(event, dropdownRef, setIsDropdownOpen)
        );

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <fieldset className={styles.dropdown} ref={dropdownRef}>
            <input type="hidden" name={name} value={selectedItems} />
            <button
                type="button"
                className={styles.button}
                title={`Select ${title}`}
                onClick={handleDropdown}
            >
                {selectedItems.length > 0
                    ? `${selectedItems.length} selected`
                    : `Select ${title}`}
            </button>
            {isDropdownOpen && (
                <div className={styles.panel}>
                    {data.map((item, index) => (
                        <fieldset className={styles.inputGroup} key={index}>
                            <input
                                id={item.value}
                                type="checkbox"
                                checked={selectedItems.includes(item.value)}
                                onChange={() =>
                                    toggleItemSelection(
                                        item.value,
                                        setSelectedItems
                                    )
                                }
                            />
                            <label title={item.label} htmlFor={item.value}>
                                {item.label}
                            </label>
                        </fieldset>
                    ))}
                </div>
            )}
        </fieldset>
    );
};