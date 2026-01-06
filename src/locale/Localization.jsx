import { useState, useEffect } from 'react';

//import { ConfigProvider, theme } from 'antd';

import { useSelector } from 'react-redux';

import { selectLangState } from '@/redux/translate/selectors';

//import antdLocale from './antdLocale';

//import { antdLocale } from '@/externalref/antd/lib/locale/en_US';

export default function Localization({ children }) {
    const { langCode, langDirection } = useSelector(selectLangState);

    const [locale, setLocal] = useState();
    const [direction, setDirection] = useState();

    console.log("Localization");

    useEffect(() => {
        //const lang = antdLocale[langCode];
        //setDirection(langDirection);
        //setLocal(lang);
        const lang = "en_us";
        setDirection(langDirection);
        setLocal(lang);
    }, [langCode]);


    return (
        <div>{children}</div>
    );
    // return (
    //   <ConfigProvider
    //     direction={direction}
    //     locale={locale}
    //     theme={{
    //       // algorithm: theme.darkAlgorithm,
    //       token: {
    //         colorPrimary: '#1640D6',
    //         colorLink: '#1640D6',

    //         // borderRadius: 8,
    //       },
    //     }}
    //   >
    //     {children}
    //   </ConfigProvider>
    // );
}
