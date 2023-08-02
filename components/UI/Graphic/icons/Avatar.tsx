import * as React from "react";
import { SVGProps, memo } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 1080 1080"
    {...props}>
    <defs>
      <filter
        id="a"
        x="-20%"
        y="-20%"
        width="140%"
        height="140%"
        filterUnits="objectBoundingBox"
        primitiveUnits="userSpaceOnUse"
        colorInterpolationFilters="linearRGB">
        <feMorphology
          operator="dilate"
          radius="20 20"
          in="SourceAlpha"
          result="morphology"
        />
        <feFlood floodColor="#fff" floodOpacity={1} result="flood" />
        <feComposite
          in="flood"
          in2="morphology"
          operator="in"
          result="composite"
        />
        <feMerge result="merge">
          <feMergeNode in="composite" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g filter="url(#a)" transform="matrix(-1 0 0 1 1080 0)">
      <path
        d="M532 379c132.548 0 240 107.452 240 240s-20.49 279.251-240 280c-115.733.395-199.682-82.914-226.751-180.282C264.226 715.292 232 680.909 232 639c0-39.865 29.159-72.92 67.312-79C325.6 455.98 419.81 379 532 379ZM295.859 624.545l8.282 30.91"
        stroke="#000"
        strokeWidth={24}
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#fff"
      />
      <path
        d="M631 694.38c29.333-6.92 47-17.047 53-30.38 9-20-46.967-57.607-23.839-85M572 769c13.776 5.333 27.11 8 40 8s26.224-2.667 40-8"
        stroke="#000"
        strokeWidth={16}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M570 516c8.837 0 16 10.745 16 24s-7.163 24-16 24-16-10.745-16-24 7.163-24 16-24Zm138 0c8.837 0 16 10.745 16 24s-7.163 24-16 24-16-10.745-16-24 7.163-24 16-24Z"
        fill="#000"
        fillRule="evenodd"
      />
      <path
        d="M594 500c-4.805-6.667-12.805-10-24-10s-24.528 3.333-40 10m154 0c4.805-6.667 12.805-10 24-10s24.528 3.333 40 10"
        stroke="#000"
        strokeWidth={16}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M628.74 541.63c-16.3 43.466-34.59 64.37-73.097 64.37-39.982 0-57.824-16.365-60.006-69.825-.088-2.165-2.634-4.347-7.637-6.546V508.9c39.697-5.642 68.427-7.824 86.19-6.546 12.422.894 26.829 4.008 43.22 9.343 4.697 1.53 12.111 2.415 22.24 2.658l.687-.017c9.778-.266 16.963-1.146 21.555-2.64 16.39-5.336 30.797-8.45 43.22-9.344 17.762-1.278 46.492.904 86.189 6.546h0v20.73c-5.003 2.198-7.549 4.38-7.637 6.545C781.482 589.635 763.64 606 723.658 606c-38.506 0-56.798-20.904-73.097-64.37-2.182-5.818-5.82-8.728-10.91-8.728h0c-5.092 0-8.729 2.91-10.91 8.728ZM488 509l-195 32-4 9 199-20z"
        fill="#000"
        stroke="#000"
        strokeWidth={4}
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m279 719 33 8 49 78c-15.895-9.207-30.895-21.207-45-36s-26.438-31.46-37-50Zm64-416c24-80.667 99.667-100.667 227-60 191 61 212 228 212 253 0 16.667-3.667 37.667-11 63l-1.622-2.212C742.968 520.931 720.842 498.002 703 488c-50.826-28.49-114.183-24-154-24-39.817 0-120.896-33.042-137-36-2.312-.425-10.41 3.43 17 20l1.116.665c6.772 3.98 17.066 9.093 30.884 15.335-13.404.038-28.688-2.194-45.853-6.696l-2.643-.705c-16.792-4.523-27.861-8.215-33.208-11.077l.772 3.185c8.198 33.978 12.297 56.656 12.297 68.032 0 11.494-8.44 55.986-25.321 133.475L366 655c-15.333-35.333-27.667-59-37-71-14-18-28.798-28.57-41-25l-.755.23c-8.5 2.687-28.708 12.137-43.245 29.77-5.25 6.369-10.917 18.369-17 36l-.934-1.406C212.5 603.101 205.146 587.903 204 578c-3.882-33.558 10.597-60.644 10-68-3.476-42.822-26-107 30-152l2.235-1.786C282.652 327.271 314.907 309.534 343 303Z"
        stroke="#000"
        strokeWidth={12}
        fill="#000"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

const Memo = memo(SvgComponent);
export default Memo;
