// Utility functions for performance optimization

// Throttle function to limit how often a function can be called
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number,
): (...args: Parameters<T>) => ReturnType<T> | undefined {
  let inThrottle: boolean = false;
  let lastResult: ReturnType<T>;

  return function (
    this: any,
    ...args: Parameters<T>
  ): ReturnType<T> | undefined {
    if (!inThrottle) {
      lastResult = func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
    return lastResult;
  };
}

// Debounce function to delay execution until after a period of inactivity
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate: boolean = false,
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (this: any, ...args: Parameters<T>): void {
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(this, args);
    };

    const callNow = immediate && !timeout;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) func.apply(this, args);
  };
}

// Measure execution time of a function
export function measureExecutionTime<T extends (...args: any[]) => any>(
  func: T,
  label: string = "Function execution time",
): (...args: Parameters<T>) => ReturnType<T> {
  return function (this: any, ...args: Parameters<T>): ReturnType<T> {
    const start = performance.now();
    const result = func.apply(this, args);
    const end = performance.now();
    console.log(`${label}: ${end - start}ms`);
    return result;
  };
}

// Batch multiple DOM updates to reduce reflows
export function batchDOMUpdates(updates: (() => void)[]): void {
  // Use requestAnimationFrame to batch updates
  requestAnimationFrame(() => {
    // Create a document fragment to batch DOM operations
    const fragment = document.createDocumentFragment();

    // Execute all updates
    updates.forEach((update) => update());
  });
}

// Lazy load images when they come into viewport
export function setupLazyLoading(selector: string = "img[data-src]"): void {
  if (!("IntersectionObserver" in window)) {
    // Fallback for browsers that don't support IntersectionObserver
    const images = document.querySelectorAll(selector);
    images.forEach((img) => {
      const element = img as HTMLImageElement;
      if (element.dataset.src) {
        element.src = element.dataset.src;
      }
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
          }
          observer.unobserve(img);
        }
      });
    },
    { rootMargin: "200px" },
  );

  const images = document.querySelectorAll(selector);
  images.forEach((img) => observer.observe(img));
}
