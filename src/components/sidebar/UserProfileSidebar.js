import React from "react";
import { useGetChatID } from "../../hooks";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useState } from "react";
import { useEffect } from "react";
import moment from "moment/moment";
import Avatar from "../../resources/images/avatar-profile.png";

const UserProfileSidebar = () => {
  const [data, setData] = useState(null);
  const { receiverID } = useGetChatID();
  useEffect(() => {
    if (!receiverID) return;
    const docRef = doc(db, `users/${receiverID}`);
    const unsubscribe = onSnapshot(
      docRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const res = docSnapshot.data();
          if (res) {
            setData(res);
          }
        } else {
          console.error("Document not found in Firestore.");
        }
      },
      (error) => {
        console.error("Error getting real-time updates:", error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [receiverID]);
  return (
    <div className="user-profile-sidebar">
      <div className="px-3 px-lg-4 pt-3 pt-lg-4">
        <div className="user-chat-nav text-end">
          <button type="button" className="btn nav-btn" id="user-profile-hide">
            <i className="ri-close-line"></i>
          </button>
        </div>
      </div>

      <div className="text-center p-4 border-bottom">
        <div className="mb-4">
          <img
            src={data?.photo_url ?? Avatar}
            className="rounded-circle avatar-lg img-thumbnail"
            alt="Avatar"
          />
        </div>

        <h5 className="font-size-16 mb-1 text-truncate">
          {data?.username ?? ""}
        </h5>
        <p className="text-muted text-truncate mb-1">
          <i className="ri-record-circle-fill font-size-10 text-success me-1 ms-0"></i>{" "}
          Active
        </p>
      </div>
      {/* <!-- End profile user --> */}

      {/* <!-- Start user-profile-desc --> */}
      <div className="p-4 user-profile-desc" data-simplebar>
        <div className="accordion" id="myprofile">
          <div className="accordion-item card border mb-2">
            <div className="accordion-header" id="about3">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#aboutprofile"
                aria-expanded="true"
                aria-controls="aboutprofile"
              >
                <h5 className="font-size-14 m-0">
                  <i className="ri-user-2-line me-2 ms-0 align-middle d-inline-block"></i>{" "}
                  About
                </h5>
              </button>
            </div>
            <div
              id="aboutprofile"
              className="accordion-collapse collapse show"
              aria-labelledby="about3"
              data-bs-parent="#myprofile"
            >
              <div className="accordion-body">
                <div>
                  <p className="text-muted mb-1">Username</p>
                  <h5 className="font-size-14">{data?.username}</h5>
                </div>

                <div className="mt-4">
                  <p className="text-muted mb-1">Email</p>
                  <h5 className="font-size-14">{data?.email}</h5>
                </div>

                <div className="mt-4">
                  <p className="text-muted mb-1">Account Created At</p>
                  <h5 className="font-size-14">
                    {moment
                      .utc(data?.create_at?.seconds * 1000)
                      .format("MMM DD, YYYY")}
                  </h5>
                </div>

                {data?.phone_number && (
                  <div className="mt-4">
                    <p className="text-muted mb-1">Phone Number</p>
                    <h5 className="font-size-14">{data?.phone_number}</h5>
                  </div>
                )}
                {data?.pronunciation_name && (
                  <div className="mt-4">
                    <p className="text-muted mb-1">Pronunciation Name</p>
                    <h5 className="font-size-14">{data?.pronunciation_name}</h5>
                  </div>
                )}
                {data?.away_status && (
                  <div className="mt-4">
                    <p className="text-muted mb-1">Away Status</p>
                    <h5 className="font-size-14">{data?.away_status}</h5>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="accordion-item card border">
            <div className="accordion-header" id="attachfile3">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#attachprofile"
                aria-expanded="false"
                aria-controls="attachprofile"
              >
                <h5 className="font-size-14 m-0">
                  <i className="ri-attachment-line me-2 ms-0 align-middle d-inline-block"></i>{" "}
                  Attached Files
                </h5>
              </button>
            </div>
            <div
              id="attachprofile"
              className="accordion-collapse collapse"
              aria-labelledby="attachfile3"
              data-bs-parent="#myprofile"
            >
              <div className="accordion-body">
                <div className="card p-2 border mb-2">
                  <div className="d-flex align-items-center">
                    <div className="avatar-sm me-3 ms-0">
                      <div className="avatar-title bg-primary-subtle text-primary rounded font-size-20">
                        <i className="ri-file-text-fill"></i>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <div className="text-start">
                        <h5 className="font-size-14 mb-1">admin_v1.0.zip</h5>
                        <p className="text-muted font-size-13 mb-0">12.5 MB</p>
                      </div>
                    </div>

                    <div className="ms-4 me-0">
                      <ul className="list-inline mb-0 font-size-18">
                        <li className="list-inline-item">
                          <a href="#" className="text-muted px-1">
                            <i className="ri-download-2-line"></i>
                          </a>
                        </li>
                        <li className="list-inline-item dropdown">
                          <a
                            className="dropdown-toggle text-muted px-1"
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="ri-more-fill"></i>
                          </a>
                          <div className="dropdown-menu dropdown-menu-end">
                            <a className="dropdown-item" href="#">
                              Action
                            </a>
                            <a className="dropdown-item" href="#">
                              Another action
                            </a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">
                              Delete
                            </a>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="card p-2 border mb-2">
                  <div className="d-flex align-items-center">
                    <div className="avatar-sm me-3 ms-0">
                      <div className="avatar-title bg-primary-subtle text-primary rounded font-size-20">
                        <i className="ri-image-fill"></i>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <div className="text-start">
                        <h5 className="font-size-14 mb-1">Image-1.jpg</h5>
                        <p className="text-muted font-size-13 mb-0">4.2 MB</p>
                      </div>
                    </div>

                    <div className="ms-4 me-0">
                      <ul className="list-inline mb-0 font-size-18">
                        <li className="list-inline-item">
                          <a href="#" className="text-muted px-1">
                            <i className="ri-download-2-line"></i>
                          </a>
                        </li>
                        <li className="list-inline-item dropdown">
                          <a
                            className="dropdown-toggle text-muted px-1"
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="ri-more-fill"></i>
                          </a>
                          <div className="dropdown-menu dropdown-menu-end">
                            <a className="dropdown-item" href="#">
                              Action
                            </a>
                            <a className="dropdown-item" href="#">
                              Another action
                            </a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">
                              Delete
                            </a>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="card p-2 border mb-2">
                  <div className="d-flex align-items-center">
                    <div className="avatar-sm me-3 ms-0">
                      <div className="avatar-title bg-primary-subtle text-primary rounded font-size-20">
                        <i className="ri-image-fill"></i>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <div className="text-start">
                        <h5 className="font-size-14 mb-1">Image-2.jpg</h5>
                        <p className="text-muted font-size-13 mb-0">3.1 MB</p>
                      </div>
                    </div>

                    <div className="ms-4 me-0">
                      <ul className="list-inline mb-0 font-size-18">
                        <li className="list-inline-item">
                          <a href="#" className="text-muted px-1">
                            <i className="ri-download-2-line"></i>
                          </a>
                        </li>
                        <li className="list-inline-item dropdown">
                          <a
                            className="dropdown-toggle text-muted px-1"
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="ri-more-fill"></i>
                          </a>
                          <div className="dropdown-menu dropdown-menu-end">
                            <a className="dropdown-item" href="#">
                              Action
                            </a>
                            <a className="dropdown-item" href="#">
                              Another action
                            </a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">
                              Delete
                            </a>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="card p-2 border mb-2">
                  <div className="d-flex align-items-center">
                    <div className="avatar-sm me-3 ms-0">
                      <div className="avatar-title bg-primary-subtle text-primary rounded font-size-20">
                        <i className="ri-file-text-fill"></i>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <div className="text-start">
                        <h5 className="font-size-14 mb-1">Landing-A.zip</h5>
                        <p className="text-muted font-size-13 mb-0">6.7 MB</p>
                      </div>
                    </div>

                    <div className="ms-4 me-0">
                      <ul className="list-inline mb-0 font-size-18">
                        <li className="list-inline-item">
                          <a href="#" className="text-muted px-1">
                            <i className="ri-download-2-line"></i>
                          </a>
                        </li>
                        <li className="list-inline-item dropdown">
                          <a
                            className="dropdown-toggle text-muted px-1"
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="ri-more-fill"></i>
                          </a>
                          <div className="dropdown-menu dropdown-menu-end">
                            <a className="dropdown-item" href="#">
                              Action
                            </a>
                            <a className="dropdown-item" href="#">
                              Another action
                            </a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">
                              Delete
                            </a>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- end profile-user-accordion --> */}
      </div>
      {/* <!-- end user-profile-desc --> */}
    </div>
  );
};

export default UserProfileSidebar;
