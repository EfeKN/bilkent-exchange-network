import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { profileUrl, secondhandUrl } from "../../data-types/constants";
import {
  Conversation,
  ProfileContextType,
  UserContextType,
  UserProfile,
} from "../../data-types/datatypes";
import { SecondhandPost } from "../../data-types/posts";
import {
  useAuthContext,
  useProfileContext,
} from "../authentication/AuthHelpers";
import DeletePostButton from "../components/DeletePostButton";
import EditPostButton from "../components/EditPostButton";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import ReportPostButton from "../components/ReportPostButton";
import Messenger from "../message/Messenger";

export default function SecondHandPostDetails() {
  const [post, setPost] = useState<SecondhandPost>({} as SecondhandPost);
  const [poster, setPoster] = useState<UserProfile>({} as UserProfile);
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();
  const user = (useAuthContext() as unknown as UserContextType).user;
  const profile = (useProfileContext() as unknown as ProfileContextType)
    .profile;
  const [isMessengerVisible, setIsMessengerVisible] = useState<boolean>(false);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation>({} as Conversation);

  const handleMessengerClick = () => {
    setIsMessengerVisible(!isMessengerVisible);
  };

  const handleDMBoxClick = () => {
    // Check if there is an existing conversation with that user, if there isn't create one
    axios
      .get(
        "http://localhost:3000/conversation/conversation/userID/" + user?._id
      )
      .then((res) => {
        const conversation = res.data.find((conv: Conversation) => {
          return (
            conv.userIDs.includes("" + user?._id) &&
            conv.userIDs.includes("" + poster.userID)
          );
        });

        if (conversation) {
          conversation.username = poster?.username;
          setSelectedConversation(conversation);
        } else {
          const newConversation: Conversation = {
            userIDs: ["" + user?._id, "" + poster?.userID],
            messages: [],
            username: poster?.username,
          };
          setSelectedConversation(newConversation);

          axios
            .post(
              "http://localhost:3000/conversation/conversation/",
              newConversation
            )
            .then((res) => {
              // SUCCESFULLY CREATED CONVERSATION
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    setIsMessengerVisible(true);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${secondhandUrl}/${id}`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (post.poster === profile?.userID) {
      setPoster(profile);
    } else {
      axios
        .get(`${profileUrl}/${post.poster}`)
        .then((res) => {
          setPoster(res.data.profile);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {});
    }
  }, [post]);

  return (
    <div className="outer-container">
      <Header onMessengerClick={handleMessengerClick} />
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="postdetails-container">
          <div className="postdetails-left-container">
            <div className="postdetails-title">{post.title}</div>
            <div className="postdetails-image">
              <img src={post.image} alt={post.title} />
            </div>
          </div>

          <div className="postdetails-right-container">
            <div className="postdetails-edit-delete-container">
              {post.poster == user?._id ? (
                <>
                  <EditPostButton postId={"" + post._id} type="secondhand" />
                  <DeletePostButton
                    postId={String(post._id)}
                    profileId={String(poster?._id)}
                    type="secondhand"
                  />
                </>
              ) : (
                <ReportPostButton
                  postId={String(post._id)}
                  profileId={String(poster?._id)}
                  type="secondhand"
                  title={post.title}
                />
              )}
            </div>
            <div className="postdetails-user-info-container">
              <div className="postdetails-username-dmbox">
                <Link to={`/profile/` + poster?.userID}>
                  {poster?.username}
                </Link>
                <div className="postdetails-dmbox-container">
                  <img
                    className="img-fluid mx-auto d-block max-w-4vw max-h-4vh"
                    src="/src/assets/dmbox.png"
                    alt="DM Box"
                    title="Send DM"
                    onClick={handleDMBoxClick}
                  />
                </div>
              </div>
              <div className="postdetails-user-info">
                <div className="postdetails-user-info-label"> Reputation:</div>
                <div className="postdetails-user-info-value">
                  {" "}
                  {poster?.reputation}
                </div>
              </div>
              <div className="postdetails-user-info">
                <div className="postdetails-user-info-label"> Joined At:</div>
                <div className="postdetails-user-info-value">
                  {" "}
                  {String(poster?.createdAt).slice(0, 10)}
                </div>
              </div>
            </div>

            <div className="postdetails-details-container">
              <div className="postdetails-price">
                <p>{post.price}₺</p>
              </div>
              <div className="postdetails-description">
                <p>{post.description}</p>
              </div>
              <div className="postdetails-details-info">
                <div className="postdetails-details-info-label">Category:</div>
                <div className="postdetails-details-info-value">
                  {" "}
                  {post.category}
                </div>
              </div>
              <div className="postdetails-details-info">
                <div className="postdetails-details-info-label">Date:</div>
                <div className="postdetails-details-info-value">
                  {String(post.createdAt).slice(0, 10)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        className={`messenger-box ${isMessengerVisible ? "open" : "closed"}`}
      >
        <Messenger
          onClick={handleMessengerClick}
          selectedConversation={selectedConversation}
        />
      </div>
    </div>
  );
}
