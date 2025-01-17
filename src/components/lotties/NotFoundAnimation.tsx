"use client"
import { useLottie } from "lottie-react";
import data from "@/assets/lottie/404.json"

const NotFoundAnimation = () => {
  const { View } = useLottie({
    animationData: data,
    loop: true,
    autoplay: true,
  });
  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-96">
        {View}
      </div>
    </div>
  )
}

export default NotFoundAnimation