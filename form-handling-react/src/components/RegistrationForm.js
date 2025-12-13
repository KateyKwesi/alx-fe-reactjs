import { useState } from "react";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = formData;

  const [errors, setErrors] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setErrors("Email is required");
      return;
    }

    if (!password) {
      setErrors("Password is required");
      return;
    }

    if (!username) {
      setErrors("Username is required");
      return;
    }

    setErrors("");

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      await response.json();
      alert("Registration successful");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errors && <p style={{ color: "red" }}>{errors}</p>}

      <div>
        <label>Username:</label>
        <input name="username" value={username} onChange={handleChange} />
      </div>

      <div>
        <label>Email:</label>
        <input
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Password:</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Register</button>
    </form>
  );
}

export default RegistrationForm;
