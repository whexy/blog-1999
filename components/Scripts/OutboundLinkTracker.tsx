"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/**
 * Reports clicks on links that leave the site, including middle
 * clicks (new tab). Listens in the capture phase so handlers that
 * stop propagation can't hide a click.
 */
export default function OutboundLinkTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button > 1 || !(e.target instanceof Element)) return;
      const a = e.target.closest("a[href]");
      if (!(a instanceof HTMLAnchorElement)) return;
      const url = new URL(a.href);
      if (!url.protocol.startsWith("http")) return;
      if (url.host === location.host) return;
      track(
        a.relList.contains("me") ? "profile-click" : "outbound-click",
        { url: a.href, domain: url.hostname },
      );
    };
    document.addEventListener("click", onClick, true);
    document.addEventListener("auxclick", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("auxclick", onClick, true);
    };
  }, []);

  return null;
}
