import "./BasicCard.css";

export default function BasicCard({ id, title, body, status, handleDelete }) {

    const pillClass =
        status === "in_progress" ? "pill-inprogress" :
        status === "done"        ? "pill-done"        :
                                   "pill-todo";

    const cardClass =
        status === "in_progress" ? "basic-card card-inprogress" :
        status === "done"        ? "basic-card card-done"        :
                                   "basic-card";

    return (
        <div className={cardClass}>
            <div className="card-body-content">
                <p className="card-title">{title}</p>
                {body && <p className="card-body-text">{body}</p>}
            </div>
            <div className="card-footer">
                <span className={`status-pill ${pillClass}`}>
                    {status.replace("_", " ")}
                </span>
                <button
                    className="delete-btn"
                    onClick={() => handleDelete(id)}
                    aria-label="Delete card"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}