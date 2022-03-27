import "./styles.css";

// https://api-adresse.data.gouv.fr/search/?q=8+bd+du+port

// we need to display a list of address:
// you have to retrieve the list from the url,
// show a loading indicator while fetching,
// then display somes informations from each result.
// => doc: https://adresse.data.gouv.fr/api-doc/adresse

// bonus: use an input to research an other query

export default function App() {
  return (
    <div className="App">
      <h1>Addresse list</h1>
      <ul>
        <li>
          <h2>Label: x, xxxxx xxxx xxxxxxx</h2>
          <ul>
            <li>number: x</li>
            <li>street: xxx</li>
            <li>city: xxx</li>
            <li>zipcode: xxxxx</li>
            <li>country: France</li>
            <li>rounded score: x.xx</li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
