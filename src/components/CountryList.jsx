/* eslint-disable react/prop-types */
import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import Message from "./Message";
import CountryItem from "./CountryItem";
import { useCity } from "../ContextProvider";

export default function CountryList() {
  const { cities, isLoaded } = useCity();
  if (isLoaded) return <Spinner />;
  if (!cities.length)
    return <Message message="Add your first city by clicking on map" />;

  const filterCountry = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [
        ...arr,
        { country: city.country, emoji: city.emoji, id: city.id },
      ];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {filterCountry.map((city) => (
        <CountryItem filterCountry={city} key={city.id} />
      ))}
    </ul>
  );
}
