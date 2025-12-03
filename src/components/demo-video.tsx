"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useRef, useState, useEffect } from "react";

export function DemoVideo() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(true);

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    return (
        <div className="relative group rounded-2xl overflow-hidden shadow-2xl shadow-ocean-900/20 border border-sand-200 bg-sand-100 max-w-3xl mx-auto mt-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            <video
                ref={videoRef}
                src="/demo-video.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto block"
            />

            <button
                onClick={toggleMute}
                className="absolute bottom-4 right-4 p-3 bg-black/50 hover:bg-black/70 backdrop-blur-md text-white rounded-full transition-all transform hover:scale-105 active:scale-95"
                aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
                {isMuted ? (
                    <VolumeX className="w-5 h-5" />
                ) : (
                    <Volume2 className="w-5 h-5" />
                )}
            </button>

            {/* Overlay to encourage interaction if muted */}
            {isMuted && (
                <div
                    className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-transparent transition-colors cursor-pointer pointer-events-none"
                >
                    <div className="px-4 py-2 bg-black/60 backdrop-blur-md rounded-full text-white text-sm font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                        <Volume2 className="w-4 h-4" />
                        Click to Unmute
                    </div>
                </div>
            )}
            {/* Click handler for the whole video container to toggle mute easily */}
            <div
                className="absolute inset-0 cursor-pointer"
                onClick={toggleMute}
            />
        </div>
    );
}
