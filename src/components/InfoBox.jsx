function InfoBox({ title, description, points }) {
  return (
    <div className="info-box">
      <h3>{title}</h3>
      <p>{description}</p>
      <ul>
        {points.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </div>
  );
}

export default InfoBox;
