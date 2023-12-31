import React from "react"
import { Portfolio, Portfolios, PortfolioTag, PortfolioTags, PortfolioWithContent } from "@/lib/23summer/portfolio"
import { BaseProcessor, GlobalMarkdownComponents, GlobalRehypeReactOptions } from "@/lib/23summer/MarkdownParser"
import rehypeReact from "rehype-react"
import {
  AsidePreviewRoot,
  DocumentDescription,
  DocumentDivider,
  DocumentImage,
  DocumentRoot,
  DocumentTitle,
  PortfolioContent,
  PortfolioTagRoot,
  PortfolioTagsRow
} from "@/app/footprints/_styled"
import Link from "next/link"


export const Document: React.FC<{ identifier: string }> = async props => {

  const { identifier } = props
  const portfolio = Portfolios.retrieve<PortfolioWithContent>(identifier, true)

  const {
    data: {
      name,
      description,
      tags,
      image
    },
    content
  } = portfolio

  const { result: children } = await BaseProcessor()
    .use(rehypeReact, {
      ...GlobalRehypeReactOptions,
      components: GlobalMarkdownComponents
    })
    .process(content)

  const mappedTags = tags.map(it => PortfolioTags[it])

  return (
    <>
      <DocumentRoot>
        <DocumentTitle id={identifier}>{name}</DocumentTitle>
        <DocumentDescription>{description}</DocumentDescription>
        <PortfolioTagsRow>
          {mappedTags.map((it, index) => <PortfolioTagView key={index} tag={it}/>)}
        </PortfolioTagsRow>
        {image && <DocumentImage src={(await import(`$/__portfolio__/${image}`)).default} alt={name}/>}
        <PortfolioContent>
          {children}
        </PortfolioContent>
      </DocumentRoot>
      <DocumentDivider/>
    </>
  )
}

export const PortfolioTagView: React.FC<{ tag: PortfolioTag, small?: boolean }> = props =>
    <PortfolioTagRoot $color={props.tag.color} $small={props.small}>{props.tag.name}</PortfolioTagRoot>

export const AsidePreview: React.FC<{ identifier: string }> = props => {

  const { identifier } = props
  const portfolio = Portfolios.retrieve<Portfolio>(identifier)

  const {
    name,
    tags
  } = portfolio.data

  const mappedTags = tags.map(it => PortfolioTags[it])

  return (
    <AsidePreviewRoot>
      <Link href={`#${identifier}`}>{name}</Link>
      <PortfolioTagsRow>
        {mappedTags.map((it, index) => <PortfolioTagView key={index} tag={it} small/>)}
      </PortfolioTagsRow>
    </AsidePreviewRoot>
  )
}
