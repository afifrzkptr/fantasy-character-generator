import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API endpoint for dynamic character portrait generation
  app.post('/api/generate-portrait', async (req, res) => {
    try {
      const { name, characterClass, race, title, backstory, style = 'cartoon video game' } = req.body;

      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(400).json({
          error: 'GEMINI_API_KEY missing from environment.',
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const prompt = `Highly stylized ${style} character portrait of fantasy character ${name}, a ${race} ${characterClass} with title "${title}". Epic cartoon video game character art, colorful, vibrant lighting, stylized 3D render, clean centered portrait, detailed armor/clothing, heroic expression. Background: subtle fantasy glow. Context: ${backstory || ''}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-image',
        contents: {
          parts: [{ text: prompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: '1:1',
          },
        },
      });

      let imageUrl: string | null = null;
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData?.data) {
            const mime = part.inlineData.mimeType || 'image/png';
            imageUrl = `data:${mime};base64,${part.inlineData.data}`;
            break;
          }
        }
      }

      if (imageUrl) {
        return res.json({ imageUrl });
      } else {
        return res.status(500).json({ error: 'No image generated in response.' });
      }
    } catch (err: any) {
      console.error('Error generating portrait via Gemini:', err?.message || err);
      return res.status(500).json({ error: err?.message || 'Failed to generate portrait' });
    }
  });

  // API endpoint for dynamic character origin backstory generation
  app.post('/api/generate-backstory', async (req, res) => {
    try {
      const { name, characterClass, race, title, alignment, equipment } = req.body;

      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(400).json({
          error: 'GEMINI_API_KEY missing from environment.',
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const prompt = `Write a compelling, atmospheric fantasy origin backstory for ${name}, a ${race} ${characterClass} with the title "${title}" and alignment "${alignment}". Starting gear: ${Array.isArray(equipment) ? equipment.join(', ') : 'standard equipment'}. CRITICAL REQUIREMENT: The backstory MUST be strictly one or two sentences long. Do not wrap in quotes or add headers. Focus on their mysterious past, tragic oath, or sudden awakening.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const backstoryText = response.text?.trim().replace(/^["']|["']$/g, '');

      if (backstoryText) {
        return res.json({ backstory: backstoryText });
      } else {
        return res.status(500).json({ error: 'No backstory text generated in response.' });
      }
    } catch (err: any) {
      console.error('Error generating backstory via Gemini:', err?.message || err);
      return res.status(500).json({ error: err?.message || 'Failed to generate backstory' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
