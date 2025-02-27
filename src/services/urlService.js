import axios from "axios";

export const unshortenUrl = async (shortUrl) => {
  try {
    // console.log("Attempting to unshorten URL:", shortUrl);

    // First attempt: unshorten.me API (most reliable in your case)
    try {
      const unshortenItResponse = await axios.get(
        `https://unshorten.me/json/${encodeURIComponent(shortUrl)}`
      );

      if (unshortenItResponse.data?.resolved_url) {
        const resolvedUrl = unshortenItResponse.data.resolved_url;
        if (resolvedUrl !== shortUrl) {
          // console.log("Successfully unshortened via unshorten.me API:", resolvedUrl);
          return { success: true, longUrl: resolvedUrl, shortUrl };
        }
      }
    } catch (unshortenItError) {
      console.log("unshorten.me API failed:", unshortenItError.message || "Unknown error");
    }

    // Fallback: Try a different CORS proxy (cors-anywhere as an alternative)
    const corsProxyUrl = "https://cors-anywhere.herokuapp.com/";
    try {
      const getResponse = await axios({
        method: "get",
        url: `${corsProxyUrl}${encodeURIComponent(shortUrl)}`,
        maxRedirects: 15,
        timeout: 10000,
      });

      if (getResponse.request?.res?.responseUrl) {
        const finalUrl = getResponse.request.res.responseUrl.replace(corsProxyUrl, "");
        const decodedFinalUrl = decodeURIComponent(finalUrl);
        if (decodedFinalUrl !== shortUrl) {
          console.log("Successfully unshortened via GET request:", decodedFinalUrl);
          return { success: true, longUrl: decodedFinalUrl, shortUrl };
        }
      }
    } catch (getError) {
      console.log("GET request failed:", getError.message || "Unknown error");
    }

    return {
      success: false,
      error: "This URL could not be expanded. It may not be a shortened URL or the service is unavailable.",
      shortUrl,
    };
  } catch (error) {
    const errorMessage = error?.message || "Unknown error occurred";
    console.error("Error unshortening URL:", errorMessage);
    return {
      success: false,
      error: "Failed to unshorten URL. Please check if the URL is valid and try again.",
      shortUrl,
    };
  }
};

export const getScreenshot = async (url) => {
  const apiKey = import.meta.env.VITE_API_KEY; // Replace with your key from screenshotlayer
  const screenshotUrl = `https://api.screenshotlayer.com/api/capture?access_key=${apiKey}&url=${encodeURIComponent(
    url
  )}&width=800&height=600`;

  try {
    // No need for axios since it returns a direct image URL
    return screenshotUrl; // Directly usable in <img src>
  } catch (error) {
    console.error("Screenshot fetch failed:", error.message);
    return null; // Handle in ResultCard
  }
};