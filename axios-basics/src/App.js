import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

const baseURL = 'https://jsonplaceholder.typicode.com/posts';

function App() {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({ title: 'a' });
  const [newPostBody, setNewPostBody] = useState('');
  useEffect(() => {
    async function getPosts() {
      setLoading(true);
      await axios.get(`${baseURL}/1`)
        .then((res) => {
          setPost(res.data);
          setLoading(false);
        })
        .catch((err) => err);
    }
    getPosts();
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
      .then((res) => res.data);
    setPost(null);
    setLoading(false);
  }

  async function updatePostBody(e) {
    e.preventDefault();
    setLoading(true);
    await axios
      .put(`${baseURL}/${post.id}`, {
        ...post,
        body: newPostBody,
      })
      .then((res) => {
        setPost(res.data);
        setLoading(false);
      })
      .catch((err) => err);
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
            <form
              onSubmit={(e) => updatePostBody(e)}
            >
              <input
                type="text"
                value={newPostBody}
                onChange={(e) => setNewPostBody(e.target.value)}
              />
              <button
                type="submit"
              >
                Update post body
              </button>
            </form>
          </>
        )}
    </div>
  );
}

export default App;
