import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
// eslint-disable-next-line react/prop-types
function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message
        message={"Adding your first city by clicking on a city on a map"}
      />
    );
  const countries = cities.reduce((acc, curr) => {
    if (!acc.map((el) => el.country).includes(curr.country))
      return [...acc, { country: curr.country, emoji: curr.emoji }];
    else return acc;
  }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}

export default CountryList;
