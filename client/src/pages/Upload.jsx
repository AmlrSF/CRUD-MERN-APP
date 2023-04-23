import React, { useState } from 'react'
import FormField from '../components/FormInput'
import preview from '../assets/preview.png';


const Upload = () => {
  const [postImage, setPostImage] = useState(false)
  const [form,setForm] = useState({
    name:'',
    author:'',
    description:'',
    categories:'',
    photo:''
  })
  const handleSubmit = async(e)=>{
    e.preventDefault();
    let {name,author,description,categories,photo} = form;
    if(name&&author&&description&&categories&&photo){
      setPostImage(true);
      try {
        const response = await fetch('http://localhost:3000/api/v1/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form }),
        });

        await response.json();
      } catch (error) {
        console.log("ddd");
      }finally{
        setPostImage(false)
      }
    }else{
      alert('please fill in the inputs fields');
    }
    setForm({
      name:'',
      description:"",
      photo:'',
      author:'',
      categories:''
    })
  }
  const handleChangeName = (e)=>{
    setForm({...form,name:e.target.value})
  }
  const handleChangeAuthor= (e)=>{
    setForm({...form,author:e.target.value})
  }
  const handleChangeDesc = (e)=>{
    setForm({...form,description:e.target.value})
  }
  const handleChangeCate = (e)=>{
    setForm({...form,categories:e.target.value})
  }
  
  const handlePhoto= (e)=>{
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = ()=>{
      setForm({...form,photo:reader.result});
    }
    reader.onerror = (err)=>console.log(err);
  }

  return (
    <section className='max-w-7xl mx-auto'>
      <div className='flex flex-col gap-5'>
        <div className=''>
          <h1 className="font-extrabold text-[#222328] text-[32px]">Create Posts on MATHLAB</h1>
          <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">One advantage of learning math through a series of lessons is that it allows learners to go at their own pace, taking as much time as needed to fully understand each concept before moving on. Additionally, many online math series are free or low-cost, making them accessible to a wide range of learners regardless of their financial situation.</p>
        </div>
        <form onSubmit={handleSubmit}>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
              <div className='flex flex-col gap-5'>
                <FormField
                  labelName="Post Name"
                  type="text"
                  name="name"
                  placeholder="Ex., Math exp log"
                  value={form.name}
                  handleChange={handleChangeName}
                />
                <FormField
                  labelName="Author Name"
                  type="text"
                  name="name"
                  placeholder="Ex., john doe"
                  value={form.author}
                  handleChange={handleChangeAuthor}
                />
                <FormField
                  labelName="Post description"
                  type="text"
                  name="name"
                  placeholder="Math app"
                  value={form.description}
                  handleChange={handleChangeDesc}
                />
                <FormField
                  labelName="Categories"
                  type="text"
                  name="name"
                  placeholder="Physique."
                  value={form.categories}
                  handleChange={handleChangeCate}
                />
              </div>
              <div>
              <div>
              <div className="flex items-center gap-2 mb-2">
                  <label
                    htmlFor={form.name}
                    className="block text-sm font-medium text-gray-900"
                  >
                    Upload Photo
                  </label>
              </div>
              <input
                type='file'
                id={form.name}
                name={form.name}
                accept='image/*'
                className="bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-[100%] sm:w-[250px]  p-3"
                onChange={handlePhoto}
                required
              />
            
              </div>
                    <div className="mt-5 relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
                      { form.photo ? (
                        <img
                          src={form.photo}
                          alt={form.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <img
                          src={preview}
                          alt="preview"
                          className="w-9/12 h-9/12 object-contain opacity-40"
                        />
                      )}
                    </div>
                </div>
            </div>
            <div className="mt-5 flex gap-5">
              <button
                type="button"
                onClick={handleSubmit}
                className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                {postImage ? 'Uploading...' : 'Uplode'}
          </button>
        </div>
        </form>
      </div>
    </section >
  )
}

export default Upload