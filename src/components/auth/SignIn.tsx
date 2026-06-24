import React, { useState } from "react";

interface SignInProps {
  onLogin: (email: string, role: 'member' | 'admin') => void;
}

const SignIn: React.FC<SignInProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Demo login logic
    if (email === "eric@ikimina.com" && password === "password123") {
      onLogin(email, "member");
    } else if (email === "samuel@ikimina.com" && password === "admin123") {
      onLogin(email, "admin");
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#ECE8DF] flex items-center justify-center p-6">
      <div className="w-full max-w-7xl bg-[#FCFAF7] rounded-[32px] overflow-hidden shadow-xl flex">
        
        {/* LEFT PANEL */}
        <div className="w-[43%] bg-[#2F6B47] p-12 flex flex-col justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center">
              <span className="text-white text-xl font-bold">IK</span>
            </div>

            <div>
              <h1 className="text-white font-bold text-3xl">
                IKIMINA
              </h1>
              <p className="text-emerald-100 tracking-[3px] text-sm">
                GENTS · INVESTMENT
              </p>
            </div>
          </div>

          {/* Content */}
          <div>
            <h2 className="text-white text-6xl font-bold leading-tight">
              Save together.
            </h2>

            <h2 className="text-white text-6xl font-bold leading-tight mb-8">
              Grow together.
            </h2>

            <p className="text-emerald-50 text-xl leading-relaxed mb-10">
              One transparent record for the group's
              contributions, shares and penalties —
              replacing the spreadsheet, keeping every
              transfer proof-backed.
            </p>

            <div className="space-y-5">
              <div className="flex items-center gap-4 text-white text-lg">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  ✓
                </div>
                <span>
                  20,000 RWF monthly share, tracked per month
                </span>
              </div>

              <div className="flex items-center gap-4 text-white text-lg">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  ✓
                </div>
                <span>
                  Automatic penalties for missed months
                </span>
              </div>

              <div className="flex items-center gap-4 text-white text-lg">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  ✓
                </div>
                <span>
                  Every payment verified by the treasurer
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div>
            <p className="text-emerald-200">
              Africa/Kigali · RWF · Est. 2025
            </p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-[57%] flex items-center justify-center px-16 py-12">
          <div className="w-full max-w-xl">

            <h1 className="text-6xl font-bold text-gray-900 mb-3">
              Welcome back
            </h1>

            <p className="text-gray-500 text-xl mb-10">
              Sign in to view your savings standing.
            </p>

            <form onSubmit={handleSubmit}>
              
              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl border border-red-200">
                  {error}
                </div>
              )}

              {/* Email */}
              <div className="mb-6">
                <label className="block mb-3 text-lg font-medium text-gray-800">
                  Email or phone
                </label>

                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full h-16 px-5 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#2F6B47]"
                />
              </div>

              {/* Password */}
              <div className="mb-6">
                <label className="block mb-3 text-lg font-medium text-gray-800">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full h-16 px-5 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#2F6B47]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-[#2F6B47] font-medium"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Remember */}
              <div className="flex justify-between items-center mb-8">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) =>
                      setRememberMe(e.target.checked)
                    }
                    className="w-5 h-5 accent-[#2F6B47]"
                  />

                  <span className="text-gray-700">
                    Remember me
                  </span>
                </label>

                <button
                  type="button"
                  className="text-[#2F6B47] font-medium"
                >
                  Forgot password?
                </button>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full h-16 bg-[#2F6B47] hover:bg-[#27593B] text-white rounded-2xl text-xl font-semibold transition"
              >
                Sign in
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4 my-8">
                <div className="flex-1 h-px bg-gray-300"></div>

                <span className="text-gray-400 text-sm">
                  secure access
                </span>

                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              {/* Footer Text */}
              <p className="text-center text-gray-500 leading-relaxed">
                Members are added by the group admin.
                <br />
                Contact your treasurer for access.
              </p>

              {/* Demo Credentials */}
              <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  <strong>Demo:</strong><br />
                  Member: eric@ikimina.com / password123<br />
                  Admin: samuel@ikimina.com / admin123
                </p>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;