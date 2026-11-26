import sharp from "sharp";
import fs from "fs";
import path from "path";

const dir = "public/images";

for (const file of fs.readdirSync(dir)) {
  const ext = path.extname(file).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;

  const full = path.join(dir, file);
  const input = fs.readFileSync(full);

  let img = sharp(input).resize({ width: 1000, withoutEnlargement: true });
  img =
    ext === ".png"
      ? img.png({ quality: 80, compressionLevel: 9 })
      : img.jpeg({ quality: 75, mozjpeg: true });

  const output = await img.toBuffer();
  if (output.length < input.length) fs.writeFileSync(full, output);

  console.log(
    file,
    Math.round(input.length / 1024) + "KB ->",
    Math.round(Math.min(output.length, input.length) / 1024) + "KB"
  );
}