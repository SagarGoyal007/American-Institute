import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");


    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);


        try {

            const response = await fetch(
                "http://localhost:5000/api/admin/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );


            const result = await response.json();


            if (!response.ok) {

                throw new Error(
                    result.message ||
                    "Invalid email or password."
                );

            }


            // ================= SAVE TOKEN =================

            localStorage.setItem(
                "adminToken",
                result.token
            );


            // ================= DASHBOARD =================

            navigate("/admin/dashboard");


        } catch (error) {

            console.error(
                "Admin Login Error:",
                error
            );

            setError(
                error.message ||
                "Login failed. Please try again."
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="admin-login-page">


            {/* =================================================
                LOGIN CARD
            ================================================= */}

            <div className="admin-login-card">


                {/* ================= LOGO ================= */}

                <div className="admin-logo">

                    <div className="admin-logo-icon">
                        AI
                    </div>

                    <h1>
                        American Institute
                    </h1>

                    <p>
                        Administration Panel
                    </p>

                </div>


                {/* ================= TITLE ================= */}

                <div className="admin-login-heading">

                    <h2>
                        Welcome Back
                    </h2>

                    <p>
                        Sign in to access the admin dashboard
                    </p>

                </div>


                {/* ================= ERROR ================= */}

                {error && (

                    <div className="admin-error">

                        <span>
                            ⚠
                        </span>

                        <p>
                            {error}
                        </p>

                    </div>

                )}


                {/* ================= FORM ================= */}

                <form
                    className="admin-login-form"
                    onSubmit={handleLogin}
                >


                    {/* ================= EMAIL ================= */}

                    <div className="admin-form-group">

                        <label>
                            Admin Email
                        </label>

                        <div className="admin-input-wrapper">

                            <span className="admin-input-icon">
                                ✉
                            </span>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                placeholder="Enter admin email"
                                autoComplete="username"
                                required
                            />

                        </div>

                    </div>


                    {/* ================= PASSWORD ================= */}

                    <div className="admin-form-group">

                        <label>
                            Password
                        </label>

                        <div className="admin-input-wrapper">

                            <span className="admin-input-icon">
                                🔒
                            </span>

                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                placeholder="Enter password"
                                autoComplete="current-password"
                                required
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >
                                {showPassword
                                    ? "🙈"
                                    : "👁️"
                                }
                            </button>

                        </div>

                    </div>


                    {/* ================= LOGIN BUTTON ================= */}

                    <button
                        type="submit"
                        className="admin-login-btn"
                        disabled={loading}
                    >

                        {loading ? (

                            <>
                                <span className="login-spinner"></span>

                                Signing In...
                            </>

                        ) : (

                            <>
                                Sign In
                                <span>→</span>
                            </>

                        )}

                    </button>

                </form>


                {/* ================= SECURITY ================= */}

                <div className="admin-security">

                 
                    <p>
                        Secure Admin Access
                    </p>

                </div>


                {/* ================= FOOTER ================= */}

                <p className="admin-login-footer">

                    © 2026 American Institute
                    Designed by SAP INNOVATIONS

                </p>

            </div>

        </div>

    );

}


export default AdminLogin;