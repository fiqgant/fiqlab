import { useCallback, useRef, useState } from "react";

export function useTerminalHistory() {
  const [history, setHistory] = useState<string[]>([]);
  const cursor = useRef<number>(-1);

  const push = useCallback((cmd: string) => {
    if (!cmd.trim()) return;
    setHistory((prev) => {
      const deduped = prev.filter((c) => c !== cmd);
      return [...deduped, cmd];
    });
    cursor.current = -1;
  }, []);

  const navigate = useCallback(
    (direction: "up" | "down", current: string): string => {
      setHistory((prev) => {
        if (prev.length === 0) return prev;

        if (direction === "up") {
          cursor.current =
            cursor.current < prev.length - 1 ? cursor.current + 1 : prev.length - 1;
        } else {
          cursor.current = cursor.current > 0 ? cursor.current - 1 : -1;
        }
        return prev;
      });

      return direction === "down" && cursor.current === -1
        ? ""
        : history[history.length - 1 - cursor.current] ?? current;
    },
    [history]
  );

  const reset = useCallback(() => {
    cursor.current = -1;
  }, []);

  return { push, navigate, reset };
}
