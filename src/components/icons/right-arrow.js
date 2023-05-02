import React from 'react';

function RightArrow({ fill, width, height, ...props }) {
  return (
    <svg
      width={width ?? 15}
      height={height ?? 11}
      viewBox="0 0 15 11"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.897 4.876L9.352.213a.698.698 0 00-1.004 0 .742.742 0 000 1.03l3.333 3.42H.816a.72.72 0 00-.71.728.72.72 0 00.71.728H11.68L8.348 9.538a.741.741 0 000 1.03.7.7 0 001.004 0l4.545-4.663a.741.741 0 000-1.03z"
        fill={fill ?? '#87A9FF'}
      />
    </svg>
  );
}

export default RightArrow;
