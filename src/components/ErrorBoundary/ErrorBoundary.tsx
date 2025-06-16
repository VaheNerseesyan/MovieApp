import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom';
import { Button, Result } from 'antd';

export default function ErrorBoundary() {
    const error = useRouteError();
    const navigate = useNavigate();

    let errorMessage: string;

    if (isRouteErrorResponse(error)) {
        errorMessage = error.statusText || error.data?.message || 'Something went wrong';
    } else if (error instanceof Error) {
        errorMessage = error.message;
    } else if (typeof error === 'string') {
        errorMessage = error;
    } else {
        errorMessage = 'An unexpected error occurred';
    }

    return (
        <Result
            status="error"
            title="Oops!"
            subTitle={errorMessage}
            extra={[
                <Button type="primary" key="home" onClick={() => navigate('/')}>
                    Go Home
                </Button>,
                <Button key="back" onClick={() => navigate(-1)}>
                    Go Back
                </Button>
            ]}
        />
    );
} 