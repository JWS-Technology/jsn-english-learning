import Link from "next/link";

export default function YouTubePage() {
    return (
        <main className="bg-white">
            {/* Header */}
            <section className="bg-slate-50 border-b">
                <div className="max-w-7xl mx-auto px-6 py-16 text-center">
                    <h1 className="text-4xl font-bold text-slate-900">
                        JSN English Learning on YouTube
                    </h1>
                    <p className="mt-4 text-slate-600 max-w-3xl mx-auto">
                        Access free TRB preparation videos, English grammar lessons, and
                        expert guidance from Dr. S. Jerald Sagaya Nathan.
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
                {/* Video Embed */}
                <div className="w-full aspect-video rounded-xl overflow-hidden border">
                    <iframe
                        src="https://www.youtube.com/embed?listType=user_uploads&list=JSNEnglishLearning"
                        title="JSN English Learning YouTube Channel"
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>

                {/* Text + CTA */}
                <div>
                    <h2 className="text-2xl font-semibold text-slate-900">
                        Learn Anytime, Anywhere
                    </h2>

                    <p className="mt-4 text-slate-600 leading-relaxed">
                        JSN English Learning YouTube channel offers high-quality educational
                        content designed specifically for TRB aspirants. Learn at your own
                        pace with structured lessons, exam-focused explanations, and
                        real-world insights from 13+ years of teaching experience.
                    </p>

                    <ul className="mt-6 space-y-2 text-slate-700">
                        <li>✔ TRB-focused English Grammar lessons</li>
                        <li>✔ Literature explanations & important questions</li>
                        <li>✔ Exam strategies and tips</li>
                        <li>✔ Free learning resources</li>
                    </ul>

                    <div className="mt-8 flex gap-4 flex-wrap">
                        <Link
                            href="https://www.youtube.com/@JSNEnglishLearning"
                            target="_blank"
                            className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
                        >
                            Subscribe on YouTube
                        </Link>

                        <Link
                            href="/contact"
                            className="border border-slate-900 text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-slate-900 hover:text-white transition"
                        >
                            Contact JSN
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
