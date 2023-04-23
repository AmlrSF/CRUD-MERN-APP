import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom';
import FormField from '../components/FormInput';
import { useEffect } from 'react';
import DisplayData from '../components/DisplayData';


const Home = () => {
  const [searchQuery,setsearchQuery] = useState('');
  const [data,setData] = useState(null);
  const [searcheddata,setsearcheddata] = useState(null);
  const [select,setSelect] = useState('newest')
  const handelsearch = (e)=>setsearchQuery(e.target.value);
  useEffect(()=>{
    const FetchData = async()=>{
      try {
        const response = await fetch('http://localhost:3000/api/v1/posts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          if(select === 'newest')setData(data.data.reverse());
          setData(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    FetchData();
  },[select])
  const searchPosts = ()=>{
    const searchItems = data.filter((post)=>{
      return post.author.toLowerCase().includes(searchQuery.toLowerCase()) || post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||post.categories.toLowerCase().includes(searchQuery.toLowerCase()) 
    })
    console.log(searchItems)
    setsearcheddata(searchItems)
  }

  const handelselect = ()=>{
    var select = document.getElementById('select');
    var value = select.options[select.selectedIndex].value;
    setSelect(value);
  }
  const navigate = useNavigate();
  return (
    <section className='max-7xl mx-auto '>
        <div className='h-full flex itmes-center flex-col'>
          <h1 className="font-extrabold text-[#222328] text-[32px]">
            MATLAB is a versatile and <br/>
            powerful tool for numerical computing
          </h1>
          <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
            MATLAB is a powerful numerical computing software that is widely used in engineering, science, and mathematics
          </p>
          <p className="mt-1 text-[#666e75] text-[14px] max-w-[500px]">
            One of the key strengths of MATLAB is its ability to handle matrix operations efficiently, which makes it particularly useful for linear algebra and other types of numerical computations
          </p>
          <button onClick={()=>navigate('/Upload')} className=" text-white bg-green-700 font-medium
           rounded-md text-sm mt-5 sm:w-[250px] w-full
             px-5 py-2.5 text-center">
            Create Posts on MATHLAB
          </button>

      </div>
      <div className='mt-10 ' >
        <div className='flex flex-col gap-2 mb-5'>
                <FormField
                  type="text"
                  name="name"
                  placeholder="physique."
                  value={searchQuery}
                  handleChange={handelsearch}
                />
                <button className=' text-white bg-green-700 font-medium
           rounded-md text-sm  sm:w-[250px] w-full
             px-5 py-2.5 text-center' onClick={searchPosts}>Search</button>
             <select id='select' onChange={handelselect} className='bg-green-700 rounded-xs w-[100px] text-[#fff] p-2'>
              <option value="newest">newest</option>
              <option value='ancient'>ancient</option>
             </select>
             {searchQuery && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing Resuls for <span className="text-[#222328]">{searchQuery}</span>:
              </h2>
            )}
        </div>
        <div className='container-data'>
          {searchQuery?
            (
              <DisplayData 
                data={searcheddata}
                title="No Search Results Found"
              />
            ) 
            :
              <DisplayData 
                data={data}
                title="No Posts Yet"
              />
          }
        </div>
      </div>
    </section>
  )
}

export default Home