import { useEffect, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";

export default function ProfilePostCard({ content, postId }) {
  const [likes, setLikes] = useState(0);
  const pic =
    "https://media.licdn.com/dms/image/C5603AQG9hvnbZ2IsZw/profile-displayphoto-shrink_800_800/0/1630294362361?e=1694044800&v=beta&t=K1NzEr_OHL4ueDqmj2_MS4tSVx3lOyKNuYzHBKymX1c";

  useEffect(() => {
    fetch(
      `https://twitter-api-sigmaschooltech.sigma-school-full-stack.repl.co/likes/post/${postId}`
    )
      .then((response) => response.json())
      .then((data) => setLikes(data.length))
      .catch((error) => console.error("Error:", error));
  }, [postId]);
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
        <span> @Yuna Winaya · Apr 16</span>
        <p>{content}</p>
        <div className="d-flex justify-content-between">
          <Button variant="light">
            <i className="bi bi-chat"></i>
          </Button>
          <Button variant="light">
            <i className="bi bi-repeat"></i>
          </Button>
          <Button variant="light">
            <i className="bi bi-heart"></i> {likes}
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
