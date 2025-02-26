import React, { useState } from "react";
import { toggleLike, postComment } from "../api/endpoints";
import { SERVER_URL } from "../constants/constants";
import defaultImg from "/static/images/default_profile.jpeg";
import { Link } from "react-router-dom";

const Post = ({ postData, isOurProfile, isHome, handleDeletePost }) => {
  const [clientLiked, setClientLiked] = useState(postData.liked);
  const [clientLikeCount, setClientLikeCount] = useState(postData.likes_count);
  const [commentsList, setCommentsList] = useState(postData.comments);
  const [comment, setComment] = useState("");

  const handleKeyDown = (e, id) => {
    if (e.key === "Enter") {
      handlePostComment(id);
    }
  };

  const handlePostComment = async (id) => {
    if (!comment) {
      alert("Comment cannot be empty!");
      return;
    }
    const data = await postComment(id, comment);
    if (data.error) {
      alert(data.error);
    }
    setComment("");
    setCommentsList((commentsList) => [data, ...commentsList]);
  };

  const handleToggleLike = async () => {
    const data = await toggleLike(postData.id);
    if (data.error) {
      alert(data.error);
    } else if (data.now_liked) {
      setClientLiked(true);
      setClientLikeCount(clientLikeCount + 1);
    } else {
      setClientLiked(false);
      setClientLikeCount(clientLikeCount - 1);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="post-item">
          <div className="user-post-data py-3">
            <div className="d-flex justify-content-between">
              <div className="me-3">
                <img
                  className="rounded-circle  avatar-60"
                  src={
                    postData.user_image
                      ? `${SERVER_URL}${postData.user_image}`
                      : "/static/images/default_profile.jpeg"
                  }
                  alt="user-img"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="w-100">
                <div className="d-flex justify-content-between flex-wrap">
                  <div className="">
                    <h5 className="mb-0 d-inline-block">
                      <Link to={`/profile/${postData.username}`}>
                        {postData.username}
                      </Link>
                    </h5>
                    <p className="mb-0">{postData.formatted_date}</p>
                  </div>

                  {isOurProfile && !isHome && (
                    <div className="card-post-toolbar">
                      <div className="dropdown">
                        <span
                          className="dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                          role="button"
                        >
                          <i className="ri-more-fill"></i>
                        </span>
                        <div className="dropdown-menu m-0 p-0">
                          <button
                            onClick={() => handleDeletePost(postData.id)}
                            className="dropdown-item p-3"
                            name="post-options"
                            value="delete"
                            type="button"
                          >
                            <div className="d-flex align-items-top">
                              <i className="ri-delete-bin-7-line h4"></i>
                              <div className="data ms-2">
                                <h6>Delete</h6>
                                <p className="mb-0">
                                  Remove this Post from Timeline
                                </p>
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="user-post">
            <p>{postData.body}</p>

            {postData.image && (
              <img
                src={`${SERVER_URL}${postData.image}`}
                alt="post-image"
                className="img-fluid w-100"
                style={{
                  height: "444px",
                  maxHeight: "444px",
                  objectFit: "cover",
                }}
              />
            )}
          </div>
          <div className="comment-area mt-3">
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <div className="like-block position-relative d-flex align-items-center">
                <div
                  className={`d-flex align-items-center like-box ${
                    clientLiked ? "liked" : ""
                  }`}
                >
                  <div
                    onClick={handleToggleLike}
                    className="like-data"
                    style={{ cursor: "pointer" }}
                  >
                    <div className="dropdown">
                      <img
                        src="/static/images/01.png"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="total-like-block ms-2 me-3">
                    <span>{clientLikeCount}</span>
                  </div>
                </div>
                <div
                  className="total-comment-block collapsed"
                  href={`#comment-box-${postData.id}`}
                  data-bs-toggle="collapse"
                  aria-expanded="false"
                  style={{ cursor: "pointer" }}
                >
                  <div className="dropdown ms-3  ">
                    {commentsList.length} Comments
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div
              className="collapse"
              id={`comment-box-${postData.id}`}
              data-bs-parent="#iq-sidebar-toggle"
            >
              <ul className="post-comments list-inline p-0 m-0">
                {commentsList.length > 0 ? (
                  commentsList.map((comment, index) => (
                    <li
                      key={index}
                      className="mb-3 d-flex justify-content-between align-items-center"
                    >
                      <div className="d-flex">
                        <div className="user-img">
                          <Link to={`/profile/${comment.author_name}`}>
                            <img
                              alt="userimg"
                              className="avatar-35 rounded-circle img-fluid"
                              src={defaultImg}
                            />
                          </Link>
                        </div>
                        <div className="comment-data-block ms-3">
                          <h6 style={{ color: "#50b5ff" }}>
                            {comment.author_name}
                          </h6>
                          <p className="mb-0">{comment.body}</p>
                        </div>
                      </div>
                      <div style={{ fontSize: "12px" }}>
                        {comment.formatted_comment_date}
                      </div>
                    </li>
                  ))
                ) : (
                  <p>No comments</p>
                )}
              </ul>
              <div className="comment-text d-flex justify-content-between align-items-center mt-3">
                <input
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    handleKeyDown(e, postData.id);
                  }}
                  className="form-control rounded"
                  placeholder="Enter Your Comment"
                  type="text"
                  name="comment"
                  style={{ width: "90%" }}
                />
                <div
                  onClick={() => {
                    handlePostComment(postData.id);
                  }}
                  className="send-message-icon"
                  style={{ margin: "0px", cursor: "pointer" }}
                >
                  <i className="ri-send-plane-line"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
