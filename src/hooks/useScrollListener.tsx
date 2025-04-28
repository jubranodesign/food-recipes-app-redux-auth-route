import { useEffect } from "react";

/**
 * useScrollListener expects a stable (memoized with useCallback) scroll handler.
 */
function useScrollListener(handleScroll: () => void) {
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);
}

export default useScrollListener;