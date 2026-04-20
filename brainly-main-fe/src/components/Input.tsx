import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "../lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-xs font-medium uppercase tracking-wider text-surface-500 dark:text-surface-400 ml-0.5">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "flex w-full rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 px-3.5 py-2.5 text-sm transition-all duration-150",
            "text-surface-900 dark:text-surface-100 font-[family-name:var(--font-body)]",
            "placeholder:text-surface-400 dark:placeholder:text-surface-600",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40 focus-visible:border-amber-500",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-err-500 focus-visible:ring-err-500/30 focus-visible:border-err-500",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-xs text-err-500 mt-0.5 ml-0.5 font-medium">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";