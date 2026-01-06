import { Result, Button, } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { FrownOutlined } from '@ant-design/icons'; // Ant Design icon
import useLanguage from '@/locale/useLanguage';
import { useNavigate } from 'react-router-dom';
import { keycloak } from '@/config/keycloakconfig';
import { SSO_ENABLED} from "@/config/serverApiConfig";
// import './NotFound.css'; // Import the CSS file for custom styling

export default function NotFoundUnauth() {
  const translate = useLanguage();
  const navigate = useNavigate();

  // Handle redirect to login page
  const handleRedirect = () => {
    if(SSO_ENABLED){
      keycloak.logout();
    }
   else{
    navigate('/logout');
   }
   
  };

  return (
    <div className="not-found-container">
        <Result
      status="404"
      icon={<ExclamationCircleOutlined style={{ fontSize: '50px', color: '#faad14' }} />} // Yellow warning icon
      title="401 - Unauthorized Access"
      subTitle="OOPS! Unauthorized Access,
Kindly, Contact Administrator"
      extra={
        <Button type="primary" onClick={handleRedirect}>
          Go to Login
        </Button>
      }
    />
    </div>
  );
}
