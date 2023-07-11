import { useContext, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { likePost, removeLikeFromPost } from "../features/posts/PostSlice";
import { AuthContext } from "./AuthProvider";

export default function ProfilePostCard({ post }) {
  const { content, id: postId } = post;
  const [likes, setLikes] = useState(post.likes || []);
  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser.uid;

  // user has liked the post if their id is in the likes array
  const isLiked = likes.includes(userId);

  const pic =
    "https://media.licdn.com/dms/image/C5603AQG9hvnbZ2IsZw/profile-displayphoto-shrink_800_800/0/1630294362361?e=1694044800&v=beta&t=K1NzEr_OHL4ueDqmj2_MS4tSVx3lOyKNuYzHBKymX1c";

  const handleLike = () => (isLiked ? removeFromLikes() : addToLikes());

  // add userID to likes array
  const addToLikes = () => {
    setLikes([...likes, userId]);
    dispatch(likePost({ userId, postId }));
  };

  // remove userID from likes array and update the backend
  const removeFromLikes = () => {
    setLikes(likes.filter((id) => id !== userId));
    dispatch(removeLikeFromPost({ userId, postId }));
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
        <div className="d-flex justify-content-between">
          <Button variant="light">
            <i className="bi bi-chat"></i>
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
          <Button variant="light">
            <i className="bi bi-upload"></i>
          </Button>
        </div>
      </Col>
    </Row>
  );
}
