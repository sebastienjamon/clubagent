'use client';

import { QRCodeSVG } from 'qrcode.react';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { QrCode, X, Copy, Check } from 'lucide-react';

interface AgentQRCodeProps {
    agentName: string;
    phoneNumber: string;
}

export function AgentQRCode({ agentName, phoneNumber }: AgentQRCodeProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Format: https://wa.me/<number>?text=<message>
    // Remove non-digits from phone number
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=Hi`;

    const handleCopy = () => {
        navigator.clipboard.writeText(whatsappUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="px-4 py-3 text-sand-400 hover:text-ocean-600 hover:bg-ocean-50 rounded-xl transition-colors border border-transparent hover:border-ocean-100"
                title="Get WhatsApp QR Code"
            >
                <QrCode className="w-5 h-5" />
            </button>

            {isOpen && mounted && createPortal(
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 font-sans">
                    <div
                        className="absolute inset-0 bg-ocean-950/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
                        onClick={() => setIsOpen(false)}
                    />

                    <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-sand-200 p-8 text-center">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 p-2 text-sand-400 hover:text-ocean-600 hover:bg-sand-100 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="mb-6">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <QrCode className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-ocean-950">Chat with {agentName}</h3>
                            <p className="text-sand-500 text-sm mt-2">Scan to start a WhatsApp conversation.</p>
                        </div>

                        <div className="bg-white p-4 rounded-xl border-2 border-sand-100 inline-block mb-6">
                            <QRCodeSVG
                                value={whatsappUrl}
                                size={200}
                                level="H"
                                includeMargin={true}
                                fgColor="#022c22" // ocean-950
                            />
                        </div>

                        <div className="flex items-center gap-2 p-3 bg-sand-50 rounded-xl border border-sand-100 text-sm text-sand-600 break-all justify-between group cursor-pointer hover:border-ocean-200 transition-colors" onClick={handleCopy}>
                            <span className="truncate">{whatsappUrl}</span>
                            <button className="p-1.5 bg-white rounded-lg border border-sand-200 text-sand-400 group-hover:text-ocean-600 transition-colors">
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}
