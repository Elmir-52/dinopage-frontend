export default function PaymentExample() {
    return (
        <div className="pt-5 bg-gray-50">
            <div className="w-[90%] mx-auto mb-5 p-5 bg-white rounded-md">
                <p className="mb-2.5 text-gray-500">Your balance</p>
                
                <div className="flex items-center gap-2 mb-6">
                    <div className="flex items-center justify-center w-10 h-10 text-2xl text-orange-600
                    italic font-bold border-3 border-solid border-yellow-600 bg-yellow-300 rounded-full">
                        V
                    </div>
                    
                    <p className="text-3xl font-bold">
                        <span>$1,878</span>
                        <span className="text-gray-500">.67</span>
                    </p>
                </div>

                <button className="flex items-center justify-center gap-2 w-full p-4 bg-blue-500 
                text-white rounded-xl">
                    <span className="text-2xl">+ </span>
                    <span>Buy credits</span>
                </button>
            </div>

            <div className="flex flex-col gap-8 p-5 bg-white">
                <div className="flex items-center justify-between">
                    <p>Payment cards</p>
                    <button className="text-blue-500">
                        + Add card
                    </button>
                </div>

                <div className="flex flex-col gap-5">
                    <button className="flex justify-between items-center">
                        <div className="flex gap-3">
                            <div className="px-5 py-4 bg-blue-700 text-white font-extrabold text-xl
                            rounded-xl flex items-center">
                                VISA
                            </div>

                            <div className="flex flex-col items-start justify-between">
                                <p className="flex gap-2">
                                    <span>Domen Kraji</span>
                                    <span className="text-blue-500 text-xs px-3 bg-gray-100 rounded-xl
                                    flex items-center">
                                        Primary
                                    </span>
                                </p>
                                <p className="text-gray-500">
                                    **** 8775
                                </p>
                            </div>
                        </div>
                        <p className="text-3xl text-gray-500">&gt;</p>
                    </button>

                    <button className="flex justify-between items-center">
                        <div className="flex gap-3">
                            <div className="px-5 py-4 bg-gray-900 text-white font-extrabold text-xl
                            rounded-xl flex items-center">
                                VISA
                            </div>

                            <div className="flex flex-col items-start justify-between">
                                <p className="flex gap-2">
                                    <span>Domen Kraji</span>
                                </p>
                                <p className="text-gray-500">
                                    **** 7492
                                </p>
                            </div>
                        </div>
                        <p className="text-3xl text-gray-500">&gt;</p>
                    </button>
                </div>

                <div className="p-4 bg-green-500/10 rounded-xl">
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    </p>
                </div>
            </div>
        </div>
    )
}