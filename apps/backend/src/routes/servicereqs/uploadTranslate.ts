import express, { Request, Response } from "express";
import multer from "multer";
import { translateText } from "./translationService";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/",
  upload.single("file"),
  async (req: Request, res: Response): Promise<void> => {
    const file = req.file;
    const { targetLanguage } = req.body;

    if (!file || !targetLanguage) {
      res.status(400).json({ error: "Missing file or language" });
      return;
    }

    try {
      // assume .txt
      const text = file.buffer.toString("utf-8");
      const translatedText = await translateText(text, targetLanguage);
      res.json({ translatedText });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Translation failed" });
    }
  },
);

export default router;
