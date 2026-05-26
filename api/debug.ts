export default function handler(req: any, res: any) {
  res.status(200).json({
    apiKeySet: !!process.env.GEMINI_API_KEY,
    apiKeyLength: process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.length : 0,
    nodeEnv: process.env.NODE_ENV || "production",
    timestamp: new Date().toISOString(),
  });
}
