
import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import NewsBoard from './components/NewsBoard'
import NewsItem from './components/NewsItem'

function App() {
 const [category,setCategory]=useState("general");

  return (
    <>
     <NavBar setCategory={setCategory}/>
     <NewsBoard category={category}/>
     <NewsItem></NewsItem>
    </>
  )
}

export default App
