import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import Footer from "./Footer";
import { useState } from "react";

export default function Menu() {
  const [onMenu, setOnMenu] = useState(false);
  return (
    <nav>
      <FontAwesomeIcon
        icon={faBars}
        style={{ fontSize: 24, cursor: "pointer" }}
        onClick={() => setOnMenu(true)}
      />

      {onMenu && (
        <div className="menu-container">
          <div className="menu">
            <div className="header mb-3">
              <span>
                <strong>최근 검색 유저</strong>
              </span>
              <FontAwesomeIcon
                icon={faXmark}
                style={{ fontSize: 24, cursor: "pointer" }}
                onClick={() => setOnMenu(false)}
              />
            </div>
            <div className="list-group">
              <div className="list-group-item list-group-item-action">
                놀라운맹구 VS GALAHAD
              </div>
            </div>
            <Footer />
          </div>
        </div>
      )}

      <style jsx>{`
        nav {
          padding: 8px 12px;
        }
        .menu-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgb(0 0 0 / 30%);
          z-index: 2;
        }
        .menu {
          position: absolute;
          top: 0;
          width: 75%;
          height: 100%;
          padding: 12px;
          background-color: #ffffff;
          z-index: 3;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .list-group-item {
          cursor: pointer;
          text-align: center;
        }
      `}</style>
    </nav>
  );
}
