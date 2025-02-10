import { useEffect, useState } from "react";

function getDevice(): "mobile" | "tablet" | "desktop" | null {
  if (typeof window === "undefined") return null;

  return window.matchMedia("(min-width: 1024px)").matches
    ? "desktop"
    : window.matchMedia("(min-width: 640px)").matches
      ? "tablet"
      : "mobile";
}

export function useMediaQuery() {
  const [device, setDevice] = useState<"mobile" | "tablet" | "desktop" | null>(
    getDevice(),
  );

  useEffect(() => {
    const checkDevice = () => {
      setDevice(getDevice());
    };

    // Initial detection
    checkDevice();

    // Listener for windows resize
    window.addEventListener("resize", checkDevice);

    // Cleanup listener
    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, []);

  return {
    device,
    isMobile: device === "mobile",
  };
}
