import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

const baseURL = 'https://jsonplaceholder.typicode.com/posts';

function App() {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({ title: 'a' });
  useEffect(() => {
    setLoading(true);
    axios.get(`${baseURL}/1`)
      .then((res) => {
        setPost(res.data);
        setLoading(false);
      })
      .catch((err) => err);
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
      })
      .catch((err) => err);
    setLoading(false);
  }

  async function deletePost() {
    setLoading(true);
    await axios.delete(`${baseURL}/${post.id}`)
      .then((res) => console.log(res.data));
    setPost(null);
    setLoading(false);
  }

  if (!post) {
    return ('No post');
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
            <button onClick={deletePost} type="button">Delete post</button>
          </>
        )}
    </div>
  );
}

export default App;
