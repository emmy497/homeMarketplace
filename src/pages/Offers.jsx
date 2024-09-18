import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";

function Offers() {
  const [listings, setListings] = useState(null);
  const [loading, setLoadng] = useState(true);

  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        //Get a reference
        const listingsRef = collection(db, "listings");

        //create a query
        const q = query(
          listingsRef,
          where(
            "offer",
            "==",
            true,
            orderBy("timestamp", "desc", limit(10))
          )
        );

        //Execute query
        const querySnap = await getDocs(q);

        const listings = [];

        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setListings(listings);
        setLoadng(false);
      } catch (error) {
        toast.error("Could not fetch Listings");
      }
    };

    fetchListings();
  });
  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          Offers
        </p>
      </header>

      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="categoryListings">
              {listings.map((listing) => (
                <ListingItem
                  listing={listing.data}
                  id={listing.id}
                  key={listing.id}
                />
              ))}
            </ul>
          </main>
        </>
      ) : (
        <p>There are no current Offers</p>
      )}
    </div>
  );
}

export default Offers;
