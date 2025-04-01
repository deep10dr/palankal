import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; 
import { FaSearch } from "react-icons/fa";
import { BiLoader } from "react-icons/bi";
import './App.css';

function NutritionSearch() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchV, setSearchV] = useState('');

  const fetchNutrition = async () => {
    if (!searchV.trim()) {
      alert("Please enter a valid food item!");
      return;
    }

    setLoading(true);
    const options = {
      method: 'GET',
      url: 'https://nutritional-api.p.rapidapi.com/search',
      params: { q: searchV },
      headers: {
        'x-rapidapi-key': '4c5be6c858mshb074e95e20315dcp1d16a5jsnd5dc2d873367',
        'x-rapidapi-host': 'nutritional-api.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setData(response.data || []);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]); // Reset data on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-dark text-white d-flex flex-column align-items-center container-fluid vh-100">
      {/* Search Bar to Search */}
      <div className="w-100 p-2 d-flex justify-content-center align-items-center gap-2 mt-3">
        <input 
          type="text" 
          className="form-control input-class w-50" 
          placeholder="Enter food item" 
          onChange={(e) => setSearchV(e.target.value)} 
          value={searchV} 
        />
        <button 
          className="btn btn-primary d-flex justify-content-center align-items-center" 
          onClick={fetchNutrition} 
          disabled={loading}
          onKeyDown={(e) => { e.key === "Enter" && fetchNutrition(); }}
        >
          {loading ? <BiLoader /> : <FaSearch />}
        </button>
      </div>

      {/* Display Nutrition Data */}
      <div className="w-100 result mt-5 overflow-auto">
        {data.length > 0 ? (
          <div className="p-3 text-dark container w-100">
            <div className="row row-cols-1 gy-2 row-cols-lg-3 row-cols-md-2">
              {data.map((item, index) => (
                <div className="bg-light col ms-1 output-div d-flex flex-column p-3 rounded shadow-sm" key={index}>
                  <h5 className="text-primary"> {item.name ?? "Unknown Name"}</h5>
                  <p><strong>Scientific Name:</strong> {item.scientificName ?? "N/A"}</p>
                  <p><strong>Benefits:</strong> {item.description ?? "No description available."}</p>
                  <p><strong>Slug Name:</strong> {item.slug ?? "N/A"}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          !loading && <p className="text-center mt-3">No results found.</p>
        )}
      </div>
    </div>
  );
}

export default NutritionSearch;
