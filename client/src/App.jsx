import React from 'react'
import './index.css';

import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';

import {Home,Upload,Contact,About,Footer,SinglePage} from './pages/index';

const App = () => {
  return (
    <BrowserRouter>
      <header 
      className='flex justify-between items-center
      bg-white sm:px-8 px-4 py-4 border border-b border-b-[#e6ebf4]'>
        <div className='flex items-center gap-5'>
          <Link 
            to='/' 
            className='text-lg font-medium text-[#6469ff]'>
            MATH LAB
          </Link>
          <ul className='list-none flex gap-1.5'>
            <Link to='/About' className='text-gray-500'>About</Link>
            <Link to='/Contact' className='text-gray-500'>contact</Link>
          </ul>
        </div>
      </header>
      <main className='sm:px-8 px-4 py-8 
      w-full bg-[#f9fafe] min-h-[calc(100vh-64.4px)]'>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/post/:id' element={<SinglePage />}/>
          <Route path='/About' element={<About />} />
          <Route path='/Contact' element={<Contact />} />
          <Route path='/Upload' element={<Upload />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App

