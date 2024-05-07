import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";

export const PostPage = () => {
  const [posts, setPosts] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  useEffect(() => {
    fetch(`https://blog-app-mern-0a1m.onrender.com/post/${id}`).then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, [id]);

  if (!posts) {
    return "";
  }

  return (
    <div className="post-page">
      <h1>{posts.title}</h1>
      <time>{formatISO9075(new Date(posts.createdAt))}</time>
      <div className="author">By: {posts.author.username}</div>
      {userInfo.id === posts.author._id && (
        <div className="edit-row">
          <Link className="edit-btn" to={`/edit/${posts._id}`}>Edit this post</Link>
        </div>
      )}
      <div className="image">
        <img src={`https://blog-app-mern-0a1m.onrender.com/${posts.cover}`} alt="" />
      </div>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: posts.content }}
      />
    </div>
  );
};
