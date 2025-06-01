"use client";

import React from 'react';
import { ThreeDMarquee } from "./3d-marquee";

export default function ThreeDMarqueeDemo() {
  const images = [
    "https://cdn.worldvectorlogo.com/logos/react-2.svg",
    "https://cdn.worldvectorlogo.com/logos/typescript.svg",
    "https://cdn.worldvectorlogo.com/logos/tailwindcss.svg",
    "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg",
    "https://cdn.worldvectorlogo.com/logos/python-5.svg",
    "https://cdn.worldvectorlogo.com/logos/docker.svg",
    "https://cdn.worldvectorlogo.com/logos/kubernetes.svg",
    "https://cdn.worldvectorlogo.com/logos/aws-2.svg",
    "https://cdn.worldvectorlogo.com/logos/google-cloud-1.svg",
    "https://cdn.worldvectorlogo.com/logos/azure-2.svg",
    "https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg",
    "https://cdn.worldvectorlogo.com/logos/postgresql.svg",
    "https://cdn.worldvectorlogo.com/logos/redis.svg",
    "https://cdn.worldvectorlogo.com/logos/graphql.svg",
    "https://cdn.worldvectorlogo.com/logos/next-js.svg",
    "https://cdn.worldvectorlogo.com/logos/vue-9.svg",
    "https://cdn.worldvectorlogo.com/logos/angular-icon-1.svg",
    "https://cdn.worldvectorlogo.com/logos/svelte-1.svg",
    "https://cdn.worldvectorlogo.com/logos/electron.svg",
    "https://cdn.worldvectorlogo.com/logos/flutter.svg",
    "https://cdn.worldvectorlogo.com/logos/tensorflow-2.svg",
    "https://cdn.worldvectorlogo.com/logos/pytorch.svg",
    "https://cdn.worldvectorlogo.com/logos/opencv-2.svg",
    "https://cdn.worldvectorlogo.com/logos/unity-69.svg",
    "https://cdn.worldvectorlogo.com/logos/unreal-engine-4.svg",
    "https://cdn.worldvectorlogo.com/logos/blockchain.svg",
    "https://cdn.worldvectorlogo.com/logos/ethereum.svg",
    "https://cdn.worldvectorlogo.com/logos/solidity.svg",
    "https://cdn.worldvectorlogo.com/logos/web3-js.svg",
    "https://cdn.worldvectorlogo.com/logos/ipfs.svg",
  ];

  return (
    <div className="mx-auto my-10 max-w-7xl rounded-3xl bg-gray-950/5 p-2 ring-1 ring-neutral-700/10 dark:bg-neutral-800">
      <ThreeDMarquee images={images} />
    </div>
  );
} 