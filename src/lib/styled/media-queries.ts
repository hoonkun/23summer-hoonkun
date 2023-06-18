export const WhenWidthIn = (min: number, max: number) => `@media only screen and (max-width: ${max}px) and (min-width: ${min}px)`

export const WhenWidthLeast = (min: number) => `@media only screen and (min-width: ${min}px)`

export const WhenWidthMost = (max: number) => `@media only screen and (max-width: ${max}px)`
