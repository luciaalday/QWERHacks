export default function CityOutput({ results }) {
  if (!results) {
    return (
      <>
        <p>City output</p>
        <p>Generate a city to see results</p>
      </>
    )
  }

  return (
    <>
      <p>City output</p>
      <div>
        <h3>Simulation Results</h3>
        <pre>{JSON.stringify(results, null, 2)}</pre>
      </div>
    </>
  )
}