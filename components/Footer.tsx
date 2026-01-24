import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300">
            <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
                {/* Brand */}
                <div>
                    <h3 className="text-lg font-semibold text-white">
                        JSN English Learning
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed">
                        Led by Dr. S. Jerald Sagaya Nathan, JSN English Learning is Tamil
                        Nadu&apos;s premier TRB coaching center, dedicated to helping
                        aspiring teachers achieve their dreams.
                    </p>
                </div>

                {/* Founder */}
                <div>
                    <h4 className="text-white font-semibold mb-4">Founder & Director</h4>
                    <p className="text-sm">
                        Dr. S. Jerald Sagaya Nathan, Ph.D.
                    </p>
                    <p className="text-sm mt-2">
                        Assistant Professor of English
                    </p>
                    <p className="text-sm">
                        St. Joseph&apos;s College (Autonomous), Tiruchirappalli
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/materials">Study Materials</Link></li>
                        <li><Link href="/tests">Online Tests</Link></li>
                        <li><Link href="/youtube">YouTube Channel</Link></li>
                        <li><Link href="/about">About Dr. Nathan</Link></li>
                        <li><Link href="/contact">Contact Us</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="text-white font-semibold mb-4">Contact</h4>
                    <p className="text-sm">jsnathan1981@gmail.com</p>
                    <p className="text-sm mt-2">
                        +91 98432 87913 / +91 96292 87913
                    </p>
                    <p className="text-sm mt-2 leading-relaxed">
                        245/8, Astalakshmi Avenue, First Main Road, Vasan Valley,
                        Rettaivaikal Post, Tiruchirappalli – 620102
                    </p>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-slate-700 py-6 text-center text-sm">
                <p>
                    © {new Date().getFullYear()} JSN English Learning. All rights reserved.
                </p>
                <p className="mt-1 text-slate-400">
                    Founded by Dr. S. Jerald Sagaya Nathan | Website Developed by Joe Rakesh | JWS
                </p>
            </div>
        </footer>
    );
}
