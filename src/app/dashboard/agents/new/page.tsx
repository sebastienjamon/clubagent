import { AgentForm } from "@/components/agent-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewAgentPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link
                    href="/dashboard"
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Create New Agent</h1>
                    <p className="text-gray-500">Set up a new AI assistant for your business.</p>
                </div>
            </div>

            <AgentForm />
        </div>
    );
}
