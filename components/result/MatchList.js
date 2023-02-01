export default function MatchList() {
  return (
    <div className="container pb-5">
      <div className="list-group">
        <button type="button" className="list-group-item list-group-item-action">
          <p className="date mb-1">2022년 03월 07일 22:40</p>
          <div className="grid">
            <p className="right">놀라운맹구</p>
            <div className="center">
              <h4>1 - 4</h4>
            </div>
            <p className="left">나인범</p>
          </div>
        </button>
      </div>

      <div>
        <button className="btn btn-primary mt-3" type="button" style={{ width: "100%" }}>
          더보기
        </button>
      </div>

      <style jsx>{`
        .date {
          color: #6c757d;
          font-size: 12px;
        }
      `}</style>
    </div>
  );
}
