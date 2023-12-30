import React, { PropsWithChildren } from "react"
import Link from "next/link"
import { NewPageLinkIndicator } from "@/components/NewPageLinkIndicator"

type ExternalLinkProps = PropsWithChildren<{ href: string, className?: string }>

export const ExternalLink: React.FC<ExternalLinkProps> = props =>
  <Link href={props.href} className={props.className}><NewPageLinkIndicator/>{props.children}</Link>
