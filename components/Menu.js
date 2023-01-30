import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Menu() {
  return (
    <nav>
      <FontAwesomeIcon icon={faBars} style={{ fontSize: 24, cursor: "pointer" }} />

      <style jsx>{`
        nav {
          padding: 8px 12px;
        }
      `}</style>
    </nav>
  );
}
