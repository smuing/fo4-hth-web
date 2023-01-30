export default function Total() {
  return (
    <div className="container pb-3">
      <div className="card">
        <div className="card-body">
          <div className="card-title">
            <span className="left">놀라운맹구</span>
            <small className="text-muted center">총 10경기</small>
            <span className="right">나인범</span>
          </div>
          <div className="progress mb-2"></div>
        </div>
      </div>

      <style jsx>{`
        .card-title {
          display: grid;
          grid-template-columns: 2fr 1.5fr 2fr;
          align-items: center;
        }
        .left {
          text-align: left;
        }
        .center {
          text-align: center;
        }
        .right {
          text-align: right;
        }
      `}</style>
    </div>
  );
}
