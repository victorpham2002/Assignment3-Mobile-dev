import { useState } from 'react';

export const useTogglePasswordShow = () => {

    const [passwordShow, setPasswordShow] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye');

    const handlePasswordShow = () => {
        if (rightIcon === 'eye') {
            setRightIcon('eye-off');
            setPasswordShow(!passwordShow);
        } else if (rightIcon === 'eye-off') {
            setRightIcon('eye');
            setPasswordShow(!passwordShow);
        }
    };

    return {
        passwordShow,
        rightIcon,
        handlePasswordShow
    };
};