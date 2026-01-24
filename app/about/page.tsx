import Link from "next/link";

export default function AboutPage() {
    return (
        <main className="bg-white">
            <section className="max-w-7xl mx-auto px-6 py-20">
                <h1 className="text-4xl font-bold text-slate-900">
                    Dr. S. Jerald Sagaya Nathan
                </h1>
                <p className="mt-2 text-lg text-slate-600">
                    Founder & Chief Educator – JSN English Learning
                </p>

                <div className="mt-10 grid md:grid-cols-3 gap-10">
                    {/* Profile */}
                    <div className="md:col-span-2">
                        <p className="text-slate-700 leading-relaxed">
                            With over 13 years of dedicated experience in English education
                            and TRB coaching, Dr. S. Jerald Sagaya Nathan has transformed the
                            lives of thousands of students across Tamil Nadu through
                            innovative teaching methods and unwavering commitment to
                            academic excellence.
                        </p>

                        <p className="mt-4 text-slate-700 leading-relaxed">
                            His expertise in English Literature, Grammar & Composition, and
                            competitive examinations has established JSN English Learning as
                            a trusted destination for TRB aspirants.
                        </p>

                        {/* Education */}
                        <h2 className="mt-8 text-2xl font-semibold text-slate-900">
                            Educational Background
                        </h2>
                        <ul className="mt-4 space-y-2 text-slate-700">
                            <li>• Ph.D. in English Literature</li>
                            <li>• M.A. English Literature</li>
                            <li>• M.A. Journalism & Mass Communication</li>
                            <li>• UGC-NET Qualified</li>
                            <li>• TNSET Qualified</li>
                        </ul>

                        {/* Philosophy */}
                        <h2 className="mt-8 text-2xl font-semibold text-slate-900">
                            Teaching Philosophy
                        </h2>
                        <ul className="mt-4 space-y-2 text-slate-700">
                            <li>• Student-centered learning</li>
                            <li>• Excellence through consistent practice</li>
                            <li>• Innovative teaching methods</li>
                            <li>• Holistic academic development</li>
                        </ul>
                    </div>

                    {/* Sidebar */}
                    <aside className="bg-slate-50 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-slate-900">
                            Academic Highlights
                        </h3>

                        <ul className="mt-4 space-y-3 text-slate-700">
                            <li>✔ 13+ Years Teaching Experience</li>
                            <li>✔ 8000+ Students Taught</li>
                            <li>✔ 95% TRB Success Rate</li>
                            <li>✔ 15+ Research Publications</li>
                            <li>✔ Assistant Professor of English</li>
                        </ul>

                        <Link
                            href="/contact"
                            className="inline-block mt-6 w-full text-center bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-800 transition"
                        >
                            Contact Dr. Nathan
                        </Link>
                    </aside>
                </div>
            </section>
        </main>
    );
}
