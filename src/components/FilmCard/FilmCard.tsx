import { Card, Typography, Button, Space, Rate } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

interface FilmCardProps {
    title: string;
    poster_path: string;
    overview: string;
    vote_average: number;
    release_date: string;
    id: string;
}

function FilmCard({ title, poster_path, overview, vote_average, release_date, id }: FilmCardProps) {
    const navigate = useNavigate();

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        console.log('Add to favorites');
    };

    return (
        <Card
            hoverable
            onClick={() => navigate(`/movie/${id}`)}
            style={{ width: '320px', display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'center' }}
            cover={
                <img
                    alt={title}
                    src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                    style={{ height: '100%', objectFit: 'cover', width: '320px' }}
                />
                
            }
            actions={[
                <Button 
                    key="favorite"
                    type="text" 
                    icon={<HeartOutlined />}
                    onClick={handleFavoriteClick}
                >
                    Add to favorites
                </Button>
            ]}
        >
            <Card.Meta
                title={title}
                description={
                    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                        <Typography.Paragraph
                            ellipsis={{ rows: 3 }}
                            style={{ marginBottom: 0 }}
                        >
                            {overview}
                        </Typography.Paragraph>
                        <Space split>
                            <Rate disabled defaultValue={vote_average / 2} allowHalf />
                            <Typography.Text type="secondary">
                                {new Date(release_date).toLocaleDateString()}
                            </Typography.Text>
                        </Space>
                    </Space>
                }
            />
        </Card>
    );
}

export default FilmCard;