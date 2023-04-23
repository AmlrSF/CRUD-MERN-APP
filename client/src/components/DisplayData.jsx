import Post from "./Post";
import React, { useState } from 'react'

const DisplayData = ({ data, title }) => {
    if (data?.length > 0) {
        return (
          data.map((post) => <Post key={post._id} {...post} />)
        );
      }
    
      return (
        <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
      );
};

export default DisplayData;