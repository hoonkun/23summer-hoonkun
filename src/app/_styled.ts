'use client'

import styled, { css } from "styled-components";
import { Select } from "@/lib/styled/media-queries"

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
  position: sticky; top: 0;
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

export const ContentArea = styled.div`
  position: relative;
  width: 100%; height: 100%;
  z-index: 1;
`

export const TitleText = styled.div`
  display: flex;
  align-items: center;
  
  font-size: 50px;
  font-weight: bold;
  
  > span {
    text-shadow: #ffffff80 0 0 10px;
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

const VerticalDividerNarrowCollapse = (margin: number) => css`
  ${Select(1000, 1150)} {
    margin: 0 ${margin / 1.5}px;
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
