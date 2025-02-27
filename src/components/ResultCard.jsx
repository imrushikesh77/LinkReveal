"use client"

import { useState } from "react"
import { AlertTriangle, ExternalLink } from "lucide-react"

function ResultCard({ type, result, screenshotUrl, message }) {
  const [imageError, setImageError] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(!!screenshotUrl)

  if (type === "error") {
    return (
      <div className="terminal-window border-red-500 p-4 sm:p-6 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertTriangle className="text-red-500 flex-shrink-0 h-5 w-5 sm:h-6 sm:w-6 mt-0.5" />
          <div>
            <p className="text-red-500 font-bold text-sm sm:text-base mb-2">SECURITY_BREACH_DETECTED</p>
            <p className="text-red-400 text-sm sm:text-base">{message}</p>
            <div className="mt-3 p-3 bg-gray-900 rounded border border-red-800">
              <p className="text-red-300 text-xs sm:text-sm">[SYSTEM]: Try a different URL or verify its integrity.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="terminal-window p-4 sm:p-6 rounded-lg">
      <h2 className="text-green-500 font-bold text-sm sm:text-base mb-3 tracking-wider">TRACE_COMPLETE</h2>
      <p className="text-green-400 text-sm sm:text-base break-all mb-4">
        Target URL:{" "}
        <a
          href={result || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 underline hover:text-green-300 transition-colors"
        >
          {result}
          <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
        </a>
      </p>

      {screenshotUrl && (
        <div className="border border-green-800 rounded-lg overflow-hidden bg-gray-900">
          <div className="relative aspect-video w-full">
            {isImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center text-green-400 text-sm bg-gray-900">
                Loading screenshot...
              </div>
            )}

            {!imageError ? (
              <img
                src={screenshotUrl || "/placeholder.svg"}
                alt="Target site screenshot"
                className={`w-full h-full object-cover transition-opacity duration-300 ${isImageLoading ? "opacity-0" : "opacity-100"}`}
                onLoad={() => setIsImageLoading(false)}
                onError={() => {
                  setImageError(true)
                  setIsImageLoading(false)
                }}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-red-400 text-sm bg-gray-900">
                Screenshot unavailable
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ResultCard

