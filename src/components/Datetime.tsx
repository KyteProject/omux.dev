import { LOCALE } from "@config"

export interface Props {
  datetime: string | Date
  readingTime?: string
  size?: "sm" | "lg"
  className?: string
}

export default function Datetime({
  datetime,
  readingTime,
  size = "sm",
  className
}: Props) {
  return (
    <div className={`flex items-center space-x-2 opacity-80 ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${
          size === "sm" ? "scale-90" : "scale-100"
        } inline-block h-6 w-6 fill-skin-base`}
        aria-hidden="true"
      >
        <path d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z"></path>
        <path d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z"></path>
      </svg>
      <span className="sr-only">Posted on:</span>
      <span className={`italic ${size === "sm" ? "text-sm" : "text-base"}`}>
        <FormattedDatetime datetime={datetime} />
      </span>
      {readingTime && (
        <>
          <span aria-hidden="true"> | </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`${
              size === "sm" ? "scale-90" : "scale-100"
            } inline-block h-6 w-6 fill-skin-base`}
            aria-hidden="true"
          >
            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
            <path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z"></path>
          </svg>
          <span className={`italic ${size === "sm" ? "text-sm" : "text-base"}`}>
            {readingTime}
          </span>
        </>
      )}
    </div>
  )
}

const FormattedDatetime = ({ datetime }: { datetime: string | Date }) => {
  const myDatetime = new Date(datetime)

  const date = myDatetime.toLocaleDateString(LOCALE, {
    year: "numeric",
    month: "long",
    day: "numeric"
  })

  const time = myDatetime.toLocaleTimeString(LOCALE, {
    hour: "2-digit",
    minute: "2-digit"
  })

  return (
    <>
      {date}
      <span aria-hidden="true"> @ </span>
      <span className="sr-only">&nbsp;at&nbsp;</span>
      {time}
    </>
  )
}
