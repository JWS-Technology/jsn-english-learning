"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X, ArrowRight, CheckCircle2, Loader2,
    MessageCircle, User, Phone, MapPin
} from "lucide-react";
import QRCode from "react-qr-code";
import axios from "axios";
import { useRouter } from "next/navigation";

interface InputFieldProps {
    label: string;
    icon: React.ReactNode;
    value: string;
    onChange: (v: string) => void; // This defines 'v' as a string for all users
    placeholder: string;
}

export default function CheckoutModal({ isOpen, onClose, material }: any) {
    const [step, setStep] = useState(1); // 1: Shipping Details, 2: Scan & Pay, 3: Final Verification
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [address, setAddress] = useState({ name: "", phone: "", fullAddress: "" });
    const router = useRouter();

    const upiId = "jsnathan1981-1@okhdfcbank";
    const upiUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent("Jerald Sagaya Nathan S")}&am=${material.price}&cu=INR&tn=${encodeURIComponent(address.name)}`;

    const handleCompleteOrder = async () => {
        try {
            setIsSubmitting(true);
            // 1. Save order to MongoDB
            await axios.post("/api/orders", {
                materialId: material._id,
                name: address.name,
                phone: address.phone,
                address: address.fullAddress,
                amount: material.price
            });

            // 2. Open WhatsApp for Staff Notification
            const message = `*New Order: JSN English Learning*%0A%0A` +
                `*Material:* ${material.title}%0A` +
                `*Name:* ${address.name}%0A` +
                `*Address:* ${address.fullAddress}`;

            window.open(`https://wa.me/919629287913?text=${message}`, "_blank");
            setStep(3); // Move to final confirmation
        } catch (err: any) {
            alert("Failed to register order. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFinalConfirm = () => {
        // ✅ AUTO-REFRESH: This forces the Sidebar to update and show the status view
        onClose();
        router.refresh();
        window.location.reload();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={onClose}
                className="absolute inset-0 bg-[#0F172A]/80 backdrop-blur-sm"
            />

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative w-full max-w-md bg-white rounded-[3rem] shadow-2xl overflow-hidden z-[310]"
            >
                {/* Header */}
                <div className="bg-[#0F172A] p-8 text-white flex justify-between items-center">
                    <div>
                        <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Step {step} of 3</p>
                        <h3 className="text-xl font-black">
                            {step === 1 ? "Shipping Details" : step === 2 ? "Scan & Pay" : "Final Verification"}
                        </h3>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X size={20} /></button>
                </div>

                <div className="p-8">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div key="step1" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-5">
                                <InputField
                                    label="Full Name"
                                    icon={<User size={16} />}
                                    value={address.name}
                                    onChange={(v: string) => setAddress({ ...address, name: v })}
                                    placeholder="Student Name"
                                />
                                <InputField label="Phone Number" icon={<Phone size={16} />} value={address.phone} onChange={(v) => setAddress({ ...address, phone: v })} placeholder="+91 00000 00000" />
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Delivery Address</label>
                                    <textarea
                                        rows={3}
                                        className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none font-bold text-sm text-[#0F172A] resize-none"
                                        value={address.fullAddress}
                                        onChange={(e) => setAddress({ ...address, fullAddress: e.target.value })}
                                        placeholder="Full address with Pincode"
                                    />
                                </div>
                                <button onClick={() => setStep(2)} disabled={!address.name || !address.fullAddress} className="w-full bg-[#0F172A] text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2">Continue to Payment <ArrowRight size={14} /></button>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -20, opacity: 0 }}
                                className="text-center space-y-6"
                            >
                                {/* Total Amount Badge */}
                                <div className="bg-orange-50 p-4 rounded-2xl text-orange-600 text-[10px] font-black uppercase tracking-[0.2em]">
                                    Total Amount: ₹{material.price}
                                </div>

                                {/* QR Code Container */}
                                <div className="flex flex-col items-center gap-4">
                                    <div className="flex justify-center p-5 bg-white border-4 border-slate-50 rounded-[2.5rem] shadow-inner transition-transform hover:scale-[1.02]">
                                        <QRCode value={upiUrl} size={180} />
                                    </div>

                                    {/* ✅ ADDED INSTRUCTION TEXT */}
                                    <div className="space-y-1">
                                        <p className="text-[11px] font-black text-[#0F172A] uppercase tracking-wider">
                                            Scan in GPay, PhonePe, or any UPI App
                                        </p>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                                            After Transcation inform the staff
                                        </p>
                                    </div>
                                </div>

                                {/* Payment Confirmation Button */}
                                <button
                                    onClick={handleCompleteOrder}
                                    disabled={isSubmitting}
                                    className="w-full bg-orange-500 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-orange-900/20 hover:bg-orange-600 transition-all active:scale-[0.98] disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <Loader2 className="animate-spin mx-auto w-5 h-5" />
                                    ) : (
                                        "I have Paid - Notify Staff"
                                    )}
                                </button>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div key="step3" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center space-y-8 py-4">
                                <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto">
                                    <MessageCircle className="w-10 h-10 text-orange-500" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-black text-[#0F172A]">Did you send the message?</h4>
                                    <p className="text-sm text-slate-500 mt-2 font-medium">Ensure you clicked "Send" in WhatsApp so we can verify your payment.</p>
                                </div>
                                <button onClick={handleFinalConfirm} className="w-full bg-[#0F172A] text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl">
                                    Yes, I have sent it
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}
function InputField({ label, icon, value, onChange, placeholder }: InputFieldProps) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
            <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">{icon}</div>
                <input
                    type="text"
                    className="w-full p-4 pl-12 bg-slate-50 rounded-2xl border-none outline-none font-bold text-sm text-[#0F172A]"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                />
            </div>
        </div>
    );
}