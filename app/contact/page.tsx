import Link from "next/link";

export default function ContactPage() {
    return (
        <main className="bg-white">
            {/* Header */}
            <section className="bg-slate-50 border-b">
                <div className="max-w-7xl mx-auto px-6 py-16 text-center">
                    <h1 className="text-4xl font-bold text-slate-900">
                        Contact JSN English Learning
                    </h1>
                    <p className="mt-4 text-slate-600 max-w-3xl mx-auto">
                        Get in touch with Dr. S. Jerald Sagaya Nathan for academic guidance,
                        course information, or any TRB-related inquiries.
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16">
                {/* Left: Contact Info */}
                <div>
                    <h2 className="text-2xl font-semibold text-slate-900">
                        Get in Touch
                    </h2>

                    <p className="mt-4 text-slate-600">
                        Reach out for personalized academic support and expert guidance.
                        We usually respond within 24 hours.
                    </p>

                    <div className="mt-8 space-y-6 text-slate-700">
                        <div>
                            <h3 className="font-semibold">Email</h3>
                            <p className="text-sm mt-1">jsnathan1981@gmail.com</p>
                        </div>

                        <div>
                            <h3 className="font-semibold">Phone</h3>
                            <p className="text-sm mt-1">
                                +91 98432 87913 <br /> +91 96292 87913
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold">Address</h3>
                            <p className="text-sm mt-1 leading-relaxed">
                                245/8, Astalakshmi Avenue,
                                <br />
                                First Main Road, Vasan Valley,
                                <br />
                                Rettaivaikal Post,
                                <br />
                                Tiruchirappalli – 620102,
                                <br />
                                Tamil Nadu, India
                            </p>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-10 flex gap-4 flex-wrap">
                        <Link
                            href="tel:+919843287913"
                            className="bg-slate-900 text-white px-5 py-3 rounded-lg text-sm font-semibold hover:bg-slate-800 transition"
                        >
                            Call Now
                        </Link>

                        <Link
                            href="mailto:jsnathan1981@gmail.com"
                            className="border border-slate-900 text-slate-900 px-5 py-3 rounded-lg text-sm font-semibold hover:bg-slate-900 hover:text-white transition"
                        >
                            Send Email
                        </Link>
                    </div>
                </div>

                {/* Right: Contact Form (Static) */}
                <div className="bg-slate-50 rounded-xl p-8">
                    <h2 className="text-2xl font-semibold text-slate-900">
                        Send Us a Message
                    </h2>

                    <p className="mt-2 text-sm text-slate-600">
                        Fill out the form below and we&apos;ll get back to you as soon as
                        possible.
                    </p>

                    <form className="mt-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700">
                                Full Name *
                            </label>
                            <input
                                type="text"
                                placeholder="Your full name"
                                className="mt-1 w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700">
                                Email *
                            </label>
                            <input
                                type="email"
                                placeholder="your.email@example.com"
                                className="mt-1 w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                placeholder="+91 98432 87913"
                                className="mt-1 w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700">
                                Inquiry Category
                            </label>
                            <select className="mt-1 w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900">
                                <option>General Inquiry</option>
                                <option>TRB Coaching</option>
                                <option>Study Materials</option>
                                <option>Online Classes</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700">
                                Message *
                            </label>
                            <textarea
                                rows={4}
                                placeholder="Please describe your inquiry..."
                                className="mt-1 w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                            />
                        </div>

                        <button
                            type="button"
                            disabled
                            className="w-full bg-slate-300 text-slate-500 py-3 rounded-lg font-semibold cursor-not-allowed"
                        >
                            Send Message (Coming Soon)
                        </button>
                    </form>
                </div>
            </section>
        </main>
    );
}
