import React, {useState, useEffect } from 'react'
import axios from 'axios';
import NewsCard from './components/NewsCard'
import ReactPaginate from 'react-paginate';

const NewsPage = () => {
  const [ currentPage, setCurrentPage ] = useState([0]);
  const [ articles, setArticles ] = useState([]);
  const [ isLoading, setIsLoading] = useState(true);
  const [ totalPages, setTotalPages ] = useState(0);
  const [ query, setQuery ] = useState("");
  const [ searchInput, setSearchInput ] = useState("");

  const handlePageClick = (event) => {
		console.log(event);
		setCurrentPage(event.selected);
  };

  //Function for search fomr
   const handleSubmit = (event) => {
		event.preventDefault();
		setCurrentPage(0);
		setQuery(searchInput);
   };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
			// Fetch API
			const { data } = await axios.get(
				"https://hn.algolia.com/api/v1/search?",
				// Fetch Data according to current page
				{
					params: { page: currentPage,  query },
				}
			);
			//to get the "hist" which are the articles and also get the number of page ("nbPages")
			const { hits, nbPages } = data;
			setArticles(hits);
			setTotalPages(nbPages);
		} catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [currentPage, query]);

  return (
		<div className="container">
			<h1>Hacker News</h1>

      {/*  Search */}
      <form className='search-form' onSubmit={handleSubmit}>
        <input placeholder='Search for new news'
        value={searchInput}
        onChange={event => setSearchInput(event.target.value)}
        />
        <button type='submit'>Search</button>
      </form>

			<div className="news-container">
				{isLoading ? (
					<p>Loading...</p>
				) : (
					articles.map((article) => (
						<NewsCard article={article} key={article.objectID} />
					))
				)}
			</div>

			{/* pagination*/}
			<ReactPaginate
				nextLabel=">>"
				prevLabel="<<"
				breakLabel="..."
				forcePage={currentPage}
				pageCount={totalPages}
				renderOnZeroPageCount={null}
				onPageChange={handlePageClick}
        className="pagination"
        articleClassName="active"
        previousClassName='previous-page'
        nextClassName='next-page'
			/>
		</div>
  );
};

export default NewsPage