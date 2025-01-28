import "./lib/ktn"

import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  if (Excluded.every(it => !it.test(request.nextUrl.pathname))) {
    console.log(`[${new Date().simpleFormat()}] [D] [${(request.ip ?? request.headers.get("x-forwarded-for"))?.padEnd(15, ' ') ?? "  unknown  ip  "}] ${request.method} ${request.nextUrl.pathname}`)
  }
  return NextResponse.next()
}

const Excluded = [
  /^\/_next\/.+/,
  /\.(js|png|jpg|css|ico|woff|ttf|woff2)$/,
]
