export function createRefreshCoordinator<T>(refreshFn: () => Promise<T>) {
  let inFlight: Promise<T> | null = null;

  return async function refreshSingleFlight() {
    if (!inFlight) {
      inFlight = refreshFn().finally(() => {
        inFlight = null;
      });
    }
    return inFlight;
  };
}