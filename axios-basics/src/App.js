import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

const baseURL = 'https://jsonplaceholder.typicode.com/posts/1';

function App() {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    axios.get(baseURL)
      .then((res) => {
        console.log(res.data);
        setPost(res.data);
      })
      .catch((err) => console.log(err));

    setLoading(false);
  }, []);

  return (
    <div className="App">
      {loading ? <>Carregando</>
        : (
          <>
            <h1>Using Axios in React</h1>
            <h3>
              Título do post:
              {}
              {' '}
              {post.title}
            </h3>
            <p>
              {post.body}
            </p>
          </>
        )}

    </div>
  );
}

export default App;
