type Prop = {
  message: string;
}

export default function Notification(props: Prop) {
  const {message} = props
  return (
    <div className="notification">{message}</div>
  )
}