const { EmailClient } = require("@azure/communication-email");

// This code retrieves your connection string from an environment variable.
const connectionString = "endpoint=https://azurecommsservices.africa.communication.azure.com/;accesskey=JiMQlf55CL4Fz1PwhJCFsYaNRWZh160B5BHqRZ65eAyLVhfySVVhfhL1QYxbxJw2ioNmupmFJp6kzbLT+7i/Eg==";
const client = new EmailClient(connectionString);

async function main() {
    const emailMessage = {
        senderAddress: "DoNotReply@gigachat.cloudns.org",
        content: {
            subject: "Test Email",
            plainText: "Hello world via email.",
        },
        recipients: {
            to: [{ address: "sheshtawy456@gmail.com" }],
        },
    };

    const poller = await client.beginSend(emailMessage);
    const result = await poller.pollUntilDone();
}

main();