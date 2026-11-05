import type { Job } from "./data"

/** Must match WIDTHS in scripts/images.mjs. */
const WIDTHS = [480, 800, 1050]
const set = (id: string, ext: string) => WIDTHS.map((w) => `/photos/${id}-${w}.${ext} ${w}w`).join(", ")

type Props = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "sizes" | "width" | "height"> & {
  job: Job
  sizes: string
  /** Above the fold: load now, at high priority. Everything else is lazy. */
  eager?: boolean
}

/** AVIF, then WebP, then JPEG, in three phone-friendly widths. The browser picks the smallest that fits. */
export function Photo({ job, sizes, eager = false, alt = "", ...rest }: Props) {
  return (
    <picture>
      <source type="image/avif" srcSet={set(job.id, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={set(job.id, "webp")} sizes={sizes} />
      <img
        {...rest}
        src={`/photos/${job.id}-800.jpg`}
        srcSet={set(job.id, "jpg")}
        sizes={sizes}
        width={job.w}
        height={job.h}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        {...(eager ? { fetchPriority: "high" as const } : {})}
      />
    </picture>
  )
}
