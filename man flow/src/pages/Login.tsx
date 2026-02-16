import { useAuth } from "../context/AuthContext";
import type { UserRole } from "../type";

export default function Login() {
  const { login } = useAuth();

  const roles: UserRole[] = ["admin", "procurement", "sales_manager", "viewer"];

  return (
    <div>
      <h1>Login</h1>

      {roles.map((role) => (
        <button key={role} onClick={() => login(role)}>
          Login as {role}
        </button>
      ))}
    </div>
  );
}
