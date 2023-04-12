import { useEffect, useState, useRef } from "react";

const OPTION = {
  threshold: 1,
};

const useInfiniteScroll = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver;
    if (targetRef.current) {
      observer = new IntersectionObserver((entries) => {
        const target = entries[0];
        if (target.isIntersecting && !isLoading) {
          setCursor((prev) => prev + 10);
        }
      }, OPTION);
      observer.observe(targetRef.current);
    }
    return () => observer.disconnect();
  }, [targetRef]);

  return { targetRef, cursor, isLoading, setCursor, setIsLoading };
};

export default useInfiniteScroll;
