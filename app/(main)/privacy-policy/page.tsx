import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-[#F8FAFC] py-20 px-6">
            <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-12">

                <Link href="/" className="inline-flex items-center text-sm font-bold text-blue-600 mb-8 hover:text-blue-700 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                </Link>

                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-[#0F172A] tracking-tight">Privacy Policy</h1>
                        <p className="text-slate-500 font-medium mt-1">Last updated: March 2026</p>
                    </div>
                </div>

                <div className="prose prose-slate  text-black max-w-none prose-headings:font-bold prose-headings:text-[#0F172A] prose-a:text-blue-600">
                    <p>
                        JSN English Learning ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by JSN English Learning.
                    </p>

                    <h3>1. Information We Collect</h3>
                    <p>
                        We collect information you provide directly to us when you create an account to use our Mock Exam application. This includes:
                    </p>
                    <ul>
                        <li><strong>Account Information:</strong> Your email address and a securely hashed password.</li>
                        <li><strong>Performance Data:</strong> Your test scores, selected answers, and exam history to provide you with review analytics.</li>
                    </ul>

                    <h3>2. How We Use Your Information</h3>
                    <p>We use the information we collect to:</p>
                    <ul>
                        <li>Authenticate your identity and secure your account.</li>
                        <li>Provide, maintain, and improve our mock exam services.</li>
                        <li>Calculate and store your exam results.</li>
                    </ul>

                    <h3>3. Data Security</h3>
                    <p>
                        We implement standard security measures to protect your personal information. Your passwords are never stored in plain text. However, please be aware that no method of transmission over the internet is 100% secure.
                    </p>

                    <h3>4. Third-Party Sharing</h3>
                    <p>
                        We do not sell, trade, or rent your personal identification information to others. We only share information with trusted third-party services (like our secure database providers) strictly to operate our app.
                    </p>

                    <h3>5. Your Rights</h3>
                    <p>
                        You have the right to request access to or deletion of your personal data. If you wish to delete your account and associated test history, please contact us.
                    </p>

                    <h3>6. Contact Us</h3>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us at: <br />
                        <strong>jsnathan1981@gmail.com</strong>
                    </p>
                </div>
            </div>
        </main>
    );
}