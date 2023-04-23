import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import FormField from '../components/FormInput';

const SinglePage = () => {
    const {id} = useParams();
    const [item,setitems] = useState(null);
    const [edit,setEdit] = useState(false);
    const [seteditedData ,setEditedData] = useState({name:"",description:"",author:""})
    const navigate = useNavigate()
    useEffect(() => {
      const GetSingElement = async()=>{
        try {
            const response = await fetch(`http://localhost:3000/api/v1/posts/${id}`,{
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
            if(response.ok){
                const result = await response.json();
                setitems(result.data.task)
            }
            
        } catch (error) {
            console.log(error);
        }
      }
      GetSingElement();
    
     
    }, [])

    const handeldelete =    async(id)=>{
        try {
            const response = await fetch(`http://localhost:3000/api/v1/posts/${id}`, {method: 'DELETE'});

            await response.json();
            alert('deleted suucessfully');
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }
    
    const handeledit = async(id)=>{
        try {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({...seteditedData})
            };
            const response = await fetch(`http://localhost:3000/api/v1/posts/${id}`, requestOptions);
            await response.json();
            console.log(seteditedData);
            alert('edited successfully');
            
        } catch (error) {
            console.log(error);
        }finally{
            setEdit(false)
        }
    }
    const handleChangeDesc =(e)=>setEditedData({...seteditedData,description:e.target.value})
    const handleChangeName =(e)=>setEditedData({...seteditedData,name:e.target.value})
    const handleChangeAuthor  =(e)=>setEditedData({...seteditedData,author:e.target.value});

    return (
        <div className='Single-post'>  
            <img className='h-64 w-128' src=       {item?.photo} />
            <h1 className='text-black text-md'>author :    <span>{item?.author}</span></h1>
            <h1 className='text-black text-md'>name :      <span>{item?.name}</span></h1>
            <p>decription : <span>{item?.description}</span></p>
            <p>decription : <span>{item?.categories}</span></p>
            <button className='text-white bg-green-700 font-medium
                rounded-md text-sm mt-5 sm:w-[250px] w-full
                    px-5 py-2.5 text-center' onClick={()=>handeldelete(item._id)}>
                        Delete Post
            </button>
            {
                edit ?
               <>
               <div className='flex flex-col gap-5'>
                <FormField
                  labelName="new Post Name"
                  type="text"
                  name="name"
                  placeholder="Ex., Math exp log"
                  value={seteditedData.name}
                  handleChange={handleChangeName}
                />
                <FormField
                  labelName="new Author Name"
                  type="text"
                  name="name"
                  placeholder="Ex., john doe"
                  value={seteditedData.author}
                  handleChange={handleChangeAuthor}
                />
                <FormField
                  labelName="new Post description"
                  type="text"
                  name="name"
                  placeholder="Math app"
                  value={seteditedData.description}
                  handleChange={handleChangeDesc}
                />
            
              </div>
                 <button className='text-white block bg-green-700 font-medium block
                rounded-md text-sm mt-3 mb-2 sm:w-[250px] w-full
                    px-5 py-2.5 text-center' onClick={()=>handeledit(item._id)}>
                        edit Post
                </button>
                
               </>
                : 
                <button className='text-white block bg-green-700 font-medium
                    rounded-md text-sm mt-5 sm:w-[250px] w-full
                  px-5 py-2.5 text-center' onClick={()=>setEdit(true)}>
                     enable Edit
                 </button>
            }
            
        </div>
    )
}

export default SinglePage