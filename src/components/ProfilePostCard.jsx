import { useEffect, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import jwtDecode from "jwt-decode";
import axios from "axios";

export default function ProfilePostCard({ content, postId }) {
  const [likes, setLikes] = useState([]);

  // Decoding to get the userId
  const token = localStorage.getItem("authToken");
  const decode = jwtDecode(token);
  const userId = decode.id;

  const pic =
    "https://media.licdn.com/dms/image/C5603AQG9hvnbZ2IsZw/profile-displayphoto-shrink_800_800/0/1630294362361?e=1694044800&v=beta&t=K1NzEr_OHL4ueDqmj2_MS4tSVx3lOyKNuYzHBKymX1c";
  const BASE_URL =
    "https://twitter-api-yunawinaya.sigma-school-full-stack.repl.co";

  useEffect(() => {
    fetch(`${BASE_URL}/likes/post/${postId}`)
      .then((response) => response.json())
      .then((data) => setLikes(data))
      .catch((error) => console.error("Error:", error));
  }, [postId]);

  const isLiked = likes.some((like) => like.user_id === userId);

  const handleLike = () => (isLiked ? removeFromLikes() : addToLikes());

  const addToLikes = () => {
    axios
      .post(`${BASE_URL}/likes`, {
        user_id: userId,
        post_id: postId,
      })
      .then((response) => {
        setLikes([...likes, { ...response.data, likes_id: response.data.id }]);
      })
      .catch((error) => console.error("Error:", error));
  };

  const removeFromLikes = () => {
    const like = likes.find((like) => like.user_id === userId);
    console.log(like);
    if (like) {
      axios
        .put(`${BASE_URL}/likes/${like.likes_id}`)
        .then(() => setLikes(likes.filter((like) => like.user_id !== userId)))
        .catch((error) => console.error("Error:", error));
    }
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
