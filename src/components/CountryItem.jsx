/* eslint-disable react/prop-types */
import styles from "./CountryItem.module.css";

function CountryItem({ filterCountry }) {
  return (
    <li className={styles.countryItem}>
      <span>{filterCountry.emoji}</span>
      <span>{filterCountry.country}</span>
    </li>
  );
}

export default CountryItem;
