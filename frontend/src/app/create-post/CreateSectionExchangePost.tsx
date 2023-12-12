import axios from "axios";
import { useState } from "react";
import { urlsPost } from "../../data-types/constants";
import { CreatePostProps } from "../../data-types/datatypes";
import { SectionexchangePost } from "../../data-types/posttypes";
import Loader from "../components/loader";
import { useAuthContext } from "../authentication/authHelpers";

export default function CreateSectionExchangePost(props: CreatePostProps) {
  const [loading, setLoading] = useState(false);
  const {user} = useAuthContext()
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const post: SectionexchangePost = {
      price: formData.get("price") as unknown as number,
      offeredCourse: formData.get("offeredCourse") as string,
      offeredSection: formData.get("offeredSection") as string,
      desiredCourse: formData.get("desiredCourse") as string,
      desiredSection: formData.get("desiredSection") as string,
      poster: user._id, 
    };

    axios
      .post(urlsPost.sectionexchange, post)
      .then((res) => {
        // TODO SUCCESFULLY SENT
      })
      .catch((err) => {
        console.log(err);
        // TODO ERROR MODAL
      });

    setLoading(false);
    props.onClose();
  };

  return (
    <div className="modal-overlay">
      <form onSubmit={handleSubmit} className="create-item-form w-35vw">
        {loading && <Loader />}
        <span className="close" onClick={props.onClose}>
          &times;
        </span>

        <div className="modal-form-group" style={{ textAlign: "left" }}>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            className="form-control"
          />
        </div>

        <div>
          <div className="modal-form-group mt-8 text-left">
            <div className="flex justify-center ">
              <div className="mx-4">
                <label htmlFor="offeredCourse">Offered Course</label>
                <input
                  type="text"
                  id="offeredCourse"
                  name="offeredCourse"
                  className="form-control"
                />
              </div>
              <div>
                <label htmlFor="offeredSection">Offered Section</label>
                <input
                  type="text"
                  id="offeredSection"
                  name="offeredSection"
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className="modal-form-group text-left">
            <div className="flex justify-center ">
              <div className="mx-4">
                <label htmlFor="desiredCourse">Desired Course</label>
                <input
                  type="text"
                  id="desiredCourse"
                  name="desiredCourse"
                  className="form-control"
                />
              </div>
              <div>
                <label htmlFor="desiredSection">Desired Section</label>
                <input
                  type="text"
                  id="desiredSection"
                  name="desiredSection"
                  className="form-control"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="modal-form-group mt-4">
          <button type="submit" className="btn btn-primary">
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
}