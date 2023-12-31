import { useContext, useEffect } from "react";
import { Button, Col, Image, Nav, Row, Spinner } from "react-bootstrap";
import ProfilePostCard from "./ProfilePostCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsByUser } from "../features/posts/PostSlice";
import { AuthContext } from "./AuthProvider";

export default function ProfileMidBody() {
  const url =
    "https://marketplace.canva.com/EAE850WrkBk/1/0/1600w/canva-dark-brown-minimalist-illustration-welcome-to-my-timeline-twitter-header-uZB0o0wl4ZY.jpg";
  const pic =
    "https://media.licdn.com/dms/image/C5603AQG9hvnbZ2IsZw/profile-displayphoto-shrink_800_800/0/1630294362361?e=1694044800&v=beta&t=K1NzEr_OHL4ueDqmj2_MS4tSVx3lOyKNuYzHBKymX1c";

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const loading = useSelector((state) => state.posts.loading);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    dispatch(fetchPostsByUser(currentUser.uid));
  }, [dispatch, currentUser]);

  return (
    <Col sm={6} className="bg-light" style={{ border: "1px solid lightgrey" }}>
      <Image src={url} fluid />
      <br />
      <Image
        src={pic}
        roundedCircle
        style={{
          width: 150,
          position: "absolute",
          top: "140px",
          border: "4px solid #F8F9FA",
          marginLeft: 15,
        }}
      />

      <Row className="justify-content-end">
        <Col xs="auto">
          <Button className="rounded-pill mt-2" variant="outline-secondary">
            Edit Profile
          </Button>
        </Col>
      </Row>

      <p
        className="mt-5"
        style={{ margin: 0, fontWeight: "bold", fontSize: "15px" }}
      >
        Yuna Winaya
      </p>
      <p style={{ marginBottom: "2px" }}>@yunawinaya</p>
      <p>
        I am currently studying to switch careers to be a software developer at
        sigmaschool.co
      </p>
      <p>Entrepreneur</p>
      <p>
        <strong>271</strong> Following <strong>610</strong> Followers
      </p>
      <Nav variant="underline" defaultActiveKey="/home" justify>
        <Nav.Item>
          <Nav.Link eventKey="/home">Tweets</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">Replies</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">Highlights</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-3">Media</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-4">Likes</Nav.Link>
        </Nav.Item>
      </Nav>
      {loading && (
        <Spinner animation="border" className="ms-3 mt-3" variant="primary" />
      )}
      {posts.map((post) => (
        <ProfilePostCard key={post.id} post={post} />
      ))}
    </Col>
  );
}
