"use client"

import React, { useCallback, useEffect, useMemo, useState } from "react"
import Image from "next/image"
import styled from "styled-components"
import { PostSummary } from "@/lib/23summer/post"
import { Highlighted } from "@/components/Highlighter"
import Link from "next/link"
import { SlashKey } from "@/app/posts/list/_styled"
import EventEmitter from "events"
import { WhenWidthMost } from "@/lib/styled/media-queries"

const SearchEvents = new EventEmitter()

export const SearchBarActivator = () => <SearchBarActivatorContent onClick={() => SearchEvents.emit("activate")}>여기를 누르거나 키보드의 <SlashKey/> 를 눌러 검색</SearchBarActivatorContent>

type SearchBarProps = { summaries: PostSummary[] }
export const SearchBar: React.FC<SearchBarProps> = props => {
  const { summaries } = props

  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "/") {
        event.preventDefault()
        setEnabled(true)
      } else if (event.key === "Escape") {
        setEnabled(false)
      }
    }

    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  useEffect(() => {
    const handler = () => setEnabled(true)
    SearchEvents.on("activate", handler)
    return () => { SearchEvents.off("activate", handler) }
  }, [])

  if (!enabled) return <></>

  return <SearchBarContent summaries={summaries} requestClose={() => setEnabled(false)}/>
}

const TerminateEvent = (event: React.UIEvent) => {
  event.stopPropagation();
}

type PostFilter = "categories" | "title" | "summary" | "headers"

const Filters: PostFilter[] = ["categories", "title", "summary", "headers"]

const SearchBarContent: React.FC<{ summaries: PostSummary[], requestClose: () => void }> = props => {
  const { summaries, requestClose } = props

  const [value, setValue] = useState("")

  const [filters, setFilters] = useState<PostFilter[]>([])
  const [useRegex, setUseRegex] = useState(false)
  const [caseSensitive, setCaseSensitive] = useState(false)

  const suggestions = useMemo<[string, string, () => void][]>(() => [
    ["마인크래프트", "#6a993a", () => { setValue("마인크래프트|Minecraft"); setFilters([]); setUseRegex(true); setCaseSensitive(false) }],
    ["React", "#4287f5", () => { setValue("React"); setFilters([]); setUseRegex(false); setCaseSensitive(false) }],
    ["Kotlin", "#f57842", () => { setValue("Kotlin"); setFilters([]); setUseRegex(false); setCaseSensitive(false) }],
    ["생명과학 II", "#999999", () => { setValue("생명과학II"); setFilters(["categories"]) }]
  ], [])

  const results = useMemo(() => {
    const noFilters = filters.length === 0
    if (Filters.map(it => `where: ${it}`).some(it => it.startsWith(value)))
      return summaries
    if ("using: regex ".startsWith(value))
      return summaries
    if ("using: case-sensitive".startsWith(value))
      return summaries
    if ("using: Cc".startsWith(value))
      return summaries

    return summaries.filter(it => {
      const comparator = (compareWith: string): boolean => {
        if (useRegex) {
          try {
            return new RegExp(value, caseSensitive ? undefined : "i").test(compareWith)
          } catch {
            return false
          }
        }
        return compareWith
          .let(it => caseSensitive ? it : it.toLowerCase())
          .includes(value.let(it => caseSensitive ? it : it.toLowerCase()))
      }
      return (
        ((noFilters || filters.includes("categories")) && it.categories.some(category => comparator(category[0]))) ||
        ((noFilters || filters.includes("title")) && comparator(it.title)) ||
        ((noFilters || filters.includes("summary")) && comparator(it.excerpt)) ||
        ((noFilters || filters.includes("headers")) && it.headers.some(header => comparator(header)))
      )
    })
  }, [filters, summaries, value, useRegex, caseSensitive])
  const invalidRegex = useMemo(() => {
    if (!useRegex) return false
    try {
      new RegExp(value)
      return false
    } catch {
      return true
    }
  }, [useRegex, value])

  const handleNewValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.currentTarget.value
    const HasCommands = (it: string) => newValue.includes(` ${it}`) || newValue.startsWith(it)
    const addFilter = (filter: PostFilter) => setFilters(prevState => ([...prevState, filter] as const).distinct())
    const commands: [string, () => void][] = [
      ...Filters.map(it => [`where: ${it} `, () => addFilter(it)] as [string, () => void]),
      ["using: regex ", () => setUseRegex(true)],
      ["using: case-sensitive ", () => setCaseSensitive(true)],
      ["using: Cc ", () => setCaseSensitive(true)]
    ]
    commands.forEach(([it, callback]) => {
      if (it.let(HasCommands)) {
        newValue = newValue.replace(it, "")
        callback()
      }
    })
    setValue(newValue)
  }, [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Backspace") return
    if (e.currentTarget.value !== "") return

    if (caseSensitive) return setCaseSensitive(false)
    if (useRegex) return setUseRegex(false)

    setFilters(prevState => [...prevState.slice(0, -1)])
  }, [caseSensitive, useRegex])

  return (
    <OverlayContainer onClick={requestClose}>
      <SvhContainer>
        <BackButtonContainer><BackButton alt={""} src={require("@/resources/icons/back.svg")}/></BackButtonContainer>
        {useRegex && <SearchDescription>**정규식을 사용하면 검색 결과의 검색어 하이라이팅이 제대로 동작하지 않을 수 있습니다.</SearchDescription>}
        <InputContainer onClick={TerminateEvent}>
          <Suffix>in:</Suffix>
          <At $kor>&nbsp;키위새의 아무말 저장소&nbsp;</At>
          {!!filters.length &&
            <>
              <Suffix onClick={() => setFilters([])}>where:</Suffix>
              <At>
                {filters.map((it, index, array) =>
                  <React.Fragment key={it}>
                    <span onClick={() => setFilters(prevState => prevState.filter(pf => pf !== it))}>{it}</span>
                    {index !== array.length - 1 ? ", " : ""}
                  </React.Fragment>
                )}
              </At>
            </>
          }
          {(useRegex || caseSensitive) &&
            <>
              <Suffix onClick={() => setUseRegex(false)}>using:</Suffix>
              {useRegex && <At onClick={() => setUseRegex(false)} style={{ marginRight: caseSensitive ? 4 : undefined }}>.*</At>}
              {caseSensitive && <At onClick={() => setCaseSensitive(false)}>Cc</At>}
            </>
          }

          <InputWrapper>
            <Input
              value={value}
              onChange={handleNewValue}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          </InputWrapper>
        </InputContainer>
        <ResultsContainer onClick={TerminateEvent}>
          <ResultDescription>추천 검색</ResultDescription>
          <SearchSuggestions>
            {suggestions.map(([text, color, onClick]) => <SearchSuggestion key={text} color={color} onClick={onClick}>{text}</SearchSuggestion>)}
          </SearchSuggestions>
          {invalidRegex ?
            <NoResults>잘못된 정규식 패턴이에요.</NoResults> :
            results.length === 0 ?
              <NoResults>검색 결과가 없어요.</NoResults> :
              <></>
          }
          {!invalidRegex && results.length > 0 && <ResultDescription>검색 결과</ResultDescription>}
          {results.map(it => <SearchResult key={it.key} summary={it} highlight={value} useRegex={useRegex} caseSensitive={caseSensitive}/>)}
        </ResultsContainer>
      </SvhContainer>
    </OverlayContainer>
  )
}

const SearchResult: React.FC<{ summary: PostSummary, highlight: string, useRegex: boolean, caseSensitive: boolean }> = props => {
  const { summary, highlight, useRegex, caseSensitive } = props
  const textToHighlight = useMemo(() => useRegex ? new RegExp(highlight, caseSensitive ? "g" : "gi") : highlight, [caseSensitive, highlight, useRegex])

  return (
    <SearchResultRoot href={`/posts/retrieve/${summary.key}`}>
      <SearchResultImage src={require(`$/__posts__/${summary.key}/preview.jpg`)} alt={""} fill/>
      <HoverIndicator/>
      <SearchResultDetail>
        <SearchResultCategories>
          {summary.categories.map(it =>
            <SearchResultCategory
              key={it[0]}
              highlight={textToHighlight}
              highlighter={CategoryHighlighter}
              color={it[1]}
              caseSensitive={caseSensitive}
            >
              {it[0]}
            </SearchResultCategory>
          )}
        </SearchResultCategories>
        <HighlightedTitle highlight={textToHighlight} highlighter={TitleHighlighter} caseSensitive={caseSensitive}>{summary.title}</HighlightedTitle>
        <HighlightedSummary highlight={textToHighlight} highlighter={SummaryHighlighter} caseSensitive={caseSensitive}>{summary.excerpt}</HighlightedSummary>
      </SearchResultDetail>
      <SearchResultEnterIndicator alt={""} src={require("@/resources/icons/enter.svg")} width={30} height={30}/>
    </SearchResultRoot>
  )
}

const BackButtonContainer = styled.div`
  width: 95%;
  max-width: 700px;
  position: absolute;
  top: 16px;
  ${WhenWidthMost(650)} {
    top: 8px;
  }
`
const BackButton = styled(Image)`
  width: 30px;
  height: 30px;
  display: block;
`

const SearchSuggestions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 12px;
`

const SearchSuggestion = styled.button<{ color: string }>`
  font-size: 14px;
  margin: 0 4px;
  padding: 2px 8px;
  background-color: ${({ color }) => `${color}25`};
  border: none;
  border-radius: 4px;
  display: block;
  font-family: inherit;
  cursor: pointer;
  outline: none;
  color: #dedede;
  
  &:hover, &:focus {
    background-color: ${({ color }) => `${color}45`};
  }
`

const SearchResultCategories = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const SearchResultCategory = styled(Highlighted)<{ color: string }>`
  font-size: 10px;
  margin-right: 4px;
  background-color: ${({ color }) => `${color}45`};
  padding: 0 4px;
  border-radius: 2px;
`
const SearchResultDetail = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const ResultDescription = styled.p`
  font-size: 12px;
  color: #a2a2a2;
  margin: 0 0 2px 16px;
`

const SearchResultImage = styled(Image)`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 50%;
  z-index: 0;
  object-fit: cover;
  mask: linear-gradient(to right, transparent 0%, transparent 40%, black 100%);
  opacity: 0.15;
`

const HoverIndicator = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background-color: white;
  opacity: 0;
`

const SearchResultEnterIndicator = styled(Image)`
  position: relative;
  z-index: 2;
  display: none;
`

const SearchResultRoot = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
  position: relative;
  
  &:hover, &:focus {
    background-color: #ffffff15;
    outline: none;
  }
  &:hover > ${HoverIndicator}, &:focus > ${HoverIndicator} {
    opacity: 1;
  }
  &:hover > ${SearchResultImage}, &:focus > ${SearchResultImage} {
    opacity: 0.35;
  }
  &:focus > ${SearchResultEnterIndicator} {
    display: block;
  }
`

const HighlightedTitle = styled(Highlighted)`
  font-weight: bold;
  font-size: 18px;
  color: #dedede;
  position: relative;
  z-index: 2;
`
const HighlightedSummary = styled(Highlighted)`
  font-size: 12px;
  color: #a2a2a2;
  position: relative;
  z-index: 2;
`
const TitleHighlighter = styled.span`
  color: #56A8F5;
`
const SummaryHighlighter = styled.span`
  color: #56A8F5c0;
`
const CategoryHighlighter = styled.span`
  text-decoration: underline;
`

const Suffix = styled.div`
  font-family: "JetBrains Mono", sans-serif;
  flex-shrink: 0;
  color: #888888;
  display: block;
  margin-bottom: 6px;
`
const At = styled.div<{ $kor?: boolean }>`
  font-family: ${({ $kor }) => $kor ? "inherit" : "\"JetBrains Mono\", sans-serif"};
  flex-shrink: 0;
  color: #56A8F5;
  background-color: #56A8F520;
  border-radius: 4px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  padding: ${({ $kor }) => $kor ? "0 2px" : "0 4px"};
  height: 24px;
`

const InputContainer = styled.div`
  background-color: #272727;
  border-radius: 5px;
  padding: 10px 16px 4px 16px;
  width: 95%;
  max-width: 700px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  box-shadow: 0 0 10px black;
  font-size: 14px;
  
  ${WhenWidthMost(650)} {
    font-size: 12px;
    width: 100%;
    border-radius: 0;
  }
`

const ResultsContainer = styled.div`
  margin-top: 16px;
  background-color: #272727;
  border-radius: 5px;
  padding: 10px 0;
  width: 95%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  max-height: 70%;
  overflow: auto;
  box-shadow: 0 0 10px black;

  ${WhenWidthMost(650)} {
    max-height: unset;
    flex-grow: 1;
    margin-bottom: 16px;
    width: 100%;
    border-radius: 0;
  }
`

const SearchDescription = styled.p`
  width: 95%;
  max-width: 700px;
  font-size: 12px;
  color: #ffffff90;
  position: absolute;
  transform: translateY(calc(-100% - 8px));
  text-shadow: 0 0 10px black;
  
  ${WhenWidthMost(650)} {
    font-size: 10px;
  }
`

const Input = styled.input`
  height: 100%;
  background: none;
  border: none;
  outline: none;
  color: #dedede;
  font-size: 18px;
  flex: 1;
  display: block;

  font-family: inherit;
  margin-bottom: 6px;
`
const InputWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  min-width: min(250px, 100vw);
`

const OverlayContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  background-color: #00000099;
  z-index: 999999;
  color: white;
`

const SvhContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100svh;
  padding-top: 175px;

  ${WhenWidthMost(650)} {
    padding-top: 80px;
  }
`

const SearchBarActivatorContent = styled.div`
  flex-direction: row;
  display: flex;
  align-items: center;
`

const NoResults = styled.p`
  color: #dedede;
  margin: 16px 0;
  text-align: center;
  align-self: center;
`
