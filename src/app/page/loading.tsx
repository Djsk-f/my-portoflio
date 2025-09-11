export default function Loading() {
  return (
    <body className="loading">
      <div className="loading__container">
        <div className="loading__spinner"></div>
        <p className="loading__text">Chargement...</p>
      </div>
    </body>
  );
}