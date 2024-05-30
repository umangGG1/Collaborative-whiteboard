import React from 'react'
import Navbar from './components/navbar'
import "./index.css"
import Main from './components/main'
import Footer from './components/footer'

const Home: React.FC = () => {
  return (<>
   <Navbar />
   <Main/>
   <Footer />
   </>
  )
}

export default Home