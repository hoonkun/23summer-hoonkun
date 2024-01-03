'use client'

import React, { useCallback, useEffect, useRef } from "react"

const Rules: ((...args: any[]) => boolean)[] = [
  args => args[0]?.message?.includes?.("404 (Not Found)"),
  args => args[0]?.host === "https://comments.hoonkun.kiwi",
  args => args[0]?.startsWith?.("[giscus]")
]

export const LogFilter: React.FC = () => {

  const _log = useRef(console.log)
  const _error = useRef(console.error)
  const _warn = useRef(console.warn)
  const _debug = useRef(console.debug)

  const filterer = useCallback((original: (...args: any[]) => void, ...args: any[]) => {
    if (Rules.some(it => it(args))) return
    return original(...args)
  }, [])

  const log = useCallback((...args: any[]) => filterer(_log.current, ...args), [filterer])
  const error = useCallback((...args: any[]) => filterer(_error.current, ...args), [filterer])
  const warn = useCallback((...args: any[]) => filterer(_warn.current, ...args), [filterer])
  const debug = useCallback((...args: any[]) => filterer(_debug.current, ...args), [filterer])

  useEffect(() => {
    console.log = log
    console.error = error
    console.warn = warn
    console.debug = debug

    const currentLog = _log.current
    const currentError = _error.current
    const currentWarn = _warn.current
    const currentDebug = _debug.current

    return () => {
      console.log = currentLog
      console.error = currentError
      console.warn = currentWarn
      console.debug = currentDebug
    }
  }, [log, error, warn, debug])

  return <></>
}
