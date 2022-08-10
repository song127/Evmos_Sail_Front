import {keyframes} from "styled-components";

export const ContentLoaded = keyframes`
  0% {
    opacity: 0.5;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
  }
`;

export const FadeInTopDownAni = keyframes`
  0% {
    opacity: 0.1;
    transform: scaleY(30%);
    transform-origin: top;
  }
  100% {
    opacity: 1;
    transform-origin: top;
  }
`;

export const FadeInAni = keyframes`
  0% {
    opacity: 0.1;
  }
  100% {
    opacity: 1;
  }
`;