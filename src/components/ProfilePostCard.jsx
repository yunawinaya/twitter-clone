import { useContext, useState, useEffect } from "react";
import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  deletePost,
  likePost,
  removeLikeFromPost,
  fetchCommentsByPost,
  saveComment,
  deleteComment,
} from "../features/posts/PostSlice";
import { AuthContext } from "./AuthProvider";
import UpdatePostModal from "./UpdatePostModal";

export default function ProfilePostCard({ post }) {
  const { content, id: postId, imageUrl } = post;
  const [likes, setLikes] = useState(post.likes || []);
  const [comments, setComments] = useState(post.comments || []);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // new state variable
  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser.uid;

  // user has liked the post if their id is in the likes array
  const isLiked = likes.includes(userId);

  const pic =
    "https://media.licdn.com/dms/image/C5603AQG9hvnbZ2IsZw/profile-displayphoto-shrink_800_800/0/1630294362361?e=1694044800&v=beta&t=K1NzEr_OHL4ueDqmj2_MS4tSVx3lOyKNuYzHBKymX1c";

  const handleShowUpdateModal = () => setShowUpdateModal(true);
  const handleCloseUpdateModal = () => setShowUpdateModal(false);

  const handleShowDeleteModal = () => setShowDeleteModal(true); // new function
  const handleCloseDeleteModal = () => setShowDeleteModal(false); // new function

  const handleLike = () => (isLiked ? removeFromLikes() : addToLikes());

  // add userID to likes array
  const addToLikes = () => {
    setLikes([...likes, userId]);
    dispatch(likePost({ userId, postId }));
  };

  const removeFromLikes = () => {
    setLikes(likes.filter((id) => id !== userId));
    dispatch(removeLikeFromPost({ userId, postId }));
  };

  const handleDelete = () => {
    handleCloseDeleteModal(); // close the delete confirmation modal
    dispatch(deletePost({ userId, postId }));
  };

  useEffect(() => {
    dispatch(fetchCommentsByPost({ userId, postId })).then((response) => {
      setComments(response.payload);
    });
  }, [dispatch, postId, userId]);

  const handleSaveComment = () => {
    // Save the comment and update the state
    dispatch(saveComment({ userId, postId, commentContent })).then(
      (response) => {
        setComments([...comments, response.payload]);
      }
    );
    // Reset the comment form
    setCommentContent("");
    // Hide the comment form
    setShowCommentForm(false);
  };

  const handleDeleteComment = (commentId) => {
    dispatch(deleteComment({ userId, postId, commentId })).then(() => {
      setComments(comments.filter((comment) => comment.id !== commentId));
    });
  };

  return (
    <Row
      className="p-3"
      style={{
        borderTop: "1px solid #D3D3D3",
        borderBottom: "1px solid #D3D3D3",
      }}
    >
      <Col sm={1}>
        <Image src={pic} fluid roundedCircle />
      </Col>
      <Col>
        <strong>Yuna Winaya</strong>
        <span> @yunawinaya · Apr 16</span>
        <p>{content}</p>
        <Image className="mb-3" src={imageUrl} style={{ width: 150 }} />
        <div className="d-flex justify-content-between">
          <Button variant="light">
            <i
              className="bi bi-chat"
              onClick={() => setShowCommentForm(true)}
            ></i>
          </Button>
          <Button variant="light">
            <i className="bi bi-repeat"></i>
          </Button>
          <Button variant="light" onClick={handleLike}>
            {isLiked ? (
              <i className="bi bi-heart-fill text-danger me-1"></i>
            ) : (
              <i className="bi bi-heart me-1"></i>
            )}
            {likes.length}
          </Button>
          <Button variant="light">
            <i className="bi bi-graph-up"></i> 61
          </Button>
          <Button variant="light" onClick={handleShowUpdateModal}>
            <i className="bi bi-pencil-square"></i>
          </Button>
          <Button variant="light" onClick={handleShowDeleteModal}>
            <i className="bi bi-trash"></i>
          </Button>
          <UpdatePostModal
            show={showUpdateModal}
            handleClose={handleCloseUpdateModal}
            postId={postId}
            originalPostContent={content}
          />
        </div>
        {comments.map((comment) => (
          <div key={comment.id}>
            <hr />
            <Row>
              <Col sm={1}>
                <Image src={pic} fluid roundedCircle />
              </Col>
              <Col>
                <strong>Yuna Winaya</strong>
                <span> @yunawinaya · Apr 16</span>
                <span className="offset-md-4">
                  <Button
                    variant="light"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    <i className="bi bi-x-lg"></i>
                  </Button>
                </span>
                <p>{comment.content}</p>
              </Col>
            </Row>
          </div>
        ))}
        {/* Comment Form */}
        {showCommentForm && (
          <Form className="mt-3">
            <Form.Group>
              <Form.Control
                type="text"
                className="mb-2"
                placeholder="Write a comment..."
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
              />
            </Form.Group>
            <Button variant="secondary" size="sm" onClick={handleSaveComment}>
              Post Comment
            </Button>
          </Form>
        )}
      </Col>
      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Tweet</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this tweet?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
}
