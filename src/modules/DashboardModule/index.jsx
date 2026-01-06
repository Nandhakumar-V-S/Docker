//import { Tag, Row, Col } from 'antd';
import useLanguage from '@/locale/useLanguage';

import { DashboardLayout } from '@/layout';

//import { useMoney } from '@/settings';

//import { request } from '@/request';

//import useFetch from '@/hooks/useFetch';
//import { tagColor } from '@/utils/statusTagColor';

//import RecentTable from './components/RecentTable';

//import SummaryCard from './components/SummaryCard';
//import PreviewCard from './components/PreviewCard';
//import CustomerPreviewCard from './components/CustomerPreviewCard';
//import PageLoader from '@/components/PageLoader';

import WijimoGrid from './components/Wijimo';

export default function DashboardModule() {
    const translate = useLanguage();
    //const { moneyFormatter } = useMoney();


    console.log("Dashboard Module");

    return (
        <DashboardLayout >          
            <WijimoGrid />
        </DashboardLayout>
    );
}

