export default function Total() {
  return (
    <div className="container pb-3">
      <div className="card">
        <div className="card-body">
          <div className="card-title grid">
            <span className="left">놀라운맹구</span>
            <small className="center text-muted">총 10경기</small>
            <span className="right">나인범</span>
          </div>
          <div className="progress mb-2">
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              style={{ width: "30%" }}
              aria-valuenow="33"
              aria-valuemin="0"
              aria-valuemax="100"></div>
            <div
              className="progress-bar progress-bar-striped progress-bar-animated bg-secondary"
              role="progressbar"
              style={{ width: "40%" }}
              aria-valuenow="33"
              aria-valuemin="0"
              aria-valuemax="100"></div>
            <div
              className="progress-bar progress-bar-striped progress-bar-animated bg-danger"
              role="progressbar"
              style={{ width: "30%" }}
              aria-valuenow="33"
              aria-valuemin="0"
              aria-valuemax="100"></div>
          </div>
          <div className="count-body">
            <div className="grid mb-1">
              <div className="left">
                <button type="button" className="btn btn-primary">
                  3
                </button>
              </div>
              <div className="center">
                <button type="button" className="btn btn-secondary">
                  4
                </button>
              </div>
              <div className="right">
                <button type="button" className="btn btn-danger">
                  3
                </button>
              </div>
            </div>
            <div className="grid">
              <small className="left text-muted">
                놀라운맹구
                <br />
                30%
              </small>
              <small className="center text-muted">
                무승부
                <br />
                40%
              </small>
              <small className="right text-muted">
                나인범
                <br />
                30%
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
