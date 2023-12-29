'use client'

import styled from "styled-components";
import { WhenWidthLeast, WhenWidthMost } from "@/lib/styled/media-queries"

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

  ${WhenWidthMost(1150)} {
    flex-direction: column;
  }
`

export const TitleArea = styled.div`
  display: flex;
  flex-direction: column;

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
  display: flex;
  align-items: center;
  
  font-size: 50px;
  font-weight: bold;
  
  > span {
    text-shadow: #ffffff80 0 0 10px;
  }
  
  ${WhenWidthMost(500)} {
    font-size: 40px;
    
    > span {
      text-shadow: #ffffff40 0 0 10px;
    }
  }

  ${WhenWidthLeast(1350)} {
    font-size: 75px;
  }
`

export const GlowText = styled.span`
  position: relative;
  
  font-size: 40px;
  
  ${WhenWidthMost(500)} {
    font-size: 35px;
  }
  
  ${WhenWidthLeast(1350)} {
    font-size: 60px;
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
    text-decoration: underline;
  }
`

export const Hidden = styled.span`
  opacity: 0;
  user-select: none;
`

export const MotdContent = styled.div`
  display: flex; align-items: center;
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
