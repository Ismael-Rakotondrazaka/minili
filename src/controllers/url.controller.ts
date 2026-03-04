import { Request, Response } from 'express'
import { createShortUrl, getOriginalUrl, incrementClicks } from '../services/url.service'

export async function shortenUrl(req: Request, res: Response): Promise<void> {
  const { url } = req.body

  if (!url) {
    res.status(400).json({ error: 'url is required' })
    return
  }

  try {
    new URL(url)
  } catch {
    res.status(400).json({ error: 'invalid url' })
    return
  }

  try {
    const result = await createShortUrl(url)
    res.status(201).json(result)
  } catch {
    res.status(500).json({ error: 'internal server error' })
  }
}

export async function redirectUrl(req: Request, res: Response): Promise<void> {
  const { code } = req.params

  try {
    const originalUrl = await getOriginalUrl(code)
    if (!originalUrl) {
      res.status(404).json({ error: 'link not found' })
      return
    }

    res.redirect(originalUrl)
    incrementClicks(code).catch(console.error)
  } catch {
    res.status(500).json({ error: 'internal server error' })
  }
}
