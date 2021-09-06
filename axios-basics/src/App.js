import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

const baseURL = 'https://jsonplaceholder.typicode.com/posts';

function App() {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    axios.get(`${baseURL}/1`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => err);

    setLoading(false);
  }, []);

  async function createPost() {
    setLoading(true);
    await axios.post(baseURL, {
      title: 'New post',
      body: 'New body',
    })
      .then((res) => {
        // console.log(res.data);
        setPost(res.data);
      });
    setLoading(false);
  }

  return (
    <div className="App">
      {loading ? <>Carregando</>
        : (
          <>
            <h1>Using Axios in React</h1>
            <h3>
              Título do post:
              {' '}
              {post.title}
            </h3>
            <p>
              {post.body}
            </p>
            <button onClick={createPost} type="button">Create post</button>
          </>
        )}
    </div>
  );
}

export default App;
