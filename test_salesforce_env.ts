
import { authenticateSalesforce } from './src/lib/integrations/salesforce';

async function testAuth() {
    console.log("Testing Salesforce Auth with Env Vars...");
    console.log("Client ID present:", !!process.env.SALESFORCE_CLIENT_ID);
    console.log("Client Secret present:", !!process.env.SALESFORCE_CLIENT_SECRET);
    console.log("Instance URL present:", !!process.env.SALESFORCE_INSTANCE_URL);

    const result = await authenticateSalesforce({
        instance_url: '',
        client_id: '',
        client_secret: '',
        object_name: 'Case'
    });

    if (result && result.access_token) {
        console.log("Authentication SUCCESS!");
    } else {
        console.log("Authentication FAILED.");
    }
}

testAuth();
