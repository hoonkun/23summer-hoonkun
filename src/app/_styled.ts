'use client'

import styled from "styled-components";
import { WhenWidthLeast, WhenWidthMost } from "@/lib/styled/media-queries"
import { ExternalLink } from "@/components/ExternalLink"

export const HomeRoot = styled.div`
  width: 100%; height: 100%;
`

export const ContentArea = styled.div`
  position: relative;
  width: 100%; height: 100%;
  z-index: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow-x: hidden;
  pointer-events: none;
  
  & > div {
    pointer-events: auto;
  }

  ${WhenWidthMost(1150)} {
    flex-direction: column;
  }
`

export const TitleArea = styled.div`
  display: grid;
  grid-template-areas: 
    "     title           title"
    "posts-link footprints-link";
  grid-template-columns: 1fr auto;
  justify-items: end;
  grid-column-gap: 12px;

  & > a {
    align-self: flex-end;
    position: relative;
    z-index: 20;

    border-radius: 3px;
    padding: 0 4px;
    margin-right: -4px;
    margin-top: -6px;

    color: #ffffff90;

    ${WhenWidthMost(500)} {
      font-size: 14px;
    }

    ${WhenWidthLeast(1350)} {
      font-size: 20px;
    }
  }

  & > a:hover {
    background-color: #ffffff20;
  }
`

export const TitleText = styled.div`
  grid-area: title;

  display: flex;
  align-items: center;

  font-size: 50px;
  font-weight: bold;

  ${WhenWidthMost(500)} {
    font-size: 40px;
  }

  ${WhenWidthLeast(1350)} {
    font-size: 75px;
  }
`

export const TitleTextEN = styled.span`
  position: relative;
  
  text-shadow: #ffffff80 0 0 10px;

  ${WhenWidthMost(500)} {
    text-shadow: #ffffff40 0 0 10px;
  }
`

export const PostsLink = styled(ExternalLink)`
  grid-area: posts-link;
`

export const FootprintsLink = styled(ExternalLink)`
  grid-area: footprints-link;
`

export const TitleTextKR = styled.span`
  position: relative;

  font-size: 47.5px;
  
  text-shadow: #ffffff80 0 0 10px;

  ${WhenWidthMost(500)} {
    font-size: 42.5px;
    text-shadow: #ffffff40 0 0 10px;
  }

  ${WhenWidthLeast(1350)} {
    font-size: 67.5px;
  }

  &:before, &:after {
    content: '';
    left: 50%;
    position: absolute;
    filter: blur(45px);
    transform: translateZ(0);

    ${WhenWidthMost(1150)} {
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
    pointer-events: none;
  }

  &:after {
    width: 240px; height: 180px;
    background: radial-gradient(rgba(1, 65, 255, 0.4), rgba(1, 65, 255, 0));
    z-index: -1;
    margin: -100px 0 0 -50px;
    pointer-events: none;
  }
`

export const NameDivider = styled.div`
  width: 0; height: 25px;
  margin: 0 30px;

  border-right: 1px solid #ffffff;
  opacity: 0.5;
  rotate: 20deg;

  ${WhenWidthMost(500)} {
    height: 18px;
  }
`

export const SectionDivider = styled.div`
  ${WhenWidthLeast(1150)} {
    width: 0; height: 250px;
    border-right: 2px solid #ffffff;
    margin: 0 75px;
  }

  ${WhenWidthMost(1150)} {
    height: 60px;
  }

  opacity: 0.15;
`

export const TitleContent = styled.div`
  a {
    color: #639aff;
  }

  ${WhenWidthMost(500)} {
    font-size: 13px;
  }

  ${WhenWidthLeast(1350)} {
    font-size: 24px;
  }
`

export const ContentHeader = styled.div`
  font-size: 12px;
  opacity: 0.75;
  margin-bottom: 15px;

  ${WhenWidthLeast(1350)} {
    font-size: 16px;
  }
`

export const Comment = styled.b`
  margin-bottom: 15px;
  display: block;
`

export const ReadMe = styled.ul`
  margin: 15px 0 30px 0;

  list-style-type: none;

  & a {
    position: relative;
    color: white;
    font-weight: bold;

    &:after {
      content: "";
      height: 1px;
      position: absolute;
      left: -1px;
      right: -1px;
      bottom: 4px;
      background-color: rgb(193, 211, 31);
      z-index: -1;

      ${WhenWidthLeast(1350)} {
        left: -2px;
        right: -2px;
        height: 1px;
        bottom: 5px;
      }
    }

    &:before {
      content: "";
      height: 7px;
      position: absolute;
      left: -3px;
      right: -3px;
      bottom: 2px;
      background-color: rgba(193, 211, 31, 0.35);
      z-index: -1;

      ${WhenWidthLeast(1350)} {
        left: -4px;
        right: -4px;
        height: 13px;
      }
    }
  }
`

export const Hidden = styled.span`
  opacity: 0;
  user-select: none;
`

export const MotdContent = styled.div`
  display: flex; align-items: center;
  position: relative;
`

export const MotdImage = styled.img<{ rotate: number }>`
  width: 65px; height: 65px;
  border: 3px solid white;
  rotate: ${({ rotate }) => rotate}deg;

  ${WhenWidthLeast(1350)} {
    width: 85px; height: 85px;
  }
`

export const MotdText = styled.div`
  margin-left: 20px;
  white-space: pre-wrap;
`
