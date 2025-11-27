// src/components/HeroSection.js
import React, { useState } from "react";

const tourOptions = [
  { value: "adventure", labelEn: "Adventure", labelAm: "አድቨንቸር" },
  { value: "cultural", labelEn: "Cultural", labelAm: "ባህላዊ" },
  { value: "nature", labelEn: "Nature", labelAm: "ተፈጥሮ" },
];

const HeroSection = ({ language = "en" }) => {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [tourType, setTourType] = useState("");

  const handleSearch = () => {
    console.log({ destination, date, tourType });
  };

  return (
    <div className="relative w-full bg-cream flex flex-col items-center justify-start">
      <div className="w-full text-center py-6 bg-black/20 absolute top-16 z-20">
  <h1 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent 
                 bg-gradient-to-r from-orange-400 via-yellow-400 to-blue-500 drop-shadow-lg">
    
  </h1>
</div>



      {/* Hero Section Banner */}
      
      
      <div className="relative w-full h-[600px]">
        <img
          src="http://localhost:5000/uploads/banner4.png"
          alt="Banner"
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>

        

        {/* Logo Top-Left */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-orange-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10
                 10-4.477 10-10S17.523 2 12 2zM2 12h20M12 2v20"
            />
          </svg>
          <span className="text-white font-extrabold text-xl tracking-wide">
            Viatour
          </span>
        </div>

        {/* Floating Search Panel */}
        <div className="absolute z-10 mt-28 left-10px top-10px h-60px w-768px transform -translate-x-1/2 w-11/12 md:w-3/5 bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-4 flex flex-col md:flex-row gap-3 items-center">
          {/* WHERE */}
          <div className="flex flex-col w-full md:w-1/3">
            <label className="text-[11px] text-gray-600 font-semibold mb-1">
              {language === "en" ? "Where" : "የሚሄዱበት"}
            </label>
            <input
              type="text"
              placeholder={language === "en" ? "Destination" : "መድረሻ"}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="px-3 py-2 rounded-full border border-gray-300 text-sm"
            />
          </div>

          {/* WHEN */}
          <div className="flex flex-col w-full md:w-1/3">
            <label className="text-[11px] text-gray-600 font-semibold mb-1">
              {language === "en" ? "When" : "መቼ"}
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="px-3 py-2 rounded-full border border-gray-300 text-sm"
            />
          </div>

          {/* TOUR TYPE */}
          <div className="flex flex-col w-full md:w-1/3">
            <label className="text-[11px] text-gray-600 font-semibold mb-1">
              {language === "en" ? "Tour Type" : "የጉብኝት አይነት"}
            </label>
            <select
              value={tourType}
              onChange={(e) => setTourType(e.target.value)}
              className="px-3 py-2 rounded-full border border-gray-300 text-sm"
            >
              <option value="">
                {language === "en" ? "All Tours" : "ሁሉም ጉብኝቶች"}
              </option>
              {tourOptions.map((tour) => (
                <option key={tour.value} value={tour.value}>
                  {language === "en" ? tour.labelEn : tour.labelAm}
                </option>
              ))}
            </select>
          </div>

          {/* SEARCH BUTTON */}
          <button
            onClick={handleSearch}
            className="flex items-center px-6 py-2 bg-orange-500 text-white font-semibold rounded-full gap-2 text-sm w-35px h-80px"
          >
            {language === "en" ? "Search" : "ፈልግ"}
          </button>
        </div>
      </div>

      {/* Popular Things To Do Section */}
      <div className="max-w-6xl w-full px-4 mt-10 mb-12 mx-auto bg-white rounded-2xl p-6 shadow-lg">
        {/* Title + See All link */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Popular Things To Do
          </h2>
          <a
            href="/tours"
            className="text-orange-500 font-semibold hover:underline text-sm md:text-base"
          >
            See All
          </a>
        </div>

        {/* Custom Images Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Column 1 */}
          <div className="row-span-2 h-[400px]">
            <div className="bg-white rounded-xl shadow-lg p-2 h-full flex justify-center items-center">
              <img
                src="http://localhost:5000/uploads/banner5.png"
                alt="Banner5"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Column 2 */}
          <div className="grid grid-rows-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-2 flex justify-center items-center">
              <img
                src="http://localhost:5000/uploads/banner6.png"
                alt="Banner6"
                className="w-full h-28 object-cover rounded-lg"
              />
            </div>
            <div className="bg-white rounded-xl shadow-lg p-2 flex justify-center items-center">
              <img
                src="http://localhost:5000/uploads/banner7.png"
                alt="Banner7"
                className="w-full h-28 object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Column 3 */}
          <div className="grid grid-rows-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-2 flex justify-center items-center">
              <img
                src="http://localhost:5000/uploads/banner10.png"
                alt="Banner10"
                className="w-full h-28 object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-2 flex justify-center items-center">
                <img
                  src="http://localhost:5000/uploads/banner8.png"
                  alt="Banner8"
                  className="w-full h-28 object-cover rounded-lg"
                />
              </div>
              <div className="bg-white rounded-xl shadow-lg p-2 flex justify-center items-center">
                <img
                  src="http://localhost:5000/uploads/banner9.png"
                  alt="Banner9"
                  className="w-full h-28 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE TOURZ Section */}
      <div className="max-w-6xl w-full px-4 mt-16 mb-20">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-10 text-center">
          Why Choose <span className="text-orange-500">Tourz</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1 */}
          <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
            <div className="flex justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-orange-500"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-800 text-center mb-2">
              Ultimate Flexibility
            </h3>
            <p className="text-gray-600 text-sm text-center">
              You're in control, with free cancellation and payment options to satisfy any plan or budget.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
            <div className="flex justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-800 text-center mb-2">
              Memorable Experiences
            </h3>
            <p className="text-gray-600 text-sm text-center">
              Browse and book tours so incredible, you'll want to tell your friends.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
            <div className="flex justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-800 text-center mb-2">
              Quality at Our Core
            </h3>
            <p className="text-gray-600 text-sm text-center">
              High-quality standards. Millions of reviews. A trusted Tourz company.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
            <div className="flex justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-purple-500"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 10c0-3.314-2.686-6-6-6S6 6.686 6 10c0 3.463 2.62 6.318 6 6.91V22" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-800 text-center mb-2">
              Award-Winning Support
            </h3>
            <p className="text-gray-600 text-sm text-center">
              New price? New plan? No problem. We're here to help 24/7.
            </p>
          </div>
        </div>
      </div>

     {/* Featured Trips Section */}
<div className="w-full mt-6 mb-20 max-w-6xl px-4 mx-auto">
  {/* Title + See All Link */}
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-3xl font-extrabold text-gray-800">Featured Trips</h2>
    <a
      href="/tours"
      className="text-orange-500 font-semibold hover:underline text-sm md:text-base"
    >
      See All
    </a>
  </div>

  {/* Equal Rectangle Image Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {[11, 12, 13, 14, 15, 16, 17, 18].map((num) => (
      <div key={num} className="w-full">
        <img
          src={`http://localhost:5000/uploads/banner${num}.png`}
          alt={`Banner${num}`}
          className="w-full aspect-[4/3] object-cover rounded-xl hover:scale-105 transition-transform duration-300"
        />
      </div>
    ))}
  </div>
</div>
{/* Trending Destinations Section */}
<div className="w-full mt-6 mb-20 px-4 py-10" style={{ backgroundColor: "#001f3f" }}>
  {/* Title + See All Link */}
  <div className="flex items-center justify-between mb-8 max-w-6xl mx-auto">
    <h2 className="text-3xl font-extrabold text-white text-center flex-1">
      Trending Destinations
    </h2>
    <a
      href="/tours"
      className="text-orange-500 font-semibold hover:underline text-sm md:text-base ml-4"
    >
      See All
    </a>
  </div>
{/* Responsive Images Row */}
  <div className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto">
    {[5, 6, 7, 8].map((num) => (
      <img
        key={num}
        src={`http://localhost:5000/uploads/banner${num}.png`}
        alt={`Banner${num}`}
        style={{ width: "150px", height: "100px" }}
        className="object-cover rounded-xl hover:scale-105 transition-transform duration-300"
      />
    ))}
  </div>
</div>
{/* Customer Reviews Section */}
<div className="w-full mt-16 mb-20 px-4 py-10 bg-gray-100">
  {/* Section Title */}
  <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-10">
    What Our Customers Say
  </h2>

  {/* Reviews Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
    {/* Review Card 1 */}
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
      <div className="flex items-center gap-4 mb-4">
        <img
          src="http://localhost:5000/uploads/customer1.png"
          alt="Customer 1"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="font-bold text-gray-800">Sarah Johnson</h3>
          <p className="text-yellow-500">⭐⭐⭐⭐⭐</p>
        </div>
      </div>
      <p className="text-gray-600 text-sm">
        “The tour was amazing! Everything was well organized, and I felt safe and comfortable throughout the trip.”
      </p>
    </div>

    {/* Review Card 2 */}
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
      <div className="flex items-center gap-4 mb-4">
        <img
          src="http://localhost:5000/uploads/customer2.png"
          alt="Customer 2"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="font-bold text-gray-800">Michael Lee</h3>
          <p className="text-yellow-500">⭐⭐⭐⭐⭐</p>
        </div>
      </div>
      <p className="text-gray-600 text-sm">
        “Viatour made my vacation unforgettable! Great guides and excellent support. Highly recommended.”
      </p>
    </div>

    {/* Review Card 3 */}
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
      <div className="flex items-center gap-4 mb-4">
        <img
          src="http://localhost:5000/uploads/customer3.png"
          alt="Customer 3"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="font-bold text-gray-800">Emily Davis</h3>
          <p className="text-yellow-500">⭐⭐⭐⭐⭐</p>
        </div>
      </div>
      <p className="text-gray-600 text-sm">
        “Absolutely loved it! Everything ran smoothly, and the experiences were beyond my expectations.”
      </p>
    </div>
  </div>
</div>

{/* Travel Articles Section */}
<div className="w-full px-4">
  <div className="max-w-6xl mx-auto bg-white rounded-2xl p-6 shadow-lg">
    {/* Top: Date/Author + See All */}
    <div className="flex justify-between items-center mb-4">
      <span className="text-sm text-gray-500">
        APRIL 06, 2025 •  By Andualem Bekele
      </span>
      <a
        href="/articles"
        className="text-orange-500 font-semibold hover:underline text-sm"
      >
        See All
      </a>
    </div>

    {/* Section Title */}
    <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-4">
      Travel Articles
    </h2>

    {/* Centered PNG Images with Link */}
    <div className="flex justify-center gap-4 flex-wrap">
      {[19, 20, 21].map((num) => (
        <div key={num} className="w-72 rounded-xl overflow-hidden shadow-lg">
          <img
            src={`http://localhost:5000/uploads/banner${num}.png`}
            alt={`Banner${num}`}
            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="text-center mt-2">
            <a
              href={`/articles/${num}`}
              className="text-orange-500 font-semibold hover:underline"
            >
              Article {num}
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
{/* Advert Section directly below Travel Articles (no gap) */}
<div className="w-full px-4 -mt-4">
  <div className="max-w-6xl mx-auto bg-orange-500 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6 text-white shadow-lg">
    {/* Text Content */}
    <div className="w-full md:w-2/3 flex flex-col justify-center">
      <h2 className="text-3xl font-extrabold mb-4">
        Get 5% Off Your First App Booking!
      </h2>

       <div className="flex gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 px-4 py-2 text-black rounded-l-2xl border border-gray-300 focus:outline-none"
        />
        <button className="px-6 py-2 bg-orange-500  rounded-l-2xltext-white font-semibold rounded-r-2xl hover:bg-orange-600 transition">
          Send
        </button>
      </div>
      <p className="mb-4">
        Book better on the app using promo code <span className="font-semibold">TOURBOOKING</span> to save instantly on your next tour.
      </p>
      <a
        href="/tours"
        className="self-start px-6 py-2 bg-white text-orange-500 font-semibold rounded-full hover:bg-gray-100 transition"
      >
        Book Now
      </a>
    </div>

    {/* Optional Image */}
    <div className="w-full md:w-1/3">
      <img
        src="http://localhost:5000/uploads/banner23.png"
        alt="banner23.png"
        
        className="w-full h-48 object-cover rounded-xl"
      />
      
    </div>
  </div>
</div>
{/* Footer Section */}
<footer className="w-full text-white mt-0" style={{ backgroundColor: "#001f3f" }}>
  {/* Top Contact & Social Line */}
  <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-gray-700">
    <div className="flex flex-col md:flex-row items-center gap-2 text-sm">
      <span className="font-semibold">Speak to our expert at</span>
      <a href="tel:+251913943958" className="text-orange-500 font-bold hover:underline">+251 913943958</a>
      <span className="hidden md:inline">| Contact: Addis Ababa</span>
    </div>
    <div className="flex gap-4 text-lg">
      <a href="#" className="hover:text-orange-500"><i className="fab fa-facebook-f"></i></a>
      <a href="#" className="hover:text-orange-500"><i className="fab fa-instagram"></i></a>
      <a href="#" className="hover:text-orange-500"><i className="fab fa-telegram-plane"></i></a>
      <a href="#" className="hover:text-orange-500"><i className="fab fa-youtube"></i></a>
    </div>
  </div>

  {/* Main Footer Columns */}
  <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
    
    {/* About Column */}
    <div className="flex flex-col gap-2">
      <h3 className="font-bold mb-4">About Us</h3>
      <ul className="text-gray-400 text-sm flex flex-col gap-2">
        <li><a href="/reviews" className="hover:text-orange-500">Tourz Reviews</a></li>
        <li><a href="/contact" className="hover:text-orange-500">Contact Us</a></li>
        <li><a href="/guides" className="hover:text-orange-500">Travel Guides</a></li>
        <li><a href="/data-policy" className="hover:text-orange-500">Data Policy</a></li>
        <li><a href="/cookie-policy" className="hover:text-orange-500">Cookie Policy</a></li>
        <li><a href="/legal" className="hover:text-orange-500">Legal</a></li>
        <li><a href="/map" className="hover:text-orange-500">Set Map</a></li>
      </ul>
    </div>

    {/* Support Column */}
    <div className="flex flex-col gap-2">
      <h3 className="font-bold mb-4">Support</h3>
      <ul className="text-gray-400 text-sm flex flex-col gap-2">
        <li><a href="/get-in-tour" className="hover:text-orange-500">Get in Tour</a></li>
        <li><a href="/help-center" className="hover:text-orange-500">Help Center</a></li>
        <li><a href="/livechat" className="hover:text-orange-500">Live Chat</a></li>
        <li><a href="/how-it-works" className="hover:text-orange-500">How it Works</a></li>
      </ul>
    </div>

    {/* Newsletter Column */}
    <div className="flex flex-col gap-2">
      <h3 className="font-bold mb-4">Newsletter</h3>
      <p className="text-gray-400 text-sm mb-2">Subscribe to the free newsletter and stay up-to-date:</p>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          placeholder="Your email address"
          className="flex-1 px-3 py-2 rounded-md text-gray-800 focus:outline-none"
        />
        <button className="bg-orange-500 px-4 py-2 rounded-md font-semibold hover:bg-orange-600">
          Send
        </button>
      </div>
    </div>

    {/* Mobile App Column */}
    <div className="flex flex-col gap-2">
      <h3 className="font-bold mb-4">Mobile App</h3>
      <ul className="text-gray-400 text-sm flex flex-col gap-2">
        <li><a href="/ios-app" className="hover:text-orange-500">iOS App</a></li>
        <li><a href="/android-app" className="hover:text-orange-500">Android App</a></li>
      </ul>
    </div>

  </div>

  {/* Payment Methods */}
  <div className="max-w-6xl mx-auto px-4 mt-4 flex flex-wrap justify-center items-center gap-6 text-gray-400 text-sm">
    <span className="flex items-center gap-2">
      <i className="fab fa-cc-visa text-xl"></i> <a href="/payment/visa" className="hover:text-orange-500">Visa</a>
    </span>
    <span className="flex items-center gap-2">
      <i className="fab fa-cc-mastercard text-xl"></i> <a href="/payment/card" className="hover:text-orange-500">Card</a>
    </span>
    <span className="flex items-center gap-2">
      <i className="fab fa-cc-paypal text-xl"></i> <a href="/payment/paypal" className="hover:text-orange-500">PayPal</a>
    </span>
    <span className="flex items-center gap-2">
      <i className="fas fa-money-bill-wave text-xl"></i> <a href="/payment/santim" className="hover:text-orange-500">Santim Pay</a>
    </span>
  </div>

  {/* Bottom Bar */}
  <div className="w-full text-gray-400 text-sm py-4 text-center border-t border-gray-700">
    &copy; {new Date().getFullYear()} Viatour. All rights reserved.
  </div>
</footer>
<style>{`
        .bg-cream { background-color: #FFF5E1; }
      `}</style>
    </div>
  );
};

export default HeroSection;
