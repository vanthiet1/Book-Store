import { useEffect } from 'react';

const TitleSetter = ({ title }) => {
    useEffect(() => {
        document.title = title;
    }, [title]);

    return null;
};

export default TitleSetter;