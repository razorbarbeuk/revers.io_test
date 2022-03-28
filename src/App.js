import { useState, useEffect } from "react"
import "./styles.css"

// https://api-adresse.data.gouv.fr/search/?q=8+bd+du+port

// we need to display a list of address:
// you have to retrieve the list from the url,
// show a loading indicator while fetching,
// then display somes informations from each result.
// => doc: https://adresse.data.gouv.fr/api-doc/adresse

// bonus: use an input to research an other query

export default function App() {
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState(null)
  const [error, setError] = useState(null)
  const url = new URL('https://api-adresse.data.gouv.fr/search/?q=8+bd+du+port')
  const query = url.searchParams.get('q')

  const fetch_address = async (url) => {
    setLoading(true)
    await fetch(url, {
      method: "GET"
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw res
      })
      .then((data) => setList(data))
      .catch((err) => setError(new Error(err)))
      .finally((_) => setLoading(false))
  }

  const compute_score = (number) => `${Math.round(number*100)} %`

  useEffect(() => {
    fetch_address(url)
  }, [])

  if (loading) {
    return <>loading...</>
  }
  if(error) {
    return <>{error.message}</>
  }

  return (
    <div className="App">
      <h1>Addresse list</h1>
      <ul>
        <li>
          {url &&
            <h2>Label: {query}</h2>
          }
          <ul>
            {list &&
              list.features.map((address) => {
                return (
                  <div key={address.properties.label} style={{ marginBottom: "10px" }}>
                    <li>number: {address.properties.housenumber}</li>
                    <li>street: {address.properties.street}</li>
                    <li>city: {address.properties.city}</li>
                    <li>zipcode: {address.properties.citycode}</li>
                    <li>country: France</li>
                    <li>rounded score: {compute_score(address.properties.score)}</li>
                  </div>
                )
              })}
          </ul>
        </li>
      </ul>
    </div>
  )
}
