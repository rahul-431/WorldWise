/* eslint-disable react/prop-types */
import { useNavigate, useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useCity } from "../ContextProvider";
import { useEffect } from "react";
import Spinner from "./Spinner";
import Button from "./Button";

function City() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getCity, currentCity, isLoaded } = useCity();

  useEffect(() => {
    getCity(id);
  }, [id]);

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));

  const { cityName, emoji, date, notes } = currentCity;
  if (isLoaded) return <Spinner />;
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <Button
          type="back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          Back
        </Button>
      </div>
    </div>
  );
}

export default City;
