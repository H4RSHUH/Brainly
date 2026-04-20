import type { ReactElement } from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { cn } from "../lib/utils";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "variant" | "startIcon"> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  text: string;
  startIcon?: ReactElement;
  loading?: boolean;
}

const variantStyles = {
  primary:
    "bg-amber-500 text-surface-950 hover:bg-amber-400 border border-amber-400/20 shadow-sm shadow-amber-500/20 font-semibold",
  secondary:
    "bg-surface-200 text-surface-800 hover:bg-surface-300 dark:bg-surface-800 dark:text-surface-200 dark:hover:bg-surface-700 border border-transparent",
  outline:
    "bg-transparent text-surface-700 dark:text-surface-300 border border-surface-300 dark:border-surface-700 hover:bg-surface-100 dark:hover:bg-surface-800",
  ghost:
    "bg-transparent text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-850 border border-transparent",
  danger:
    "bg-err-500/10 text-err-500 hover:bg-err-500/20 dark:bg-err-500/15 dark:text-err-400 border border-transparent",
};

export function Button({
  variant = "primary",
  text,
  startIcon,
  loading = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium tracking-tight transition-all duration-150 focus-ring",
        "disabled:opacity-40 disabled:pointer-events-none cursor-pointer",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {loading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : startIcon ? (
        <span className="mr-2 flex items-center justify-center [&>svg]:w-4 [&>svg]:h-4">
          {startIcon}
        </span>
      ) : null}
      {text}
    </motion.button>
  );
}