import Image from 'next/image'

import demo from '/public/images/demo.png'

const Hero = () => {
    return (
        <div className="block w-full h-max ms-11 bg-amethyst ">

            <h1 className='text-4xl mt-3 ms-11 justify-center'>Your Best Value Option</h1>
            
            <p className='mt-3 ms-11 px-5'>With Plums’s mobile learning software, you can learn anywhere, any time
                – whether it’s on an airplane, in another country, or in the field. Plums gives
                learners immediate and flexible access to notes for increased engagement and knowledge retention.</p>
            <a href="#_" className="relative inline-flex mt-3 items-center px-12 py-3 overflow-hidden text-lg font-medium text-indigo-600 border-2 border-indigo-600 rounded-full hover:text-white group hover:bg-gray-50">
                <span className="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </span>
                <span className="relative">Get Start</span>
            </a>
            
            <Image src={demo} alt='Demo Picture' width={700} height={500} className='mt-3 ms-11'/>

        </div>
    )
}
export default Hero