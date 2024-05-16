import { promises as fs } from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const gestaltBuildDirectory = path.join(process.cwd(), '..', 'packages', 'gestalt', 'dist');
  const [css, js] = await Promise.all([
    fs.readFile(path.join(gestaltBuildDirectory, 'gestalt.css'), 'utf8'),
    fs.readFile(path.join(gestaltBuildDirectory, 'gestalt.js'), 'utf8'),
  ]);

  res.status(200).json({ css, js });
}
