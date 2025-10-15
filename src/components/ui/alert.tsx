import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@core/lib/utils"

const alertVariants = cva(
    "relative w-full rounded-lg px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
    {
        variants: {
            variant: {
                default: "bg-card text-card-foreground",
                destructive: "border-red-200 bg-red-50 text-destructive [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
                softDestructive: "text-destructive [&>svg]:text-destructive [&_[data-slot=alert-description]]:text-destructive [&_[data-slot=alert-description]_input]:text-foreground",
                warning: "border-yellow-200 bg-yellow-50 text-yellow-500 [&>svg]:text-current *:data-[slot=alert-description]:text-yellow-500",
                softWarning: "[&>svg]:text-yellow-500 [&_[data-slot=alert-description]]:text-yellow-500 [&_[data-slot=alert-description]_input]:text-foreground",
                success: "border-indigo-200 text-indigo-500 [&>svg]:text-current [&_[data-slot=alert-title]_p]:text-indigo-400",
                softSuccess: "[&>svg]:text-indigo-500 [&_[data-slot=alert-description]_input]:text-foreground",
                disabled: "border-gray-200 bg-gray-50 text-gray-500 [&>svg]:text-current *:data-[slot=alert-description]:text-gray-500/90",
                softDisabled: "text-gray-500 [&>svg]:text-current *:data-[slot=alert-description]:text-gray-500/90"
            },
            bordered: {
                true:  "border",
                false: "border-0",
            },
        },
        defaultVariants: {
            variant:  "default",
            bordered: true,
        },
    }
)

function Alert({
                   className,
                   variant,
                   bordered,
                   ...props
               }: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
    return (
        <div
            data-slot="alert"
            role="alert"
            className={cn(
                alertVariants({ variant, bordered }),
                className
            )}
            {...props}
        />
    )
}


function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="alert-title"
            className={cn(
                "col-start-2 min-h-4 font-medium tracking-tight",
                className
            )}
            {...props}
        />
    )
}

function AlertDescription({
                              className,
                              ...props
                          }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="alert-description"
            className={cn(
                "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
                className
            )}
            {...props}
        />
    )
}

export { Alert, AlertTitle, AlertDescription }
