import { useState, useEffect } from "react"
import "./styles.css"

// https://api-adresse.data.gouv.fr/search/?q=8+bd+du+port

// we need to display a list of address:
// you have to retrieve the list from the url,
// show a loading indicator while fetching,
// then display somes informations from each result.
// => doc: https://adresse.data.gouv.fr/api-doc/adresse

// bonus: use an input to research an other query

const DEFAULT_URL = new URL('https://api-adresse.data.gouv.fr/search/?q=8+bd+du+port')
const DEFAULT_QUERY = DEFAULT_URL.searchParams.get('q')

export default function App() {
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState(null)
  const [error, setError] = useState(null)
  const [url, setUrl] = useState(DEFAULT_URL)
  const [search, setSearch] = useState(DEFAULT_QUERY)

  const fetch_address = async (url) => {
    setLoading(true)
    await fetch(url, {
      method: "GET"
    })
      .then((res) => {
        if (res.ok) {
          setError(null)
          return res.json()
        }
        throw res
      })
      .then((data) => setList(data))
      .catch((err) => setError(new Error(err)))
      .finally((_) => setLoading(false))
  }

  const compute_score = (number) => `${Math.round(number*100)} %`

  const handle_value = (event) => {
    const value = event.target.value
    const new_param = new URLSearchParams(url.search)
    new_param.set('q', value)
    const new_url = new URL(`${url.origin}${url.pathname}?${new_param}`)
    setSearch(value)
    setUrl(new_url)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetch_address(url)
    }, 400)
    return () => clearTimeout(timer)
  }, [ url ])

  return (
    <div className="App">
      <h1>Addresse list</h1>
      <ul>
        <li>
          {url &&
            <div style={{ marginBottom: "10px" }}>
              <h2>Label: {search}</h2>
            </div>
          }
          <input type="text" value={search} onChange={handle_value} />
          <ul>
            {loading && <div style={{ marginBottom: "10px" }}>loading...</div>}
            {error && <div style={{ marginBottom: "10px" }}>{error.message}</div>}
            {(!loading && !error && list) &&
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
