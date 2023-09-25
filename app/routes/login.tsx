export default function Login() {
  return (
    <form method="post">
      <div className="container">
        <div className="content">
          <h1>login</h1>
          <div>
            <label>username</label>
            <input type="text" name="username" />
          </div>
          <div>
            <label>password</label>
            <input type="password" name="password" />
          </div>
          <button type="submit">submit</button>
        </div>
      </div>
    </form>
  );
}
