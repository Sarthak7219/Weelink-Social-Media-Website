import React, { useEffect, useState } from "react";
import {
  get_user_posts,
  createPost,
  getPosts,
  delete_post,
} from "../api/endpoints";
import Post from "../components/Post";

const UserPosts = ({ username, isOurProfile, profileImageURL, isHome }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [body, setBody] = useState("");
  const [nextPage, setNextPage] = useState(1);
  const [createPostLoading, setCreatePostLoading] = useState(false);
  const [postImage, setPostImage] = useState(null);

  const handleCreatePost = async () => {
    if (!body) {
      alert("Post content cannot be empty!");
      return;
    }
    setCreatePostLoading(true);
    try {
      const payload = {
        body: body,
      };
      if (postImage !== null) {
        payload.image = postImage;
      }
      const data = await createPost(payload);
      if (data.error) {
        alert(data.error);
      } else {
        setPosts((posts) => [data, ...posts]);
      }
    } catch {
      alert("An error occurred while creating the post.");
    } finally {
      setCreatePostLoading(false);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      const data = await delete_post(id);
      if (data.error) {
        alert(data.error);
      } else {
        setPosts((posts) => posts.filter((post) => post.id !== id));
        alert("Post deleted successfully!");
      }
    } catch {
      alert("An error occurred while deleting the post.");
    }
  };

  const fetchPosts = async () => {
    try {
      let data;
      if (isHome) {
        data = await getPosts(nextPage);
      } else {
        data = await get_user_posts(username, nextPage);
      }
      const postData = data.results;
      setPosts([...posts, ...postData]);
      setNextPage(data.next ? nextPage + 1 : null);
    } catch (error) {
      console.log("Error fetching posts:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPosts([]);
    setNextPage(1);
    setPostImage(null);
    fetchPosts();
  }, [username, isHome]);

  const loadMorePosts = () => {
    if (nextPage) {
      fetchPosts();
    }
  };

  return (
    <>
      {isOurProfile && (
        <div id="post-modal-data" className="card">
          <div className="card-header d-flex justify-content-between">
            <div className="header-title">
              <h4 className="card-title">Create Post</h4>
            </div>
          </div>
          <div className="w-100 ">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="user-img">
                  <img
                    src={profileImageURL}
                    alt="userimg"
                    className="avatar-60 rounded-circle"
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <textarea
                  value={body}
                  onChange={(e) => {
                    setBody(e.target.value);
                  }}
                  name="post-text"
                  id="post-text"
                  className="form-control rounded"
                  style={{ border: "none" }}
                  placeholder="Write something here..."
                ></textarea>
              </div>
              {postImage && (
                <div style={{ position: "relative" }}>
                  <img
                    src={URL.createObjectURL(postImage)}
                    alt="post-image"
                    className="img-fluid w-100 mt-3"
                    style={{
                      height: "444px",
                      maxHeight: "444px",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    onClick={() => {
                      setPostImage(null);
                    }}
                    className="cross-icon"
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      cursor: "pointer",
                    }}
                  >
                    <i class="ri-close-line"></i>
                  </div>
                </div>
              )}

              <hr />
              <ul className=" post-opt-block d-flex list-inline m-0 p-0 flex-wrap ">
                <input
                  onChange={(e) => {
                    setPostImage(e.target.files[0]);
                  }}
                  type="file"
                  id="post-image"
                  name="post-image"
                  accept="image/*"
                />
                <label
                  htmlFor="post-image"
                  className="bg-soft-primary rounded p-2 pointer d-flex align-items-center me-3 mb-md-0 mb-2"
                >
                  <img
                    src="/static/images/07.png"
                    alt="icon"
                    className="img-fluid me-2"
                  />
                  Photo/Video
                </label>

                <button
                  onClick={handleCreatePost}
                  className="create-post-btn bg-primary rounded p-2 pointer text-center w-25"
                  style={{
                    border: "none",
                    display: "block",
                    color: "white",
                  }}
                  type="button"
                >
                  {createPostLoading ? "Posting..." : "Create Post"}
                </button>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Posts list */}
      {loading ? (
        <p>Loading posts</p>
      ) : posts && posts.length > 0 ? (
        <>
          {posts.map((post) => (
            <Post
              key={post.id}
              postData={post}
              isOurProfile={isOurProfile}
              isHome={isHome}
              handleDeletePost={handleDeletePost}
            />
          ))}
          {nextPage && !loading && (
            <button
              onClick={loadMorePosts}
              className="bg-primary rounded p-2 pointer text-center"
              type="button"
              style={{
                border: "none",
                display: "block",
                color: "white",
                width: "100%",
              }}
            >
              Load more posts
            </button>
          )}
        </>
      ) : (
        <p>No posts found!</p>
      )}
    </>
  );
};

export default UserPosts;
