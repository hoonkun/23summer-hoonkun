'use client'

import styled, { css } from "styled-components";
import { Select } from "@/lib/styled/media-queries"
import { PostExpand } from "@/lib/23summer/post"

type CanBlur = { blur: number }
type CanOpacity = { opacity: number }

export const HomeRoot = styled.div`
  width: 100%; height: 100%;
`

export const BackgroundContainer = styled.div.attrs<CanBlur>(props => ({ style: { filter: `blur(${props.blur}px)` } }))`
  position: absolute;
  width: 100%; height: 100%;

  z-index: 0;
`

export const BackgroundImage = styled.img`
  width: 100%; height: 100%;
  display: block;
  
  object-fit: cover;
  object-position: 30% 50%;
  image-rendering: pixelated;
  
  ${Select(0, 1150)} {
    filter: brightness(0.3);
  }
  ${Select(1150)} {
    filter: brightness(0.75);
  }
`

export const Scrollable = styled.div`
  position: relative;
  width: 100%; height: 100%;
  z-index: 1;
  
  overflow-x: hidden;
  overflow-y: auto;
`

export const StickyArea = styled.div.attrs<CanBlur & CanOpacity>(props => ({ style: { filter: `blur(${props.blur}px)`, opacity: props.opacity } }))`
  ${Select(500)} {
    position: sticky; top: 0;
  }
  width: 100%; height: 100%;
  z-index: 0;
  
  display: flex;
  align-items: center;
  justify-content: center;

  overflow-x: hidden;

  ${Select(0, 1150)} {
    flex-direction: column;
  }
`

export const TitleText = styled.div`
  display: flex;
  align-items: center;
  
  font-size: 50px;
  font-weight: bold;
  
  > span {
    text-shadow: #ffffff80 0 0 10px;
  }
  
  ${Select(0, 500)} {
    font-size: 40px;
  }
`

export const GlowText = styled.span`
  position: relative;
  
  &:before, &:after {
    content: '';
    left: 50%;
    position: absolute;
    filter: blur(45px);
    transform: translateZ(0);
    
    ${Select(0, 1150)} {
      opacity: 0.6;
    }
  }
  
  &:before {
    width: 480px; height: 360px;
    background: linear-gradient(
      to bottom right,
      rgba(1, 65, 255, 0),
      rgba(1, 65, 255, 0),
      rgba(1, 65, 255, 0.3)
    );
    border-radius: 50%;
    margin: -200px 0 0 -450px;
  }

  &:after {
    width: 240px; height: 180px;
    background: radial-gradient(rgba(1, 65, 255, 0.4), rgba(1, 65, 255, 0));
    z-index: -1;
    margin: -100px 0 0 -50px;
  }
`

export const NameDivider = styled.div`
  width: 0; height: 25px;
  margin: 0 30px;
  
  border-right: 2px solid #ffffff;
  opacity: 0.5;
`

export const SectionDivider = styled.div`
  ${Select(1150)} {
    width: 0; height: 250px;
    border-right: 2px solid #ffffff;
    margin: 0 75px;
  }
  ${Select(0, 1150)} {
    height: 75px;
  }
  
  opacity: 0.15;
`

export const TitleContent = styled.div`
  > ul {
    margin: 15px 0;
    padding-inline-start: 20px;
  }
  a {
    color: #639aff;
  }
  
  ${Select(0, 500)} {
    font-size: 13px;
  }
`

export const ContentHeader = styled.div`
  font-size: 12px;
  opacity: 0.45;
`

export const MotdContent = styled.div`
  display: flex; align-items: center;
  margin-top: 15px;
`

export const MotdImage = styled.img<{ rotate: number }>`
  width: 65px; height: 65px;
  border: 3px solid white;
  rotate: ${({ rotate }) => rotate}deg;
`

export const MotdText = styled.div`
  margin-left: 20px;
`

export const PostsGrid = styled.div`
  margin: 50px auto 0 auto;
  width: 80%;
  ${Select(0, 500)} {
    width: calc(100% - 15px);
  }
  
  flex-grow: 1;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 100%;
  grid-row-gap: 10px;
  
  ${Select(750)} {
    grid-template-rows: unset;
    grid-auto-rows: 250px;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
  }
  
  ${Select(900)} {
    grid-template-columns: repeat(3, 1fr);
  }
  ${Select(750, 900)} {
    grid-template-columns: repeat(2, 1fr);
  }
  ${Select(0, 750)} {
    grid-template-columns: repeat(1, 1fr);
  }

  ${Select(750, 1400)} {
    grid-auto-rows: 200px;
  }
`

export const PostItemViewRoot = styled.div<{ expand?: { by2: PostExpand, by3: PostExpand } }>`
  align-self: center;
  justify-self: stretch;
  
  width: 100%;
  height: 100%;
  
  position: relative;
  
  ${Select(500, 750)} {
    height: 300px;
  }
  ${Select(0, 500)} {
    height: 200px;
  }
  ${Select(750)} {
    &:hover {
      transform: scale(1.05);
      z-index: 100;
    }
  }
  ${Select(900)} {
    ${({ expand }) => expand ? css`grid-column: span ${expand.by3.columns};grid-row: span ${expand.by3.rows};` : ""}
  }
  ${Select(750, 900)} {
    ${({ expand }) => expand ? css`grid-column: span ${expand.by2.columns};grid-row: span ${expand.by2.rows};` : ""}
  }

  transition: transform 0.25s cubic-bezier(0.33, 1, 0.68, 1);
`

export const PostPreviewImageContainer = styled.div`
  position: absolute; top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 0;
  
  overflow: hidden;
`

export const PostPreviewContent = styled.div`
  position: relative;
  width: 100%; height: 100%;
  z-index: 1;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const PostPreviewTitle = styled.div<{ expand?: { by2: PostExpand, by3: PostExpand } }>`
  ${Select(1000)} {
    font-size: ${({ expand }) => (expand?.by3?.columns ?? 1) >= 2 ? 30 : 18}px;
  }
  ${Select(900, 1000)} {
    font-size: ${({ expand }) => (expand?.by3?.columns ?? 1) >= 2 ? 30 : 14}px;
  }
  ${Select(825, 900)} {
    font-size: ${({ expand }) => (expand?.by2?.columns ?? 1) >= 2 ? 30 : 18}px;
  }
  ${Select(750, 825)} {
    font-size: ${({ expand }) => (expand?.by2?.columns ?? 1) >= 2 ? 30 : 14}px;
  }
  ${Select(500, 750)} {
    font-size: 20px;
  }
  ${Select(0, 500)} {
    font-size: 16px;
  }
  ${Select(1000)} {
    margin: 0 25px;
  }
  ${Select(900, 1000)} {
    margin: 0 15px;
  }
  ${Select(750, 900)} {
    margin: 0 25px;
  }
  ${Select(0, 750)} {
    margin: 0 50px;
  }
  font-weight: bold;
  text-align: center;
  word-break: keep-all;
`

export const PostPreviewImage = styled.img`
  width: 100%; height: 100%;
  object-fit: cover;

  filter: brightness(0.5) blur(5px);
  scale: 1.2;
`

export const PostPreviewExcerpt = styled.div`
  ${Select(1400)} {
    font-size: 14px;
    margin: 15px 40px 0 40px;
  }
  ${Select(1000, 1400)} {
    font-size: 12px;
    margin: 15px 40px 0 40px;
  }
  ${Select(750, 1000)} {
    font-size: 12px;
    margin: 15px 20px 0 20px;
  }
  ${Select(500, 750)} {
    font-size: 14px;
    margin: 15px 40px 0 40px;
  }
  ${Select(0, 500)} {
    font-size: 12px;
    margin: 15px 40px 0 40px;
  }
  
  opacity: 0.75;
  text-align: center;
  word-break: keep-all;
`
