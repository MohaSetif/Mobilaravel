import { View, Text, Image } from 'react-native'
import React from 'react'
import { AppFeature } from '@/constants/AppSteps'

const ZigZag = ({ step }: { step: AppFeature }) => {
  return (
    <View className='flex-1 items-center justify-center text-white p-4'>
        <Text className='text-2xl font-bold mb-4'>
            {step.title}
        </Text>
        <Text className='text-base mb-4'>
          {step.description}
        </Text>
        <Image 
            source={step.image}
            className="w-full h-full rounded-xl"
            resizeMode="cover"
        />
    </View>
  )
}

export default ZigZag