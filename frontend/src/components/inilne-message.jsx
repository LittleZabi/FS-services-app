function InlineMessage({ type = "success", message, styles = {} }) {
  return (
    <div>
      <p style={styles} className={"inline-alert " + type}>
        {message}
      </p>
    </div>
  );
}
export default InlineMessage;
