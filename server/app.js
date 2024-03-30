import express from "express";
import multer from "multer";
import fs from "fs";
import { PDFDocument } from "pdf-lib";
import cors from "cors";

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      if (file.mimetype !== 'application/pdf') {
        return cb(new Error('Only PDF files are allowed'));
      }
      cb(null, true);
    }
  }).single('pdfFile');

app.post('/api/upload', upload, async (req, res) => {
  try {
    const uploadedFile = req.file;
    console.log('File uploaded:', uploadedFile);
    res.status(200).send('File uploaded successfully');
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('Only PDF files are allowed');
  }
});

app.post('/api/extract-pages', async (req, res) => {
  try {
    const { pdfPath, selectedPages } = req.body;
    const pdfBytes = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    
    
    res.status(200).send('New PDF created successfully');
  } catch (error) {
    console.error('Error extracting pages:', error);
    res.status(500).send('Error extracting pages');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

