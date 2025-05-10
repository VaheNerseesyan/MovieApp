import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import background from '../../assets/Background.png';

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <div style={{ 
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh', 
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: 20
        }}>
            <h1 style={{ 
                color: 'white', 
                marginBottom: 24,
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
            }}>
                Page Not Found
            </h1>
            <div>
                <Button
                    type="primary"
                    key="home"
                    onClick={() => navigate('/')}
                    style={{ marginRight: 8 }}
                >
                    Go Home
                </Button>
            </div>
        </div>
    );
};

export default PageNotFound;