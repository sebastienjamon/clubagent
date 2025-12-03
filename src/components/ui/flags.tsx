import React from "react";

export function USFlag({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 480"
            className={className}
            aria-label="United States Flag"
        >
            <path fill="#bd3d44" d="M0 0h640v480H0" />
            <path stroke="#fff" strokeWidth="37" d="M0 55.3h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640" />
            <path fill="#192f5d" d="M0 0h247v221H0" />
            <g fill="#fff">
                <path d="M15 16h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zM28 41h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zM15 66h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zM28 90h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zM15 115h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zM28 140h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zM15 165h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zM28 189h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9zm25 0h9v9h-9z" />
            </g>
        </svg>
    );
}

export function FrenchFlag({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 900 600"
            className={className}
            aria-label="France Flag"
        >
            <rect width="900" height="600" fill="#ED2939" />
            <rect width="600" height="600" fill="#fff" />
            <rect width="300" height="600" fill="#002395" />
        </svg>
    );
}
