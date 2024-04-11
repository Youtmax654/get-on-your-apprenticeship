import { Handler } from "@netlify/functions";

const handler: Handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello from real function!" }),
  };
};

export default handler;
