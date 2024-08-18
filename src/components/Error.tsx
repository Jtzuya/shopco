import ErrorIcon from "./admin/Icons/ErrorIcon";

export default function Error() {
  return (
    <div className="error">
      <h1 className="error__heading">404</h1>
      <p className="error__info">Under Construction...</p>
      <ErrorIcon />
    </div>
  )
}