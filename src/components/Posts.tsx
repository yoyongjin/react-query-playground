import { useState } from "react";
import PostDetail from "./PostDetail";
import { useQuery } from "react-query";

const maxPostPage = 10;

const fetchPosts = async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=10&_page=0"
  );
  return response.json();
};

const Posts = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  const { data, isError, error, isLoading } = useQuery("posts", fetchPosts, {
    staleTime: 2000,
  });
  console.log(useQuery("posts", fetchPosts));
  if (isLoading) return <h3>Loading</h3>;
  if (isError)
    return (
      <>
        <h3>Something went wrong!</h3>
        <p>{error.toString()}</p>
      </>
    );
  if (!data) return <div />;

  return (
    <>
      <ul>
        {data.map((post: any) => (
          <li
            key={post.id}
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div>
        <button
          disabled
          onClick={() => {
            //Todo
          }}
        >
          Prev Page
        </button>
        <span>Page {currentPage + 1}</span>
        <button
          disabled
          onClick={() => {
            //Todo
          }}
        >
          Next Page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
};

export default Posts;
