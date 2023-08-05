import { signOut } from "firebase/auth";
import React from "react";
import swal from "sweetalert";
import { notify } from "../../helpers";
import { auth } from "../../firebase/firebase";
import { useSelector } from "react-redux";

const SidebarMenu = () => {
  const user = useSelector(({ auth }) => auth?.user);
  console.log({ user });
  const handleLogout = () => {
    try {
      swal({
        text: "Are you sure you want to logout?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          await signOut(auth);
        }
      });
    } catch (error) {
      console.error({ error: error?.message });
      notify({
        message: error?.message,
        type: "error",
      });
    }
  };
  return (
    <div className="side-menu flex-lg-column me-lg-1 ms-lg-0">
      {/* <!-- LOGO --> */}
      <div className="navbar-brand-box">
        <a href="index.html" className="logo logo-dark">
          <span className="logo-sm">
            <img src="assets/images/logo.svg" alt="" height="30" />
          </span>
        </a>

        <a href="index.html" className="logo logo-light">
          <span className="logo-sm">
            <img src="assets/images/logo.svg" alt="" height="30" />
          </span>
        </a>
      </div>
      {/* <!-- end navbar-brand-box --> */}

      {/* <!-- Start side-menu nav --> */}
      <div className="flex-lg-column my-auto">
        <ul
          className="nav nav-pills side-menu-nav justify-content-center"
          role="tablist"
        >
          <li
            className="nav-item"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Profile"
          >
            <a
              className="nav-link"
              id="pills-user-tab"
              data-bs-toggle="pill"
              href="#pills-user"
              role="tab"
            >
              <i className="ri-user-2-line"></i>
            </a>
          </li>
          <li
            className="nav-item"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Chats"
          >
            <a
              className="nav-link active"
              id="pills-chat-tab"
              data-bs-toggle="pill"
              href="#pills-chat"
              role="tab"
            >
              <i className="ri-message-3-line"></i>
            </a>
          </li>
          <li
            className="nav-item"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Groups"
          >
            <a
              className="nav-link"
              id="pills-groups-tab"
              data-bs-toggle="pill"
              href="#pills-groups"
              role="tab"
            >
              <i className="ri-group-line"></i>
            </a>
          </li>

          <li className="nav-item dropdown profile-user-dropdown d-inline-block d-lg-none">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                src={user?.photo_url}
                alt=""
                className="profile-user rounded-circle"
              />
            </a>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="#">
                Profile <i className="ri-profile-line float-end text-muted"></i>
              </a>
              <a className="dropdown-item" href="#">
                Setting{" "}
                <i className="ri-settings-3-line float-end text-muted"></i>
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" onClick={() => handleLogout()}>
                Log out{" "}
                <i className="ri-logout-circle-r-line float-end text-muted"></i>
              </a>
            </div>
          </li>
        </ul>
      </div>
      {/* <!-- end side-menu nav --> */}

      <div className="flex-lg-column d-none d-lg-block">
        <ul className="nav side-menu-nav justify-content-center">
          <li className="nav-item">
            <a
              className="nav-link light-dark-mode"
              href="#"
              data-bs-toggle="tooltip"
              data-bs-trigger="hover"
              data-bs-placement="right"
              title="Dark / Light Mode"
            >
              <i className="ri-sun-line theme-mode-icon"></i>
            </a>
          </li>

          <li className="nav-item btn-group dropup profile-user-dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                src={user?.photo_url}
                alt=""
                className="profile-user rounded-circle"
              />
            </a>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="#">
                Profile <i className="ri-profile-line float-end text-muted"></i>
              </a>
              <a className="dropdown-item" href="#">
                Setting{" "}
                <i className="ri-settings-3-line float-end text-muted"></i>
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" onClick={() => handleLogout()}>
                Log out{" "}
                <i className="ri-logout-circle-r-line float-end text-muted"></i>
              </a>
            </div>
          </li>
        </ul>
      </div>
      {/* <!-- Side menu user --> */}
    </div>
  );
};

export default SidebarMenu;
