import { nanoid } from 'nanoid'
import { Url } from '../models/Url'
import { redis } from '../config/redis'

const CACHE_TTL = 3600 // 1 hour

function generateCode(): string {
  return nanoid(6)
}

export async function createShortUrl(originalUrl: string) {
  const baseUrl = process.env.APP_URL ?? 'http://localhost:3000'

  // If the URL is already one of our short links, return it as-is
  const selfPattern = new RegExp(`^${baseUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/([A-Za-z0-9_-]{6})$`)
  const selfMatch = originalUrl.match(selfPattern)
  if (selfMatch) {
    const existingByCode = await Url.findOne({ code: selfMatch[1] })
    if (existingByCode) {
      return {
        code: existingByCode.code,
        short: `${baseUrl}/${existingByCode.code}`,
        originalUrl: existingByCode.originalUrl,
      }
    }
  }

  const existing = await Url.findOne({ originalUrl })
  if (existing) {
    return {
      code: existing.code,
      short: `${baseUrl}/${existing.code}`,
      originalUrl: existing.originalUrl,
    }
  }

  const code = generateCode()
  const doc = await Url.create({ code, originalUrl })

  return {
    code: doc.code,
    short: `${baseUrl}/${doc.code}`,
    originalUrl: doc.originalUrl,
  }
}

export async function getOriginalUrl(code: string): Promise<string | null> {
  const cacheKey = `url:${code}`
  const cached = await redis.get(cacheKey)
  if (cached) {
    console.log(`[CACHE HIT] ${cacheKey}`)
    return cached
  }

  console.log(`[CACHE MISS] ${cacheKey}`)

  const doc = await Url.findOne({ code })
  if (!doc) return null

  await redis.set(cacheKey, doc.originalUrl, { EX: CACHE_TTL })
  console.log(`[CACHE STORE] ${cacheKey}`)
  return doc.originalUrl
}

export async function incrementClicks(code: string): Promise<void> {
  await Url.updateOne({ code }, { $inc: { clicks: 1 } })
}
