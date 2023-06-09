import React, { useEffect, useState } from "react";
import SideBar from "../../common/SideBar";
import { useTheme } from "@mui/styles";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import Navbar from "../../common/Navbar";
import { getProfile, updateProfile } from "../../actions/profileAction";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: "50%",
    marginRight: 22,
    marginLeft: 20,
    border: "2px solid #E0077D",
    [theme.breakpoints.down("md")]: {
      height: 70,
      width: 70,
   
    },
  },
  topBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginRight: 40,
  },
  topHome: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: 600,
    marginLeft: 15,
    marginRight: 10,
    marginTop: 12,
  },
  buttonUpload: {
    background: "linear-gradient(110.85deg, #F98DC8 -25.63%, #E0077D 157.96%)",
    color: "#212121",
    fontSize: 16,
    fontWeight: 600,
    border: "none",
    borderRadius: 12,
    width: 170,
    height: 50,
    marginRight: 25,
    [theme.breakpoints.down("md")]: {
      width: 120,
      height: 50,
    },
  },
  buttonDelete: {
    background: "#282826",
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: 600,
    border: "none",
    borderRadius: 12,
    width: 170,
    height: 50,
    marginRight: 25,
    [theme.breakpoints.down("md")]: {
      width: 70,
      height: 50,
      fontSize: 10,
    },
  },
  divider: {
    width: 30,
    height: 2,
    borderRadius: "10px",
    background: "linear-gradient(110.85deg, #F98DC8 -25.63%, #E0077D 157.96%)",
    position: "relative",
    top: 25,
    right: 55,
  },
  card: {
    backgroundColor: "white",
    width: "80%",
  },

  inputField: {
    borderRadius: 10,
    backgroundColor: "#1B1B1B !important",
    border: "2px solid #353535 !important",
    padding: "0px 0px 0px 10px",
    textDecoration: "none",
    color: "white",
    height: 50,
    width: "90%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    outline: "none",
    marginLeft: 20,
  },
  inputFieldName: {
    display: "flex",
    justifyContent: "flex-start",
    marginLeft: 30,
    color: "#E0077D",
    fontSize: 18,
    fontWeight: 600,
    marginTop: 20,
  },
  saveProfileButton: {
    background: "linear-gradient(110.85deg, #F98DC8 -25.63%, #E0077D 157.96%)",
    color: "#212121",
    fontSize: 16,
    fontWeight: 600,
    border: "none",
    borderRadius: 12,
    width: 170,
    height: 50,
  },
}));

function Profile() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [avatar, setAvatar] = useState("")
  const dispatch = useDispatch();
  const profile = useSelector((state) => state?.profile?.profile);

  const onSubmit = () => {
    let data = {
      name: name,
      username: username,
      email: email,
      location: location,
      bio: bio,
      avatar: avatar,
    };
    console.log("handle update ", data);
    dispatch(updateProfile(data));
  };

  useEffect(() => {
    console.log("fetching profile ");
    dispatch(getProfile());
  }, []);

  useEffect(() => {
    if (!profile) {
      return;
    }
    setName(profile?.name);
    setUsername(profile?.userName);
    setEmail(profile?.email);
    setBio(profile?.bio);
    setLocation(profile?.location);
    setAvatar(profile?.avatar)
  }, [profile]);

  const [imageFile, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const handleFileSelect = (event) => {
    setImage(event.target.files[0]);
    setImageName(event.target.files[0]?.name);
  };
  return (
    <div>
      <div className="row">
        <div className="col-md-2 mt-4">
          <SideBar />
        </div>
        <div className="col-md-10 mt-4">
          <Navbar />
          <h2
            className="d-flex justify-content-start"
            style={{
              color: "#E0077D",
              fontSize: 30,
              fontWeight: 500,
              marginLeft: 30,
            }}
          >
            Profile
          </h2>
          <div
            className="card mt-4 mb-4"
            style={{
              width: "90%",
              backgroundColor: "#1B1B17",
              borderRadius: 10,
              border: "1px solid #353535",
              marginLeft: 20,
            }}
          >
            <div className="d-flex justify-content-start align-items-center mt-3">
              <img
                className={classes.profileImage}
                src={
                  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzd8fHByb2Zlc3Npb25hbCUyMGltYWdlJTIwb2YlMjBtYW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                }
                alt="image-logo"
              />
              <button className={classes.buttonUpload} type="file" onChange={handleFileSelect} >
                Upload New Picture
              </button>
              <form>
                        <input
                          className={classes.dragText}
                          label="upload file"
                          type="file"
                          name="image"
                          key="{image}"
                          onChange={handleFileSelect}
                        />
                        <div id="upload-msg"></div>
                      </form>
              <button className={classes.buttonDelete}>Delete</button>
            </div>
            <h5 className={classes.inputFieldName}>Name</h5>
            <input
              className={classes.inputField}
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />{" "}
            <h5 className={classes.inputFieldName}>Username</h5>
            <input
              className={classes.inputField}
              type="text"
              placeholder="User Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />{" "}
            <h5 className={classes.inputFieldName}>Email</h5>
            <input
              className={classes.inputField}
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />{" "}
            <h5 className={classes.inputFieldName}>Location</h5>
            <input
              className={classes.inputField}
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />{" "}
            <h5 className={classes.inputFieldName}>Bio</h5>
            <textarea
              rows="8"
              cols="50"
              className={classes.inputField}
              type="textarea"
              placeholder="Bio"
              style={{ paddingLeft: 10, paddingTop: 10 }}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <div className="d-flex justify-content-center align-items-center mt-3 mb-4 ">
              <button className={classes.saveProfileButton} onClick={onSubmit}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
