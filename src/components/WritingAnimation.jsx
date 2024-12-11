import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const SVGContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.5rem 0;
    height: 180px;
`;

const StyledPath = styled.path`
    fill: none;
    stroke: #543A14;
    stroke-width: 14;
    stroke-linecap: round;
    stroke-linejoin: round;
`;

const WritingAnimation = () => {
    const pathRefs = useRef([]);

    useEffect(() => {
        pathRefs.current.forEach((path, index) => {
            if (path) {
                const length = path.getTotalLength();
                path.style.strokeDasharray = length;
                path.style.strokeDashoffset = length;
                path.style.animation = `write 1.5s ${index * 0.2}s ease forwards`;
            }
        });
    }, []);

    return (
        <SVGContainer>
            <svg width="600" height="180" viewBox="0 0 600 180">  {/* SVG 크기 증가 */}
                <style>
                    {`
                        @keyframes write {
                            to {
                                stroke-dashoffset: 0;
                            }
                        }
                    `}
                </style>
                {/* 모든 좌표값을 1.5배로 증가 */}
                {/* C */}
                <StyledPath
                    ref={el => pathRefs.current[0] = el}
                    d="M112,112 C67,120 67,67 97,67 C112,67 120,75 118,82"
                />
                {/* o */}
                <StyledPath
                    ref={el => pathRefs.current[1] = el}
                    d="M165,90 C165,75 187,75 187,90 C187,105 165,105 165,90"
                />
                {/* t */}
                <StyledPath
                    ref={el => pathRefs.current[2] = el}
                    d="M232,60 L232,105 M217,75 L247,75"
                />
                {/* o */}
                <StyledPath
                    ref={el => pathRefs.current[3] = el}
                    d="M285,90 C285,75 307,75 307,90 C307,105 285,105 285,90"
                />
                {/* p */}
                <StyledPath
                    ref={el => pathRefs.current[4] = el}
                    d="M345,75 L345,135 M345,90 C345,75 367,75 367,90 C367,105 345,105 345,90"
                />
                {/* i */}
                <StyledPath
                    ref={el => pathRefs.current[5] = el}
                    d="M405,75 L405,120 M405,60 L405,63"
                />
                {/* a */}
                <StyledPath
                    ref={el => pathRefs.current[6] = el}
                    d="M442,90 C442,75 465,75 465,90 L465,111 M465,90 C465,105 442,105 442,90"
                />
            </svg>
        </SVGContainer>
    );
};

export default WritingAnimation;