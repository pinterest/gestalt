import { NextApiRequest, NextApiResponse } from 'next/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug, time, documentId, token } = req.query;

  if (token !== process.env.NEXT_PUBLIC_SANITY_PREVIEW_SECRET) {
    res.status(401).json({ message: 'Invalid Request' });
    return;
  }

  if (!slug || !time || !documentId) {
    res.status(400).json({ message: 'Missing params', arguments: req.query });
    return;
  }

  res.setPreviewData({
    maxAge: 1 * 60, // The preview mode cookies expires in 1 minute
  });
  res.writeHead(307, {
    Location: `/${slug}/${documentId}?time=${time}`,
  });
  res.end('preview mode');
}
