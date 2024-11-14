import { NextApiRequest, NextApiResponse } from 'next/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug, token } = req.query;

  // to-do: replace with a more secure token
  if (token !== 'hello') {
    res.status(401).json({ message: 'Invalid Viewer Token' });
    return;
  }

  if (!slug) {
    res.status(400).json({ message: 'Missing params', arguments: req.query });
    return;
  }

  res.setPreviewData({
    maxAge: 1 * 60, // The preview mode cookies expires in 1 minute
  });
  res.writeHead(307, {
    Location: `/${slug}?time=${Date.now()}`,
  });
  res.end('preview mode');
}
