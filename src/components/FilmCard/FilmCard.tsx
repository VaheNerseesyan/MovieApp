import { Card, Rate, Button, Typography, Space } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import styles from './FilmCard.module.css';

interface FilmCardProps {
    title: string;
    poster_path: string;
    overview: string;
    vote_average: number;
    release_date: string;
}

function FilmCard({ title, poster_path, overview, vote_average, release_date }: FilmCardProps) {
    return (
        <Card
            hoverable
            className={styles.filmCard}
            cover={
                <div className={styles.posterContainer}>
                    <img
                        alt={title}
                        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                        className={styles.poster}
                    />
                </div>
            }
            actions={[
                <Button 
                    type="text" 
                    icon={<HeartOutlined />}
                    onClick={() => console.log('Add to favorites')}
                >
                    Add to favorites
                </Button>
            ]}
        >
            <Card.Meta
                title={
                    <Typography.Title level={4} className={styles.title}>
                        {title}
                    </Typography.Title>
                }
                description={
                    <Space direction="vertical" size="small">
                        <Typography.Paragraph ellipsis={{ rows: 3 }}>
                            {overview}
                        </Typography.Paragraph>
                        <Space>
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