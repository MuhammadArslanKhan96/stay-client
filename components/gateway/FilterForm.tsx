import React, { useState } from 'react';

interface FilterFormProps {
    onSubmit: (filters: any) => void;
    isLoading:boolean;
}
function formatDate(date:any) {
    let month = date.getMonth() + 1; // Months are zero-based
    let day = date.getDate();
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
  
    // Pad single digits with leading zeros
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
  
    // Return the formatted date
    return `${month}-${day}-${year} ${hours}:${minutes}:${seconds}`;
}
  
  let date = new Date();
  console.log(formatDate(date));
  

const FilterForm: React.FC<FilterFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    dateFrom: '',
    dateTo: '',
    priceFrom: 1,  
    priceTo: 10,    
    bedRooms: 1,   // Ensure bedRooms is not zero
    guest: 1,      // Ensure guests is not zero
    language: 'en',
    currencyWished: 'BRL',
    country: '',   // New field for country
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Filter Your Hotel Search</h2>
      <form onSubmit={handleSubmit} className="row g-4">
        {/* Date From */}
        <div className="col-md-6">
          <label htmlFor="dateFrom" className="form-label">Check-in Date</label>
          <input
            type="datetime-local"
            className="form-control"
            id="dateFrom"
            name="dateFrom"
            value={formData.dateFrom}
            onChange={handleChange}
            required={true}
          />
        </div>

        {/* Date To */}
        <div className="col-md-6">
          <label htmlFor="dateTo" className="form-label">Check-out Date</label>
          <input
            type="datetime-local"
            className="form-control"
            id="dateTo"
            name="dateTo"
            value={formData.dateTo}
            onChange={handleChange}
            required={true}
          />
        </div>

        {/* Price Range */}
        <div className="col-md-6">
          <label htmlFor="priceFrom" className="form-label">Price Range</label>
          <div className="d-flex align-items-center">
            <input
              type="number"
              className="form-control"
              id="priceFrom"
              name="priceFrom"
              value={formData.priceFrom}
              onChange={handleChange}
              min="1"  // Ensure price is not 0
              placeholder="Min Price"
            />
            <span className="mx-2">to</span>
            <input
              type="number"
              className="form-control"
              id="priceTo"
              name="priceTo"
              value={formData.priceTo}
              onChange={handleChange}
              min="10"  // Ensure price is not 0
              placeholder="Max Price"
            />
          </div>
        </div>

        {/* Bed Rooms */}
        <div className="col-md-6">
          <label htmlFor="bedRooms" className="form-label">Bed Rooms</label>
          <input
            type="number"
            className="form-control"
            id="bedRooms"
            name="bedRooms"
            value={formData.bedRooms}
            onChange={handleChange}
            min="1"  // Ensure bedRooms is not 0
            max="10"
            placeholder="Number of Bedrooms"
          />
        </div>

        {/* Guests */}
        <div className="col-md-6">
          <label htmlFor="guest" className="form-label">Guests</label>
          <input
            type="number"
            className="form-control"
            id="guest"
            name="guest"
            value={formData.guest}
            onChange={handleChange}
            min="1"  // Ensure guests is not 0
            max="10"
            placeholder="Number of Guests"
          />
        </div>

        {/* Language */}
        <div className="col-md-6">
          <label htmlFor="language" className="form-label">Language</label>
          <select
            className="form-select"
            id="language"
            name="language"
            value={formData.language}
            onChange={handleChange}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="pt">Portuguese</option>
            {/* Add more language options here */}
          </select>
        </div>

        {/* Currency */}
        <div className="col-md-6">
          <label htmlFor="currencyWished" className="form-label">Currency</label>
          <select
            className="form-select"
            id="currencyWished"
            name="currencyWished"
            value={formData.currencyWished}
            onChange={handleChange}
          >
            <option value="BRL">BRL (Brazilian Real)</option>
            <option value="USD">USD (US Dollar)</option>
            {/* <option value="EUR">EUR (Euro)</option> */}
            {/* Add more currency options here */}
          </select>
        </div>
        {/* Submit Button */}
        <div className="text-center m-2">
          <button type="submit" className="btn btn-primary mt-3" disabled={isLoading}>
            {
                isLoading ? "Searching..." : "Search Rooms"
            }
        </button>
        </div>
      </form>
    </div>
  );
};

export default FilterForm;
