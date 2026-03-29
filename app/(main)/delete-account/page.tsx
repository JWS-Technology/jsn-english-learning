import { Trash2, Mail, ArrowLeft, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function DeleteAccount() {
    return (
        <main className="min-h-screen bg-[#F8FAFC] py-20 px-6">
            <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-12">

                <Link href="/" className="inline-flex items-center text-sm font-bold text-slate-500 mb-8 hover:text-blue-600 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to JSN Academy
                </Link>

                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
                        <Trash2 className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-[#0F172A] tracking-tight">Delete Account</h1>
                        <p className="text-slate-500 font-medium mt-1">Request permanent data removal</p>
                    </div>
                </div>

                <div className="space-y-6 text-slate-600 leading-relaxed">
                    <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex gap-3">
                        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <p className="text-sm text-amber-800 font-medium">
                            Warning: This action is permanent. Once your account is deleted, your mock exam history, scores, and access cannot be recovered.
                        </p>
                    </div>

                    <section>
                        <h3 className="text-lg font-bold text-[#0F172A] mb-2">How to request deletion</h3>
                        <p>
                            To delete your JSN English Learning account and all associated data, please send an email from your registered email address to:
                        </p>
                        <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center font-bold text-[#0F172A]">
                            <Mail className="w-5 h-5 mr-3 text-blue-600" />
                            support@jsnenglishlearning.com
                        </div>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold text-[#0F172A] mb-2">What data will be deleted?</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Your personal profile (Email and Name).</li>
                            <li>Your complete Mock Exam history and performance analytics.</li>
                            <li>Your login credentials and session data.</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold text-[#0F172A] mb-2">Processing Time</h3>
                        <p>
                            Once we receive your request, our team will verify your identity and process the deletion within <strong>7 business days</strong>. You will receive a confirmation email once the process is complete.
                        </p>
                    </section>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-100 text-center text-xs text-slate-400 font-medium">
                    JWS Technologies | Developer Joe Rakesh
                </div>
            </div>
        </main>
    );
}