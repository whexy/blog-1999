import Parser from "rss-parser";

/**
 * RSS Feed Item interface representing a single feed entry
 */
export interface RSSFeedItem {
  title?: string;
  link?: string;
  pubDate?: string;
  creator?: string;
  content?: string;
  contentSnippet?: string;
  guid?: string;
  categories?: string[];
  isoDate?: string;
}

/**
 * RSS Feed interface representing the entire feed structure
 */
export interface RSSFeed {
  items: RSSFeedItem[];
  title?: string;
  description?: string;
  link?: string;
  feedUrl?: string;
  language?: string;
  lastBuildDate?: string;
}

/**
 * Configuration options for RSS fetching
 */
export interface RSSFetchOptions {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  revalidate?: number;
}

/**
 * Custom error classes for better error handling
 */
export class RSSError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly originalError?: Error,
  ) {
    super(message);
    this.name = "RSSError";
  }
}

export class RSSNetworkError extends RSSError {
  constructor(message: string, originalError?: Error) {
    super(message, "NETWORK_ERROR", originalError);
    this.name = "RSSNetworkError";
  }
}

export class RSSParseError extends RSSError {
  constructor(message: string, originalError?: Error) {
    super(message, "PARSE_ERROR", originalError);
    this.name = "RSSParseError";
  }
}

export class RSSValidationError extends RSSError {
  constructor(message: string) {
    super(message, "VALIDATION_ERROR");
    this.name = "RSSValidationError";
  }
}

/**
 * Default configuration for RSS fetching
 */
const DEFAULT_OPTIONS: Required<RSSFetchOptions> = {
  timeout: 10000,
  retries: 3,
  retryDelay: 1000,
  revalidate: 600,
};

/**
 * Sleep utility for retry delays
 */
const sleep = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * Validates and normalizes a feed URL
 * @param feedUrl - The URL to validate
 * @returns Normalized URL
 * @throws {RSSValidationError} If URL is invalid
 */
const validateUrl = (feedUrl: unknown): string => {
  if (typeof feedUrl !== "string" || !feedUrl.trim()) {
    throw new RSSValidationError(
      "Feed URL must be a non-empty string",
    );
  }

  const trimmedUrl = feedUrl.trim();

  try {
    const url = new URL(trimmedUrl);
    if (!["http:", "https:"].includes(url.protocol)) {
      throw new RSSValidationError(
        "Feed URL must use HTTP or HTTPS protocol",
      );
    }
    return url.toString();
  } catch (error) {
    throw new RSSValidationError(`Invalid URL format: ${trimmedUrl}`);
  }
};

/**
 * Fetches XML content from a feed URL with timeout and retry logic
 * @param feedUrl - The URL to fetch
 * @param options - Fetch options
 * @returns Promise resolving to XML string
 * @throws {RSSNetworkError} If network request fails after retries
 */
const fetchXML = async (
  feedUrl: string,
  options: Required<RSSFetchOptions>,
): Promise<string> => {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= options.retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(
        () => controller.abort(),
        options.timeout,
      );

      const response = await fetch(feedUrl, {
        signal: controller.signal,
        next: { revalidate: options.revalidate },
        headers: {
          "User-Agent": "RSS-Reader/1.0",
          Accept: "application/rss+xml, application/xml, text/xml",
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status}: ${response.statusText}`,
        );
      }

      const contentType = response.headers.get("content-type");
      if (contentType && !contentType.includes("xml")) {
        console.warn(`Unexpected content type: ${contentType}`);
      }

      return await response.text();
    } catch (error) {
      lastError = error as Error;

      if (attempt === options.retries) {
        break;
      }

      // Don't retry on client errors (4xx)
      if (
        error instanceof Error &&
        error.message.includes("HTTP 4")
      ) {
        break;
      }

      await sleep(options.retryDelay * attempt);
    }
  }

  throw new RSSNetworkError(
    `Failed to fetch RSS feed after ${options.retries} attempts: ${lastError?.message}`,
    lastError || undefined,
  );
};

/**
 * Parses XML content into RSS feed structure
 * @param xml - XML content to parse
 * @returns Promise resolving to parsed RSS feed
 * @throws {RSSParseError} If XML parsing fails
 */
const parseXML = async (xml: string): Promise<RSSFeed> => {
  if (!xml || xml.trim().length === 0) {
    throw new RSSParseError("Empty XML content");
  }

  try {
    const parser = new Parser({
      timeout: 5000,
      maxRedirects: 3,
    });

    const feed = await parser.parseString(xml);

    if (!feed || typeof feed !== "object") {
      throw new RSSParseError("Parsed feed is not a valid object");
    }

    return feed as RSSFeed;
  } catch (error) {
    throw new RSSParseError(
      `Failed to parse RSS XML: ${error instanceof Error ? error.message : "Unknown error"}`,
      error as Error,
    );
  }
};

/**
 * Validates RSS feed structure
 * @param feed - RSS feed to validate
 * @throws {RSSValidationError} If feed structure is invalid
 */
const validateFeed = (feed: RSSFeed): void => {
  if (!feed.items) {
    throw new RSSValidationError("Feed missing items array");
  }

  if (!Array.isArray(feed.items)) {
    throw new RSSValidationError("Feed items must be an array");
  }
};

/**
 * Safely sorts RSS feed items by publication date
 * @param items - RSS feed items to sort
 * @returns Sorted items array (newest first)
 */
const sortFeedItems = (items: RSSFeedItem[]): RSSFeedItem[] => {
  return items.sort((a, b) => {
    const dateA = a.isoDate || a.pubDate;
    const dateB = b.isoDate || b.pubDate;

    if (!dateA && !dateB) return 0;
    if (!dateA) return 1;
    if (!dateB) return -1;

    try {
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    } catch {
      return 0;
    }
  });
};

/**
 * Fetches and parses RSS feeds with comprehensive error handling
 * @param feedUrl - RSS feed URL to fetch
 * @param options - Optional configuration options
 * @returns Promise resolving to sorted RSS feed items
 * @throws {RSSValidationError|RSSNetworkError|RSSParseError} Various RSS-related errors
 *
 * @example
 * ```typescript
 * try {
 *   const items = await getFeeds('https://example.com/feed.xml');
 *   console.log(`Found ${items.length} feed items`);
 * } catch (error) {
 *   if (error instanceof RSSNetworkError) {
 *     console.error('Network issue:', error.message);
 *   } else if (error instanceof RSSParseError) {
 *     console.error('Parse issue:', error.message);
 *   }
 * }
 * ```
 */
export const getFeeds = async (
  feedUrl: unknown,
  options: RSSFetchOptions = {},
): Promise<RSSFeedItem[]> => {
  const validatedUrl = validateUrl(feedUrl);
  const config = { ...DEFAULT_OPTIONS, ...options };

  const xml = await fetchXML(validatedUrl, config);
  const feed = await parseXML(xml);
  validateFeed(feed);

  return sortFeedItems(feed.items);
};
