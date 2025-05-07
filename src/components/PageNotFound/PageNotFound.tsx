import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Page Not Found</h1>
            <Button
                type="primary"
                key="home"
                onClick={() => navigate('/')}
        >
            Back Home
            </Button>
            &nbsp;
            <Button
                key="login"
                onClick={() => navigate('/login')}
            >
                Go to Login
            </Button>
        </div>
    );
};

export default PageNotFound; 