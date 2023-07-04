import { useState } from "react";
import axios from "axios";

function ProfileEdit() {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put("/profile", {
        username,
        bio,
        profile_picture: profilePicture,
      });

      console.log(response.data);
      // Show success message or redirect to profile page
    } catch (error) {
      console.error("Error:", error.message);
      // Show error message
    }
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Bio:</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label>Profile Picture:</label>
          <input
            type="text"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default ProfileEdit;
