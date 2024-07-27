type SubmitBtnProps = {
  value: string;
}

export default function SubmitBtn(props: SubmitBtnProps) {
  const { value } = props

  return (
    <input className="form__field-submit" type="submit" value={value} />
  )
}