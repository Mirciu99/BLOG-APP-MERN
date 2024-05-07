import { useEffect, useState } from "react";
import { Post } from "../Post";

export const IndexPage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("https://blog-app-mern-0a1m.onrender.com/post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);

  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => {
          return <Post {...post} />;
        })}
    </>
  );
};
