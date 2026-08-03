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
                    <p className="mt-4 text-sm leading-relaxed mb-6">
                        Led by Dr. S. Jerald Sagaya Nathan, JSN English Learning is Tamil
                        Nadu&apos;s premier TRB coaching center, dedicated to helping
                        aspiring teachers achieve their dreams.
                    </p>
                    {/* Google Play Store Button */}
                    <a
                        href="https://play.google.com/store/apps/details?id=com.jsnenglish.jsn_english_app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all border border-slate-700 hover:border-slate-500 shadow-sm hover:shadow-md"
                    >
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L14.4,12.71L10.03,8.34L15.34,5.3C15.82,5.03 16.37,5.06 16.81,5.32L21.36,8.04C22.06,8.45 22.06,9.54 21.36,9.95L16.81,12.67L16.81,15.12Z" />
                        </svg>
                        <div className="text-left">
                            <div className="text-[10px] leading-none text-slate-400 font-medium">GET IT ON</div>
                            <div className="text-sm font-bold leading-none mt-1">Google Play</div>
                        </div>
                    </a>
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
                        <li><Link href="/materials" className="hover:text-white transition-colors">Study Materials</Link></li>
                        <li><Link href="/tests" className="hover:text-white transition-colors">Online Tests</Link></li>
                        <li><Link href="/youtube" className="hover:text-white transition-colors">YouTube Channel</Link></li>
                        <li><Link href="/about" className="hover:text-white transition-colors">About Dr. Nathan</Link></li>
                        <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy and Policy</Link></li>
                        <li><Link href="/delete-account" className="hover:text-white transition-colors">Account Deletion</Link></li>
                        <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
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
            <div className="border-t border-slate-800 py-6 text-center text-sm">
                <p>
                    © {new Date().getFullYear()} JSN English Learning. All rights reserved.
                </p>
                <p className="mt-1 text-slate-500">
                    Founded by Dr. S. Jerald Sagaya Nathan | Website Developed by <a href="http://joerakesh.tech" target="_blank" className="hover:text-slate-300 transition-colors">Joe Rakesh | JWS</a>
                </p>
            </div>
        </footer>
    );
}