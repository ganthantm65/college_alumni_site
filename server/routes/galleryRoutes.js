import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";

const galleryRouter = express.Router();


const galleryBase = path.resolve("uploads/gallery");

const metaPath = (slug) =>
  path.join(galleryBase, slug, "meta.json");

const readMeta = (slug) => {
  if (!fs.existsSync(metaPath(slug))) return null;
  return JSON.parse(fs.readFileSync(metaPath(slug), "utf-8"));
};

const writeMeta = (slug, meta) => {
  fs.writeFileSync(metaPath(slug), JSON.stringify(meta, null, 2));
};


const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, galleryBase),
  filename: (_, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });


galleryRouter.get("/", (req, res) => {
  if (!fs.existsSync(galleryBase)) return res.json([]);

  const albums = [];

  fs.readdirSync(galleryBase, { withFileTypes: true }).forEach((dir) => {
    if (!dir.isDirectory()) return;

    const slug = dir.name;
    const albumDir = path.join(galleryBase, slug);

    const images = fs
      .readdirSync(albumDir)
      .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
      .map((f) => `/uploads/gallery/${slug}/${f}`);

    if (!images.length) return;

    const meta = readMeta(slug) || {
      title: slug.replace(/-/g, " "),
      description: ""
    };

    albums.push({
      id: slug,
      slug,
      title: meta.title,
      description: meta.description,
      coverImage: images[0],
      images
    });
  });

  res.json(albums);
});


galleryRouter.post("/upload-album", upload.array("images", 20), (req, res) => {
  const { title, description = "" } = req.body;
  if (!title || !req.files.length)
    return res.status(400).json({ message: "Invalid request" });

  const slug = title.toLowerCase().replace(/\s+/g, "-");
  const albumDir = path.join(galleryBase, slug);

  if (!fs.existsSync(albumDir))
    fs.mkdirSync(albumDir, { recursive: true });

  writeMeta(slug, { title, description });

  req.files.forEach((file) => {
    fs.renameSync(file.path, path.join(albumDir, file.filename));
  });

  res.json({ message: "Album created", slug });
});


galleryRouter.post("/add-images", upload.array("images", 20), (req, res) => {
  const { slug } = req.body;
  if (!slug || !req.files.length)
    return res.status(400).json({ message: "Invalid request" });

  const albumDir = path.join(galleryBase, slug);
  if (!fs.existsSync(albumDir))
    return res.status(404).json({ message: "Album not found" });

  req.files.forEach((file) => {
    fs.renameSync(file.path, path.join(albumDir, file.filename));
  });

  res.json({ message: "Images added" });
});


galleryRouter.put("/update-description", (req, res) => {
  const { slug, description } = req.body;
  const meta = readMeta(slug);
  if (!meta) return res.status(404).json({ message: "Album not found" });

  meta.description = description || "";
  writeMeta(slug, meta);

  res.json({ message: "Description updated" });
});


galleryRouter.put("/rename-album", (req, res) => {
  const { oldSlug, newTitle } = req.body;
  if (!oldSlug || !newTitle)
    return res.status(400).json({ message: "Invalid request" });

  const newSlug = newTitle.toLowerCase().replace(/\s+/g, "-");

  fs.renameSync(
    path.join(galleryBase, oldSlug),
    path.join(galleryBase, newSlug)
  );

  const meta = readMeta(newSlug);
  meta.title = newTitle;
  writeMeta(newSlug, meta);

  res.json({ message: "Album renamed" });
});

galleryRouter.delete("/delete-image", (req, res) => {
  const { imagePath } = req.body;
  const fullPath = path.resolve("." + imagePath);

  fs.unlinkSync(fullPath);

  const albumDir = path.dirname(fullPath);
  const remaining = fs.readdirSync(albumDir)
    .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

  if (!remaining.length) {
    fs.rmSync(albumDir, { recursive: true, force: true });
  }

  res.json({ message: "Image deleted" });
});


galleryRouter.delete("/delete-album", (req, res) => {
  const { slug } = req.body;

  if (!slug) {
    return res.status(400).json({ message: "Album slug required" });
  }

  const albumDir = path.join(galleryBase, slug);

  if (!albumDir.startsWith(galleryBase)) {
    return res.status(403).json({ message: "Invalid album path" });
  }

  if (!fs.existsSync(albumDir)) {
    return res.status(404).json({ message: "Album not found" });
  }

  fs.rmSync(albumDir, { recursive: true, force: true });

  res.json({ message: "Album deleted successfully" });
});

export default galleryRouter;