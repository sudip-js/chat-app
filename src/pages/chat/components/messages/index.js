import React from "react";

const Messages = () => {
  return (
    <div className="w-100 overflow-hidden position-relative">
      <div className="p-3 p-lg-4 border-bottom user-chat-topbar">
        <div className="row align-items-center">
          <div className="col-sm-4 col-8">
            <div className="d-flex align-items-center">
              <div className="d-block d-lg-none me-2 ms-0">
                <a
                  href="javascript: void(0);"
                  className="user-chat-remove text-muted font-size-16 p-2"
                >
                  <i className="ri-arrow-left-s-line"></i>
                </a>
              </div>
              <div className="me-3 ms-0">
                <img
                  src="assets/images/users/avatar-4.jpg"
                  className="rounded-circle avatar-xs"
                  alt=""
                />
              </div>
              <div className="flex-grow-1 overflow-hidden">
                <h5 className="font-size-16 mb-0 text-truncate">
                  <a href="#" className="text-reset user-profile-show">
                    Doris Brown
                  </a>{" "}
                  <i className="ri-record-circle-fill font-size-10 text-success d-inline-block ms-1"></i>
                </h5>
              </div>
            </div>
          </div>
          <div className="col-sm-8 col-4">
            <ul className="list-inline user-chat-nav text-end mb-0">
              <li className="list-inline-item">
                <div className="dropdown">
                  <button
                    className="btn nav-btn dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="ri-search-line"></i>
                  </button>
                  <div className="dropdown-menu p-0 dropdown-menu-end dropdown-menu-md">
                    <div className="search-box p-2">
                      <input
                        type="text"
                        className="form-control bg-light border-0"
                        placeholder="Search.."
                      />
                    </div>
                  </div>
                </div>
              </li>

              <li className="list-inline-item d-none d-lg-inline-block me-2 ms-0">
                <button
                  type="button"
                  className="btn nav-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#audiocallModal"
                >
                  <i className="ri-phone-line"></i>
                </button>
              </li>

              <li className="list-inline-item d-none d-lg-inline-block me-2 ms-0">
                <button
                  type="button"
                  className="btn nav-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#videocallModal"
                >
                  <i className="ri-vidicon-line"></i>
                </button>
              </li>

              <li className="list-inline-item d-none d-lg-inline-block me-2 ms-0">
                <button type="button" className="btn nav-btn user-profile-show">
                  <i className="ri-user-2-line"></i>
                </button>
              </li>

              <li className="list-inline-item">
                <div className="dropdown">
                  <button
                    className="btn nav-btn dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="ri-more-fill"></i>
                  </button>
                  <div className="dropdown-menu dropdown-menu-end">
                    <a
                      className="dropdown-item d-block d-lg-none user-profile-show"
                      href="#"
                    >
                      View profile{" "}
                      <i className="ri-user-2-line float-end text-muted"></i>
                    </a>
                    <a
                      className="dropdown-item d-block d-lg-none"
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#audiocallModal"
                    >
                      Audio{" "}
                      <i className="ri-phone-line float-end text-muted"></i>
                    </a>
                    <a
                      className="dropdown-item d-block d-lg-none"
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#videocallModal"
                    >
                      Video{" "}
                      <i className="ri-vidicon-line float-end text-muted"></i>
                    </a>
                    <a className="dropdown-item" href="#">
                      Archive{" "}
                      <i className="ri-archive-line float-end text-muted"></i>
                    </a>
                    <a className="dropdown-item" href="#">
                      Muted{" "}
                      <i className="ri-volume-mute-line float-end text-muted"></i>
                    </a>
                    <a className="dropdown-item" href="#">
                      Delete{" "}
                      <i className="ri-delete-bin-line float-end text-muted"></i>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <!-- end chat user head --> */}

      {/* <!-- start chat conversation --> */}
      <div className="chat-conversation p-3 p-lg-4" data-simplebar="init">
        <ul className="list-unstyled mb-0">
          <li>
            <div className="conversation-list">
              <div className="chat-avatar">
                <img src="assets/images/users/avatar-4.jpg" alt="" />
              </div>

              <div className="user-chat-content">
                <div className="ctext-wrap">
                  <div className="ctext-wrap-content">
                    <p className="mb-0">Good morning</p>
                    <p className="chat-time mb-0">
                      <i className="ri-time-line align-middle"></i>{" "}
                      <span className="align-middle">10:00</span>
                    </p>
                  </div>
                  <div className="dropdown align-self-start">
                    <a
                      className="dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="ri-more-2-fill"></i>
                    </a>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="#">
                        Copy{" "}
                        <i className="ri-file-copy-line float-end text-muted"></i>
                      </a>
                      <a className="dropdown-item" href="#">
                        Save{" "}
                        <i className="ri-save-line float-end text-muted"></i>
                      </a>
                      <a className="dropdown-item" href="#">
                        Forward{" "}
                        <i className="ri-chat-forward-line float-end text-muted"></i>
                      </a>
                      <a className="dropdown-item" href="#">
                        Delete{" "}
                        <i className="ri-delete-bin-line float-end text-muted"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="conversation-name">Doris Brown</div>
              </div>
            </div>
          </li>

          <li className="right">
            <div className="conversation-list">
              <div className="chat-avatar">
                <img src="assets/images/users/avatar-1.jpg" alt="" />
              </div>

              <div className="user-chat-content">
                <div className="ctext-wrap">
                  <div className="ctext-wrap-content">
                    <p className="mb-0">
                      Good morning, How are you? What about our next meeting?
                    </p>
                    <p className="chat-time mb-0">
                      <i className="ri-time-line align-middle"></i>{" "}
                      <span className="align-middle">10:02</span>
                    </p>
                  </div>

                  <div className="dropdown align-self-start">
                    <a
                      className="dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="ri-more-2-fill"></i>
                    </a>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="#">
                        Copy{" "}
                        <i className="ri-file-copy-line float-end text-muted"></i>
                      </a>
                      <a className="dropdown-item" href="#">
                        Save{" "}
                        <i className="ri-save-line float-end text-muted"></i>
                      </a>
                      <a className="dropdown-item" href="#">
                        Forward{" "}
                        <i className="ri-chat-forward-line float-end text-muted"></i>
                      </a>
                      <a className="dropdown-item" href="#">
                        Delete{" "}
                        <i className="ri-delete-bin-line float-end text-muted"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="conversation-name">Patricia Smith</div>
              </div>
            </div>
          </li>

          <li>
            <div className="chat-day-title">
              <span className="title">Today</span>
            </div>
          </li>

          <li>
            <div className="conversation-list">
              <div className="chat-avatar">
                <img src="assets/images/users/avatar-4.jpg" alt="" />
              </div>

              <div className="user-chat-content">
                <div className="ctext-wrap">
                  <div className="ctext-wrap-content">
                    <p className="mb-0">Yeah everything is fine</p>
                    <p className="chat-time mb-0">
                      <i className="ri-time-line align-middle"></i>{" "}
                      <span className="align-middle">10:05</span>
                    </p>
                  </div>
                  <div className="dropdown align-self-start">
                    <a
                      className="dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="ri-more-2-fill"></i>
                    </a>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="#">
                        Copy{" "}
                        <i className="ri-file-copy-line float-end text-muted"></i>
                      </a>
                      <a className="dropdown-item" href="#">
                        Save{" "}
                        <i className="ri-save-line float-end text-muted"></i>
                      </a>
                      <a className="dropdown-item" href="#">
                        Forward{" "}
                        <i className="ri-chat-forward-line float-end text-muted"></i>
                      </a>
                      <a className="dropdown-item" href="#">
                        Delete{" "}
                        <i className="ri-delete-bin-line float-end text-muted"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="ctext-wrap">
                  <div className="ctext-wrap-content">
                    <p className="mb-0">& Next meeting tomorrow 10.00AM</p>
                    <p className="chat-time mb-0">
                      <i className="ri-time-line align-middle"></i>{" "}
                      <span className="align-middle">10:05</span>
                    </p>
                  </div>
                  <div className="dropdown align-self-start">
                    <a
                      className="dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="ri-more-2-fill"></i>
                    </a>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="#">
                        Copy{" "}
                        <i className="ri-file-copy-line float-end text-muted"></i>
                      </a>
                      <a className="dropdown-item" href="#">
                        Save{" "}
                        <i className="ri-save-line float-end text-muted"></i>
                      </a>
                      <a className="dropdown-item" href="#">
                        Forward{" "}
                        <i className="ri-chat-forward-line float-end text-muted"></i>
                      </a>
                      <a className="dropdown-item" href="#">
                        Delete{" "}
                        <i className="ri-delete-bin-line float-end text-muted"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="conversation-name">Doris Brown</div>
              </div>
            </div>
          </li>

          <li className="right">
            <div className="conversation-list">
              <div className="chat-avatar">
                <img src="assets/images/users/avatar-1.jpg" alt="" />
              </div>

              <div className="user-chat-content">
                <div className="ctext-wrap">
                  <div className="ctext-wrap-content">
                    <p className="mb-0">Wow that's great</p>
                    <p className="chat-time mb-0">
                      <i className="ri-time-line align-middle"></i>{" "}
                      <span className="align-middle">10:06</span>
                    </p>
                  </div>
                  <div className="dropdown align-self-start">
                    <a
                      className="dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="ri-more-2-fill"></i>
                    </a>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="#">
                        Copy{" "}
                        <i className="ri-file-copy-line float-end text-muted"></i>
                      </a>
                      <a className="dropdown-item" href="#">
                        Save{" "}
                        <i className="ri-save-line float-end text-muted"></i>
                      </a>
                      <a className="dropdown-item" href="#">
                        Forward{" "}
                        <i className="ri-chat-forward-line float-end text-muted"></i>
                      </a>
                      <a className="dropdown-item" href="#">
                        Delete{" "}
                        <i className="ri-delete-bin-line float-end text-muted"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="conversation-name">Patricia Smith</div>
              </div>
            </div>
          </li>

          <li>
            <div className="conversation-list">
              <div className="chat-avatar">
                <img src="assets/images/users/avatar-4.jpg" alt="" />
              </div>

              <div className="user-chat-content">
                <div className="ctext-wrap">
                  <div className="ctext-wrap-content">
                    <ul className="list-inline message-img  mb-0">
                      <li className="list-inline-item message-img-list me-2 ms-0">
                        <div>
                          <a
                            className="popup-img d-inline-block m-1"
                            href="assets/images/small/img-1.jpg"
                            title="Project 1"
                          >
                            <img
                              src="assets/images/small/img-1.jpg"
                              alt=""
                              className="rounded border"
                            />
                          </a>
                        </div>
                        <div className="message-img-link">
                          <ul className="list-inline mb-0">
                            <li className="list-inline-item">
                              <a
                                download="img-1.jpg"
                                href="assets/images/small/img-1.jpg"
                                className="fw-medium"
                              >
                                <i className="ri-download-2-line"></i>
                              </a>
                            </li>
                            <li className="list-inline-item dropdown">
                              <a
                                className="dropdown-toggle"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="ri-more-fill"></i>
                              </a>
                              <div className="dropdown-menu">
                                <a className="dropdown-item" href="#">
                                  Copy{" "}
                                  <i className="ri-file-copy-line float-end text-muted"></i>
                                </a>
                                <a className="dropdown-item" href="#">
                                  Save{" "}
                                  <i className="ri-save-line float-end text-muted"></i>
                                </a>
                                <a className="dropdown-item" href="#">
                                  Forward{" "}
                                  <i className="ri-chat-forward-line float-end text-muted"></i>
                                </a>
                                <a className="dropdown-item" href="#">
                                  Delete{" "}
                                  <i className="ri-delete-bin-line float-end text-muted"></i>
                                </a>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </li>

                      <li className="list-inline-item message-img-list">
                        <div>
                          <a
                            className="popup-img d-inline-block m-1"
                            href="assets/images/small/img-2.jpg"
                            title="Project 2"
                          >
                            <img
                              src="assets/images/small/img-2.jpg"
                              alt=""
                              className="rounded border"
                            />
                          </a>
                        </div>
                        <div className="message-img-link">
                          <ul className="list-inline mb-0">
                            <li className="list-inline-item">
                              <a
                                download="img-2.jpg"
                                href="assets/images/small/img-2.jpg"
                                className="fw-medium"
                              >
                                <i className="ri-download-2-line"></i>
                              </a>
                            </li>
                            <li className="list-inline-item dropdown">
                              <a
                                className="dropdown-toggle"
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
                                  Copy{" "}
                                  <i className="ri-file-copy-line float-end text-muted"></i>
                                </a>
                                <a className="dropdown-item" href="#">
                                  Save{" "}
                                  <i className="ri-save-line float-end text-muted"></i>
                                </a>
                                <a className="dropdown-item" href="#">
                                  Forward{" "}
                                  <i className="ri-chat-forward-line float-end text-muted"></i>
                                </a>
                                <a className="dropdown-item" href="#">
                                  Delete{" "}
                                  <i className="ri-delete-bin-line float-end text-muted"></i>
                                </a>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                    <p className="chat-time mb-0">
                      <i className="ri-time-line align-middle"></i>{" "}
                      <span className="align-middle">10:09</span>
                    </p>
                  </div>

                  <div className="dropdown align-self-start">
                    <a
                      className="dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="ri-more-2-fill"></i>
                    </a>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="#">
                        Copy{" "}
                        <i className="ri-file-copy-line float-end text-muted"></i>
                      </a>
                      <a className="dropdown-item" href="#">
                        Save{" "}
                        <i className="ri-save-line float-end text-muted"></i>
                      </a>
                      <a className="dropdown-item" href="#">
                        Forward{" "}
                        <i className="ri-chat-forward-line float-end text-muted"></i>
                      </a>
                      <a className="dropdown-item" href="#">
                        Delete{" "}
                        <i className="ri-delete-bin-line float-end text-muted"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="conversation-name">Doris Brown</div>
              </div>
            </div>
          </li>

          <li className="right">
            <div className="conversation-list">
              <div className="chat-avatar">
                <img src="assets/images/users/avatar-1.jpg" alt="" />
              </div>

              <div className="user-chat-content">
                <div className="ctext-wrap">
                  <div className="ctext-wrap-content">
                    <div className="card p-2 mb-2">
                      <div className="d-flex flex-wrap align-items-center attached-file">
                        <div className="avatar-sm me-3 ms-0 attached-file-avatar">
                          <div className="avatar-title bg-primary-subtle text-primary rounded font-size-20">
                            <i className="ri-file-text-fill"></i>
                          </div>
                        </div>
                        <div className="flex-grow-1 overflow-hidden">
                          <div className="text-start">
                            <h5 className="font-size-14 text-truncate mb-1">
                              admin_v1.0.zip
                            </h5>
                            <p className="text-muted text-truncate font-size-13 mb-0">
                              12.5 MB
                            </p>
                          </div>
                        </div>
                        <div className="ms-4 me-0">
                          <div className="d-flex gap-2 font-size-20 d-flex align-items-start">
                            <div>
                              <a
                                download="admin_v1.0.zip"
                                href="assets/images/small/admin_v1.0.zip"
                                className="fw-medium"
                              >
                                <i className="ri-download-2-line"></i>
                              </a>
                            </div>
                            <div className="dropdown">
                              <a
                                className="dropdown-toggle text-muted"
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
                                  Share{" "}
                                  <i className="ri-share-line float-end text-muted"></i>
                                </a>
                                <a className="dropdown-item" href="#">
                                  Delete{" "}
                                  <i className="ri-delete-bin-line float-end text-muted"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="chat-time mb-0">
                      <i className="ri-time-line align-middle"></i>{" "}
                      <span className="align-middle">10:16</span>
                    </p>
                  </div>

                  <div className="dropdown align-self-start">
                    <a
                      className="dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="ri-more-2-fill"></i>
                    </a>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="#">
                        Copy{" "}
                        <i className="ri-file-copy-line float-end text-muted"></i>
                      </a>
                      <a className="dropdown-item" href="#">
                        Save{" "}
                        <i className="ri-save-line float-end text-muted"></i>
                      </a>
                      <a className="dropdown-item" href="#">
                        Forward{" "}
                        <i className="ri-chat-forward-line float-end text-muted"></i>
                      </a>
                      <a className="dropdown-item" href="#">
                        Delete{" "}
                        <i className="ri-delete-bin-line float-end text-muted"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="conversation-name">Patricia Smith</div>
              </div>
            </div>
          </li>

          <li>
            <div className="conversation-list">
              <div className="chat-avatar">
                <img src="assets/images/users/avatar-4.jpg" alt="" />
              </div>

              <div className="user-chat-content">
                <div className="ctext-wrap">
                  <div className="ctext-wrap-content">
                    <p className="mb-0">
                      typing
                      <span className="animate-typing">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                      </span>
                    </p>
                  </div>
                </div>

                <div className="conversation-name">Doris Brown</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      {/* <!-- end chat conversation end --> */}

      {/* <!-- start chat input section --> */}
      <div className="chat-input-section p-3 p-lg-4 border-top mb-0">
        <div className="row g-0">
          <div className="col">
            <input
              type="text"
              className="form-control form-control-lg bg-light border-light"
              placeholder="Enter Message..."
            />
          </div>
          <div className="col-auto">
            <div className="chat-input-links ms-md-2 me-md-0">
              <ul className="list-inline mb-0">
                <li
                  className="list-inline-item"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Emoji"
                >
                  <button
                    type="button"
                    className="btn btn-link text-decoration-none font-size-16 btn-lg waves-effect"
                  >
                    <i className="ri-emotion-happy-line"></i>
                  </button>
                </li>
                <li
                  className="list-inline-item"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Attached File"
                >
                  <button
                    type="button"
                    className="btn btn-link text-decoration-none font-size-16 btn-lg waves-effect"
                  >
                    <i className="ri-attachment-line"></i>
                  </button>
                </li>
                <li className="list-inline-item">
                  <button
                    type="submit"
                    className="btn btn-primary font-size-16 btn-lg chat-send waves-effect waves-light"
                  >
                    <i className="ri-send-plane-2-fill"></i>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- end chat input section --> */}
    </div>
  );
};

export default Messages;
