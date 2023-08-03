import React from "react";
import { useSelector } from "react-redux";

const ProfileTab = () => {
  const user = useSelector(({ auth }) => auth?.user);
  console.log({ user });
  return (
    <div
      className="tab-pane"
      id="pills-user"
      role="tabpanel"
      aria-labelledby="pills-user-tab"
    >
      {/* <!-- Start profile content --> */}
      <div>
        <div className="px-4 pt-4">
          <div className="user-chat-nav float-end">
            <div className="dropdown">
              <a
                href="#"
                className="font-size-18 text-muted dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="ri-more-2-fill"></i>
              </a>
              <div className="dropdown-menu dropdown-menu-end">
                <a className="dropdown-item" href="#">
                  Edit
                </a>
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
              </div>
            </div>
          </div>
          <h4 className="mb-0">My Profile</h4>
        </div>

        <div className="text-center p-4 border-bottom">
          <div className="mb-4">
            <img
              src={user?.photo_url}
              className="rounded-circle avatar-lg img-thumbnail"
              alt=""
            />
          </div>

          <h5 className="font-size-16 mb-1 text-truncate">{user?.username}</h5>
          <p className="text-muted text-truncate mb-1">
            <i className="ri-record-circle-fill font-size-10 text-success me-1 ms-0 d-inline-block"></i>{" "}
            Active
          </p>
        </div>
        {/* <!-- End profile user --> */}

        {/* <!-- Start user-profile-desc --> */}
        <div className="p-4 user-profile-desc" data-simplebar>
          <div className="text-muted">
            <p className="mb-4">
              If several languages coalesce, the grammar of the resulting
              language is more simple and regular than that of the individual.
            </p>
          </div>

          <div id="tabprofile" className="accordion">
            <div className="accordion-item card border mb-2">
              <div className="accordion-header" id="about2">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#about"
                  aria-expanded="true"
                  aria-controls="about"
                >
                  <h5 className="font-size-14 m-0">
                    <i className="ri-user-2-line me-2 ms-0 ms-0 align-middle d-inline-block"></i>{" "}
                    About
                  </h5>
                </button>
              </div>
              <div
                id="about"
                className="accordion-collapse collapse show"
                aria-labelledby="about2"
                data-bs-parent="#tabprofile"
              >
                <div className="accordion-body">
                  <div>
                    <p className="text-muted mb-1">Name</p>
                    <h5 className="font-size-14">{user?.username}</h5>
                  </div>

                  <div className="mt-4">
                    <p className="text-muted mb-1">Email</p>
                    <h5 className="font-size-14">{user?.email}</h5>
                  </div>

                  <div className="mt-4">
                    <p className="text-muted mb-1">Time</p>
                    <h5 className="font-size-14">11:40 AM</h5>
                  </div>

                  <div className="mt-4">
                    <p className="text-muted mb-1">Location</p>
                    <h5 className="font-size-14 mb-0">California, USA</h5>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- End About card --> */}

            <div className="card accordion-item border">
              <div className="accordion-header" id="attachfile2">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#attachfile"
                  aria-expanded="false"
                  aria-controls="attachfile"
                >
                  <h5 className="font-size-14 m-0">
                    <i className="ri-attachment-line me-2 ms-0 ms-0 align-middle d-inline-block"></i>{" "}
                    Attached Files
                  </h5>
                </button>
              </div>
              <div
                id="attachfile"
                className="accordion-collapse collapse"
                aria-labelledby="attachfile2"
                data-bs-parent="#tabprofile"
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
                          <h5 className="font-size-14 mb-1">Admin-A.zip</h5>
                          <p className="text-muted font-size-13 mb-0">
                            12.5 MB
                          </p>
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
            {/* <!-- End Attached Files card --> */}
          </div>
          {/* <!-- end profile-user-accordion --> */}
        </div>
        {/* <!-- end user-profile-desc --> */}
      </div>
      {/* <!-- End profile content --> */}
    </div>
  );
};

export default ProfileTab;
