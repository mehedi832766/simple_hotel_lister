import { useState, useEffect } from 'react';
import list from "../list";
import ResultCard from '../components/ResultCard';
import { useNavigate } from 'react-router-dom';
import { FaLightbulb } from "react-icons/fa";


function HOME() {
  const [bookmarks, setBookmarks] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [originalResults, setOriginalResults] = useState([]); // Add a new state to preserve original search results
  const [kewo, setKewo] = useState("");
  const [search, setSearch] = useState("hidden");
  const [rating, setRating] = useState("all");
  const [dark, setDark] = useState("");



  useEffect(() => {
    // getBookmarks();

  }, []);

  const navigate = useNavigate();


  // Bookmark
  const getBookmarks = async () => {
    try {
      const response = await list.get("/list/hotels/bookmarks/");
      setBookmarks(response.data);
      localStorage.setItem("bookmarks", response.data);
    } catch (err) {
      alert("Error fetching bookmarks");
    }
  };

  // add new bookmark
  const addBookmark = async (hotel) => {
    const bookmarkData = {
      name: hotel.name,
      description: hotel.description,
      price: parseInt(hotel.price),
      rating: parseInt(hotel.rating),
      url: hotel.url
    };

    try {
      const response = await list.post("/list/hotels/bookmarks/", bookmarkData);
      if (response.status === 201) {
        getBookmarks();
      }
    } catch (err) {
      alert("Failed to add bookmark");
    }
  };

  // delete ResultCard
  const deleteBookmark = async (id) => {
    try {
      const response = await list.delete(`/list/hotels/bookmarks/delete/${id}/`);
      if (response.status === 204) {
        getBookmarks();
      }
    } catch (err) {
      alert("Failed to delete bookmark");
    }
  };

  // search hotel
  const searchCity = async (location) => {
    setSearch("");
    try {
      const response = await list.get(`list/hotels/search/?location=${location}`);
      setOriginalResults(response.data);
      setFilteredList(response.data);
      localStorage.setItem("results", JSON.stringify(response.data));
      getBookmarks();
    } catch (err) {
      alert("Search failed");
    }
  };

  // Filtering
  const handleFilter = (newRating) => {
    if (newRating === 'all') {
      setFilteredList(originalResults);
      return;
    }

    const targetRating = Number(newRating);
    const newFilteredList = originalResults.filter(hotel =>
      Number(hotel.rating) === targetRating
    );
    setFilteredList(newFilteredList);
  };

  const filterRating = (e) => {
    e.preventDefault();
    const newRating = e.target.value;
    setRating(newRating);
    handleFilter(newRating);
  };

  const clearFilter = () => {
    setSearch("hidden");
    setKewo("");
  };

  // Logout
  const logOut = () => {
    navigate('/logout');
  };

  return (
    <div className={`${dark ? "dark" : ""} min-h-screen bg-white dark:bg-black dark:text-white`}>
      {/* Header Section */}
      <header className=" w-full h-1/12 flex bg-orange-400 border-amber-500 border-2 dark:bg-purple-950 dark:text-amber-300 dark:border-amber-300">
        <div className='text-2xl font-bold flex justify-center items-center w-1/5'>
          Simple Hotel Hunter
        </div>

        {/* Search Bar */}
        <div className=' flex justify-between w-4/5 '>
          <div className=' flex items-center w-2/3 p-2'>
            <input
              className='border-2 border-black bg-amber-50 w-4/5 rounded-xl p-2 dark:text-purple-950'
              type="text"
              value={kewo}
              placeholder="Search.."
              onChange={(e) => setKewo(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchCity(kewo)}
            />
            {kewo && (
              <div className="">
                <ion-icon name="close-outline" size="large" onClick={clearFilter}></ion-icon>
              </div>
            )}



            
          </div>
          {/* Logout Button */}
<div className='flex justify-end items-center'>
<FaLightbulb className='h-10 w-10 p-2 ' onClick={()=>{dark==="" ? setDark("Dark"): setDark("")}}/>

          <button onClick={() => navigate('/logout')} >
            <i className="fa-solid fa-arrow-right-from-bracket fa-xl p-4"></i>
          </button>
          </div>
        </div>

      </header>
      {/* Header Section */}

      {/* Main Content */}
      <div className=' flex  '>
        {/* Search Results Section */}
        <div className=' w-3/4  m-2 p-2 '>
          <div className=' flex justify-between items-center border-2 h-14 rounded-t-2xl bg-orange-400 dark:bg-purple-950 dark:text-amber-300 dark:border-amber-300'>
            <h2 className='w-9/10 text-center  text-xl p-2'>Search Results</h2>
            <select
              name="rating"
              id="rating"
              onChange={filterRating}
              className="m-2 border-2  dark:bg-black rounded-lg bg-amber-50  dark:text-amber-300 dark:border-amber-300"
            >
              <option value="all">All</option>
              {[5, 4, 3, 2, 1, 0].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          <div className={`border-2 h-full `}>
            {filteredList.map(hotel => (
              <ResultCard
                hotel={hotel}
                crud={addBookmark}
                mark="regular"
                key={hotel.rid}
              />
            ))}
          </div>
        </div>

        {/* Bookmarks Section */}
        <div className=' w-1/4  m-2 p-1 '>
          <div className='h-14 border-2 text-center text-xl p-2 rounded-t-2xl bg-orange-400 dark:bg-purple-950 dark:text-amber-300'>
            <h2>Bookmarks</h2>

          </div>
          <div className={`border-2 h-full`}>
            {bookmarks.map(bookmark => (
              <ResultCard
                hotel={bookmark}
                crud={deleteBookmark}
                mark="solid"
                key={bookmark.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HOME;