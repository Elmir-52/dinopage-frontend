export default function ExampleView() {
    return (
        <div className="container mx-auto relative">
            <h1 className='text-5xl font-bold text-orange-400 text-center mt-20'>Hello Tailwind</h1>

            <button className="text-xl rounded-xl bg-orange-600 text-white mt-10 mx-auto block px-3
            py-1 border-2 border-white/60 border-solid hover:bg-orange-400 transition-colors ease
            duration-300 cursor-pointer">
                Click me
            </button>

            <div className="mt-10 w-20 h-20 mx-auto animate-spin rounded-full border-10 border-dashed
            border-blue-500 overflow-hidden" />

            <div className="flex items-center gap-5 my-20">
                <div className="flex items-center justify-center bg-red-400 w-20 h-20">Left</div>
                <div className="bg-red-400 w-20 h-20">Right</div>
            </div>

            <div className="grid grid-cols-2 gap-10">
                <div className="bg-green-500 h-30"/>
                <div className="bg-green-500 h-30"/>
            </div>

            {/* <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex 
            items-center justify-center">
                <div className="bg-white w-1/3 p-5 rounded-2xl">
                    <h1 className="text-3xl font-medium">Modal</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Sint aut impedit animi quo obcaecati assumenda alias cum magnam, exercitationem?
                    </p>
                </div>
            </div> */}

            <div className="my-50">
                <h1 className="text-3xl text-center font-bold mb-10 after:content-['_Dinopage']
                after:block"
                >
                    Channel:
                </h1>

                <input 
                    type="text"
                    placeholder="Enter text"
                    className="outline-0 border-2 border-solid border-black transition-colors
                    ease-in-out duration-200 hover:border-green-700 block mx-auto py-1 px-2
                    rounded-md placeholder:text-green-700 text-green-700 shadow-red-500 mb-20"
                />

                <div className="flex items-center justify-center w-30 h-30 mx-auto bg-orange-400
                rounded-xl font-bold shadow transition-colors duration-500 md:bg-blue-400
                lg:bg-purple-400 xl:bg-red-400 2xl:bg-green-400 mb-20">
                    ADAPTIVE
                </div>

                <div className="perspective-distant">
                    <iframe
                        src="https://media.istockphoto.com/id/2177059950/nl/video/dice-filmed-on-a-high-speed-camera-at-1000-fps.mp4?s=mp4-640x640-is&k=20&c=wGM0MMi-HJvP9xegnvNzryMcYf7eefaB_sPmRYtmA3Y="
                        className="w-[80%] h-[80%] mx-auto rounded-xl aspect-video rotate-x-40 
                        rotate-z-30 transform-3d shadow-2xl"
                    />
                </div>
            </div>
        </div>
    )
}