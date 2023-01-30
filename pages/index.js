import Footer from "@/components/Footer";
import Menu from "@/components/Menu";
import Total from "@/components/result/Total";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <Menu />
      <div className="form container pb-4">
        <input type="text" className="form-control mb-1" placeholder="구단주명" />
        <span className="mb-1">VS</span>
        <input type="text" className="form-control mb-2" placeholder="구단주명" />
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="abnormalGame" />
          <label className="form-check-label" htmlFor="abnormalGame">
            몰수승, 몰수패 포함
          </label>
        </div>
        <button className="btn btn-primary mt-3" type="button">
          검색
        </button>
        <button className="btn btn-danger mt-2" type="button">
          취소
        </button>
      </div>
      <div>
        <Total />
      </div>

      <Footer />

      <style jsx>{`
        .form {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .form-check {
          width: 100%;
        }
        .btn {
          width: 100%;
        }
      `}</style>
    </div>
  );
}
