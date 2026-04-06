"use client";
import { motion } from "framer-motion";

const featureItems = [
    { title: "Curated Materials", desc: "100+ units of premium study materials updated for the 2026 exam cycle.", icon: "📚" },
    { title: "Expert Mentorship", desc: "Direct guidance from a Ph.D. qualified UGC-NET & TNSET professional educator.", icon: "🎓" },
    { title: "Success Record", desc: "Join thousands of successful TRB qualifiers who achieved their dreams with us.", icon: "🏆" },
    { title: "Supportive Learning", desc: "Individualized attention with doubt-clearing sessions and tracker tools.", icon: "🤝" },
];

export default function Features() {
    return (
        <section className="py-24 bg-slate-50 border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <span className="text-orange-600 font-black text-[10px] uppercase tracking-[0.3em]">Excellence Redefined</span>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-950 mt-4 tracking-tight">
                        Why Professionals Trust <br /> JSN English Learning
                    </h2>
                    <p className="mt-6 text-slate-500 font-medium">Experience excellence in TRB preparation with our comprehensive approach, expert guidance, and proven track record.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featureItems.map((item, idx) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white rounded-[2.5rem] p-10 border border-slate-100 hover:border-orange-200 hover:shadow-2xl hover:shadow-orange-500/5 transition-all group relative overflow-hidden"
                        >
                            <div className="text-4xl mb-8 group-hover:scale-110 transition-transform">{item.icon}</div>
                            <h3 className="font-bold text-xl text-slate-950">{item.title}</h3>
                            <p className="mt-4 text-slate-500 text-sm leading-relaxed font-medium">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}