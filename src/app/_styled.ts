'use client'

import styled, { css } from "styled-components";
import { Select } from "@/lib/styled/media-queries"
import { PostExpand } from "@/lib/23summer/post"

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

  ${Select(0, 1150)} {
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
    
    ${Select(0, 500)} {
      font-size: 14px;
    }
    ${Select(1350)} {
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
  
  ${Select(0, 500)} {
    font-size: 40px;
    
    > span {
      text-shadow: #ffffff40 0 0 10px;
    }
  }

  ${Select(1350)} {
    font-size: 75px;
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
    height: 60px;
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

  ${Select(1350)} {
    font-size: 24px;
  }
`

export const ContentHeader = styled.div`
  font-size: 12px;
  opacity: 0.45;
  margin-bottom: 15px;

  ${Select(1350)} {
    font-size: 16px;
  }
`

export const Comment = styled.b`
  margin-bottom: 15px;
`

export const ReadMe = styled.ul`
  margin-bottom: 15px;
`

export const MotdContent = styled.div`
  display: flex; align-items: center;
`

export const MotdImage = styled.img<{ rotate: number }>`
  width: 65px; height: 65px;
  border: 3px solid white;
  rotate: ${({ rotate }) => rotate}deg;
  
  ${Select(1350)} {
    width: 85px; height: 85px;
  }
`

export const MotdText = styled.div`
  margin-left: 20px;
  white-space: pre-wrap;
`
