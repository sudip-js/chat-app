import React from "react";

const GroupsTab = () => {
  return (
    <div
      className="tab-pane"
      id="pills-groups"
      role="tabpanel"
      aria-labelledby="pills-groups-tab"
    >
      {/* <!-- Start Groups content --> */}
      <div>
        <div className="p-4">
          <div className="user-chat-nav float-end">
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="Create group"
            >
              {/* <!-- Button trigger modal --> */}
              <button
                type="button"
                className="btn btn-link text-decoration-none text-muted font-size-18 py-0"
                data-bs-toggle="modal"
                data-bs-target="#addgroup-exampleModal"
              >
                <i className="ri-group-line me-1 ms-0"></i>
              </button>
            </div>
          </div>
          <h4 className="mb-4">Groups</h4>

          {/* <!-- Start add group Modal --> */}
          <div
            className="modal fade"
            id="addgroup-exampleModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="addgroup-exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h5
                    className="modal-title font-size-16"
                    id="addgroup-exampleModalLabel"
                  >
                    Create New Group
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body p-4">
                  <form>
                    <div className="mb-4">
                      <label
                        htmlFor="addgroupname-input"
                        className="form-label"
                      >
                        Group Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="addgroupname-input"
                        placeholder="Enter Group Name"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="form-label">Group Members</label>
                      <div className="mb-3">
                        <button
                          className="btn btn-light btn-sm"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#groupmembercollapse"
                          aria-expanded="false"
                          aria-controls="groupmembercollapse"
                        >
                          Select Members
                        </button>
                      </div>

                      <div className="collapse" id="groupmembercollapse">
                        <div className="card border">
                          <div className="card-header">
                            <h5 className="font-size-15 mb-0">Contacts</h5>
                          </div>
                          <div className="card-body p-2">
                            <div
                              data-simplebar
                              style={{
                                maxHeight: "150px",
                              }}
                            >
                              <div>
                                <div className="p-3 fw-bold text-primary">
                                  A
                                </div>

                                <ul className="list-unstyled contact-list">
                                  <li>
                                    <div className="form-check">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="memberCheck1"
                                        checked
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="memberCheck1"
                                      >
                                        Albert Rodarte
                                      </label>
                                    </div>
                                  </li>

                                  <li>
                                    <div className="form-check">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="memberCheck2"
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="memberCheck2"
                                      >
                                        Allison Etter
                                      </label>
                                    </div>
                                  </li>
                                </ul>
                              </div>

                              <div>
                                <div className="p-3 fw-bold text-primary">
                                  C
                                </div>

                                <ul className="list-unstyled contact-list">
                                  <li>
                                    <div className="form-check">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="memberCheck3"
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="memberCheck3"
                                      >
                                        Craig Smiley
                                      </label>
                                    </div>
                                  </li>
                                </ul>
                              </div>

                              <div>
                                <div className="p-3 fw-bold text-primary">
                                  D
                                </div>

                                <ul className="list-unstyled contact-list">
                                  <li>
                                    <div className="form-check">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="memberCheck4"
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="memberCheck4"
                                      >
                                        Daniel Clay
                                      </label>
                                    </div>
                                  </li>
                                </ul>
                              </div>

                              <div>
                                <div className="p-3 fw-bold text-primary">
                                  I
                                </div>

                                <ul className="list-unstyled contact-list">
                                  <li>
                                    <div className="form-check">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="memberCheck5"
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="memberCheck5"
                                      >
                                        Iris Wells
                                      </label>
                                    </div>
                                  </li>
                                </ul>
                              </div>

                              <div>
                                <div className="p-3 fw-bold text-primary">
                                  J
                                </div>

                                <ul className="list-unstyled contact-list">
                                  <li>
                                    <div className="form-check">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="memberCheck6"
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="memberCheck6"
                                      >
                                        Juan Flakes
                                      </label>
                                    </div>
                                  </li>

                                  <li>
                                    <div className="form-check">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="memberCheck7"
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="memberCheck7"
                                      >
                                        John Hall
                                      </label>
                                    </div>
                                  </li>

                                  <li>
                                    <div className="form-check">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="memberCheck8"
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="memberCheck8"
                                      >
                                        Joy Southern
                                      </label>
                                    </div>
                                  </li>
                                </ul>
                              </div>

                              <div>
                                <div className="p-3 fw-bold text-primary">
                                  M
                                </div>

                                <ul className="list-unstyled contact-list">
                                  <li>
                                    <div className="form-check">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="memberCheck9"
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="memberCheck9"
                                      >
                                        Michael Hinton
                                      </label>
                                    </div>
                                  </li>

                                  <li>
                                    <div className="form-check">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="memberCheck10"
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="memberCheck10"
                                      >
                                        Mary Farmer
                                      </label>
                                    </div>
                                  </li>
                                </ul>
                              </div>

                              <div>
                                <div className="p-3 fw-bold text-primary">
                                  P
                                </div>

                                <ul className="list-unstyled contact-list">
                                  <li>
                                    <div className="form-check">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="memberCheck11"
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="memberCheck11"
                                      >
                                        Phillis Griffin
                                      </label>
                                    </div>
                                  </li>
                                </ul>
                              </div>

                              <div>
                                <div className="p-3 fw-bold text-primary">
                                  R
                                </div>

                                <ul className="list-unstyled contact-list">
                                  <li>
                                    <div className="form-check">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="memberCheck12"
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="memberCheck12"
                                      >
                                        Rocky Jackson
                                      </label>
                                    </div>
                                  </li>
                                </ul>
                              </div>

                              <div>
                                <div className="p-3 fw-bold text-primary">
                                  S
                                </div>

                                <ul className="list-unstyled contact-list">
                                  <li>
                                    <div className="form-check">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="memberCheck13"
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="memberCheck13"
                                      >
                                        Simon Velez
                                      </label>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="addgroupdescription-input"
                        className="form-label"
                      >
                        Description
                      </label>
                      <textarea
                        className="form-control"
                        id="addgroupdescription-input"
                        rows="3"
                        placeholder="Enter Description"
                      ></textarea>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-link"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-primary">
                    Create Groups
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- End add group Modal --> */}

          <div className="search-box chat-search-box">
            <div className="input-group rounded-3">
              <span
                className="input-group-text text-muted bg-light pe-1 ps-3"
                id="basic-addon1"
              >
                <i className="ri-search-line search-icon font-size-18"></i>
              </span>
              <input
                type="text"
                className="form-control bg-light"
                placeholder="Search groups..."
                aria-label="Search groups..."
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
          {/* <!-- Search Box--> */}
        </div>

        {/* <!-- Start chat-group-list --> */}
        <div className="p-4 chat-message-list chat-group-list" data-simplebar>
          <ul className="list-unstyled chat-list">
            <li>
              <a href="#">
                <div className="d-flex align-items-center">
                  <div className="chat-user-img me-3 ms-0">
                    <div className="avatar-xs">
                      <span className="avatar-title rounded-circle bg-primary-subtle text-primary">
                        G
                      </span>
                    </div>
                  </div>
                  <div className="flex-grow-1 overflow-hidden">
                    <h5 className="text-truncate font-size-14 mb-0">
                      #General
                    </h5>
                  </div>
                </div>
              </a>
            </li>

            <li>
              <a href="#">
                <div className="d-flex align-items-center">
                  <div className="chat-user-img me-3 ms-0">
                    <div className="avatar-xs">
                      <span className="avatar-title rounded-circle bg-primary-subtle text-primary">
                        R
                      </span>
                    </div>
                  </div>
                  <div className="flex-grow-1 overflow-hidden">
                    <h5 className="text-truncate font-size-14 mb-0">
                      #Reporting{" "}
                      <span className="badge badge-soft-danger rounded-pill float-end">
                        +23
                      </span>
                    </h5>
                  </div>
                </div>
              </a>
            </li>

            <li>
              <a href="#">
                <div className="d-flex align-items-center">
                  <div className="chat-user-img me-3 ms-0">
                    <div className="avatar-xs">
                      <span className="avatar-title rounded-circle bg-primary-subtle text-primary">
                        D
                      </span>
                    </div>
                  </div>
                  <div className="flex-grow-1 overflow-hidden">
                    <h5 className="text-truncate font-size-14 mb-0">
                      #Designers
                    </h5>
                  </div>
                </div>
              </a>
            </li>

            <li>
              <a href="#">
                <div className="d-flex align-items-center">
                  <div className="chat-user-img me-3 ms-0">
                    <div className="avatar-xs">
                      <span className="avatar-title rounded-circle bg-primary-subtle text-primary">
                        D
                      </span>
                    </div>
                  </div>
                  <div className="flex-grow-1 overflow-hidden">
                    <h5 className="text-truncate font-size-14 mb-0">
                      #Developers{" "}
                      <span className="badge badge-soft-danger rounded-pill float-end">
                        New
                      </span>
                    </h5>
                  </div>
                </div>
              </a>
            </li>

            <li>
              <a href="#">
                <div className="d-flex align-items-center">
                  <div className="chat-user-img me-3 ms-0">
                    <div className="avatar-xs">
                      <span className="avatar-title rounded-circle bg-primary-subtle text-primary">
                        P
                      </span>
                    </div>
                  </div>
                  <div className="flex-grow-1 overflow-hidden">
                    <h5 className="text-truncate font-size-14 mb-0">
                      #Project-alpha
                    </h5>
                  </div>
                </div>
              </a>
            </li>

            <li>
              <a href="#">
                <div className="d-flex align-items-center">
                  <div className="chat-user-img me-3 ms-0">
                    <div className="avatar-xs">
                      <span className="avatar-title rounded-circle bg-primary-subtle text-primary">
                        B
                      </span>
                    </div>
                  </div>
                  <div className="flex-grow-1 overflow-hidden">
                    <h5 className="text-truncate font-size-14 mb-0">#Snacks</h5>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
        {/* <!-- End chat-group-list --> */}
      </div>
      {/* <!-- End Groups content --> */}
    </div>
  );
};

export default GroupsTab;
