import { useEffect } from "react";
import background from '../../assets/Background.png';
import { useState } from "react";
import { getFilmByTitle } from "../../api/movieApi";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Pagination, Row, Spin, Flex } from "antd";
import FilmCard from "../FilmCard/FilmCard";
import { LoadingOutlined } from "@ant-design/icons";
import { useMessageApi } from "../../utils/MessageContext";

function SearchedMovies() {
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const { title, pageid } = useParams();
    const navigate = useNavigate();
    const messageApi = useMessageApi()

    const warning = (warningMessage: string) => {
        messageApi.open({
            type: 'warning',
            content: warningMessage,
        });
    };

    useEffect(() => {
        setCurrentPage(Number(pageid));
        if (title) {
            setIsLoading(true);
            getFilmByTitle(title, currentPage).then(res => {
                setSearchResults(res[0]);
                setTotalResults(res[1]);
                setIsLoading(false);

                if (res[0].length === 0) {
                    warning("Empty search results")
                    setTimeout(() => {
                        navigate(-1);
                    }, 1000);
                }
            });
        }
    }, [title, pageid]);

    const changePage = (page: number) => {
        setCurrentPage(page);
        navigate(`/search/${title}/page/${page}`);
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [currentPage]);

    return (
        <div style={{ background: `url(${background})`, marginTop: -20, minHeight: '100vh' }}>
            <Flex align="center" gap="middle">
                <div>
                    <h2 style={{ textAlign: 'center', color: 'white', paddingTop: 80 }}>Searched results for '{title}'</h2>
                    {isLoading && <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: 'white', left: '50vw' }} spin />} />}
                    {!isLoading && searchResults?.length && (
                        <p style={{ textAlign: 'center', color: 'white' }}>
                            No results found. Redirecting back...
                        </p>
                    )}
                </div>
            </Flex>
            {!isLoading && searchResults.length > 0 && (
                <>
                    <div>
                        <Row justify="center" style={{ justifyContent: 'space-evenly' }}>
                            {searchResults?.map((result: any) => (
                                <FilmCard key={result.id}
                                    title={result.title}
                                    poster_path={result.poster_path}
                                    overview={result.overview}
                                    vote_average={result.vote_average}
                                    id={result.id}
                                    release_date={result.release_date}
                                />
                            ))}
                        </Row>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Pagination
                            current={currentPage}
                            total={totalResults}
                            onChange={changePage}
                            showSizeChanger={false}
                            style={{ color: 'white', backgroundColor: 'white', borderRadius: '5px' }}
                        />
                    </div>
                </>
            )}
        </div>
    );
}

export default SearchedMovies;