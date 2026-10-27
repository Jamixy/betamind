import { cn } from "@/lib/utils";

interface BadgeProps {
  children:   React.ReactNode;
  variant?:   "default" | "success" | "warning" | "error" | "outline";
  size?:      "sm" | "md";
  className?: string;
}

/**
 * Small inline badge / label component.
 */
export function Badge({
  children,
  variant  = "default",
  size     = "md",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-semibold rounded-full",
        size === "sm" ? "px-2 py-0.5 text-[10.5px]" : "px-2.5 py-1 text-xs",
        variant === "default" && "bg-[#FA5A02]/10 text-[#FA5A02] border border-[#FA5A02]/20",
        variant === "success" && "bg-[#14B8A6]/10 text-[#0F766E] dark:text-[#2DD4BF] border border-[#14B8A6]/20",
        variant === "warning" && "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20",
        variant === "error"   && "bg-red-500/10   text-red-700   dark:text-red-400   border border-red-500/20",
        variant === "outline" && "bg-transparent text-[var(--muted-foreground)] border border-[var(--border)]",
        className
      )}
    >
      {children}
    </span>
  );
}
