import { useAuth } from "../context/AuthContext";
import type { UserRole } from "../type";

const roles: UserRole[] = [
  "admin",
  "procurement",
  "sales_manager",
  "viewer",
];

export default function Login() {
  const { login } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow w-80">
        <h2 className="text-xl font-bold mb-4 text-center">
          Select Role
        </h2>

        <div className="space-y-2">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => login(role)}
              className="w-full px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Login as {role}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

