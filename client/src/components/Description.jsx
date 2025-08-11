import React from 'react'
import { assets } from '../assets/assets'

const Description = () => {
    return (
        <div className='flex flex-col items-center justify-center
            my-24 p-6 md:px-28'
        >
            <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>
                Create AI Images
            </h1>
            <p className='text-gray-500 mb-8'>
                Turn your imagination into visuals
            </p>

            <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center'>
                <img src={assets.sample_img_1} alt="" 
                    className='w-80 xl:w-96 rounded-lg'
                />

                <div>
                    <h2 className='text-3xl font-medium max-w-lg mb-4'>
                        Introducing the AI-Powered Text to image Generator 
                    </h2>
                    <p className='text-gray-600 mb-4'>
                       Imagify is your personal AI artist that turns words into pictures. 
                       Just type what's on your mind, and in seconds, it creates visuals 
                       that match your imagination. Whether you're dreaming up a futuristic 
                       city, designing a product, or just exploring creative ideas, Imagify 
                       makes it easy to bring your thoughts to life—no design skills needed. 
                    </p>
                    <p className='text-gray-600'>
                        It's built to be simple, fast, and fun to use. You can tweak styles, 
                        adjust sizes, and experiment until you get the perfect image. 
                        Whether you're a designer, content creator, or just someone 
                        who loves to create, Imagify helps you turn “what if” into 
                        something you can actually see.
                    </p>
                </div>

            </div>

        </div>
    )
}

export default Description
