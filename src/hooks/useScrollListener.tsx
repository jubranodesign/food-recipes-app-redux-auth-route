import { useEffect } from "react";

function useScrollListener(handleScroll: () => void) {
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);
}

export default useScrollListener;