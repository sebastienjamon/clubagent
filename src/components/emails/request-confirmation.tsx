import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Section,
    Text,
    Tailwind,
} from "@react-email/components";
import * as React from "react";

interface RequestConfirmationEmailProps {
    businessName: string;
    agentRole: string;
}

export const RequestConfirmationEmail = ({
    businessName,
    agentRole,
}: RequestConfirmationEmailProps) => {
    const previewText = `We received your request for ${agentRole}`;

    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Tailwind
                config={{
                    theme: {
                        extend: {
                            colors: {
                                ocean: {
                                    950: "#042f2e",
                                    900: "#134e4a",
                                },
                                sand: {
                                    50: "#fafaf9",
                                    100: "#f5f5f4",
                                    500: "#78716c",
                                },
                                gold: {
                                    400: "#fbbf24",
                                },
                            },
                        },
                    },
                }}
            >
                <Body className="bg-sand-50 my-auto mx-auto font-sans">
                    <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px] bg-white">
                        <Section className="mt-[32px]">
                            <Text className="text-ocean-950 text-[24px] font-bold text-center p-0 my-[30px] mx-0">
                                Club Agent
                            </Text>
                        </Section>
                        <Heading className="text-ocean-950 text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                            Request Received
                        </Heading>
                        <Text className="text-black text-[14px] leading-[24px]">
                            Hello,
                        </Text>
                        <Text className="text-black text-[14px] leading-[24px]">
                            Thank you for your interest in expanding your digital workforce. We have received your request for a new agent.
                        </Text>
                        <Section className="bg-sand-100 rounded-lg p-6 my-6 border border-sand-200">
                            <Text className="text-ocean-900 text-[16px] font-bold m-0 mb-2">
                                Request Details:
                            </Text>
                            <Text className="text-sand-500 text-[14px] m-0 mb-1">
                                Business: <span className="text-ocean-950 font-medium">{businessName}</span>
                            </Text>
                            <Text className="text-sand-500 text-[14px] m-0">
                                Role: <span className="text-ocean-950 font-medium">{agentRole}</span>
                            </Text>
                        </Section>
                        <Text className="text-black text-[14px] leading-[24px]">
                            Our concierge team will review your requirements and contact you within 24 hours to finalize the configuration and pricing.
                        </Text>
                        <Text className="text-black text-[14px] leading-[24px]">
                            If you have any immediate questions, please reply to this email.
                        </Text>
                        <Text className="text-sand-500 text-[12px] leading-[24px] mt-8 text-center">
                            © 2025 Club Agent. All rights reserved.
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default RequestConfirmationEmail;
