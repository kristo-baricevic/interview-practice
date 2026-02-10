import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CountriesTable } from './practice-folders/practice_components/Countries'
import { TableWithSearch } from './practice-folders/flattening-practice/blank'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TableWithSearch />
    </>
  )
}

export default App
