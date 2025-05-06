import React, { useState } from "react";


function ResultCard({ hotel, crud, mark}) {
   
    const bookmark = () => {
        if (mark === "solid") {
            
            crud(hotel.id);
        }
        else {
            
            crud(hotel);
        }

}

    return (
        <div className=" ResultCard-container flex flex-col justify-between text-black bg-cyan-200 h-fit rounded-2xl shadow-xl  m-2 p-2 dark:text-white dark:bg-cyan-950">
            <h1 className="ResultCard-title text-center font-bold"><a  href={hotel.url} >{hotel.name}</a></h1>
            <div className="flex justify-between">
                <div className="">
               
            <p className="ResultCard-content grow"><span className="font-bold">Breif Description :</span> {hotel.description}</p>
            <p className="ResultCard-content grow"><span className="font-bold">Price :</span> {hotel.price} BDT</p>
            <p className="ResultCard-content grow"><span className="font-bold">Rating :</span> {hotel.rating}</p>
            


                </div>
                <i className={`fa-${mark} fa-bookmark`} onClick={bookmark}></i>
            </div>
        </div>
    );
}

export default ResultCard;