"use client";
import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
            <ContactHero />

            <section className="max-w-7xl mx-auto px-6 py-20 w-full flex-1 -mt-10 relative z-20">
                <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
                    <ContactInfo />
                    <ContactForm />
                </div>
            </section>
        </main>
    );
}