import Image from 'next/image'

import demo from '/public/images/demo.png'

const Feature = () => {
    return (
        <div className="bg-amethyst p-10">

            <h1 className='text-4xl p-5 justify-center'>Why Choosing PLUMS</h1>
            <p>Check out our cool features that enhance your learning</p>
            <div className='grid grid-cols-3'>
                <div>
                <Image src={demo} alt='Demo Picture' width={700} height={500} className='p-3' />
                <p className='p-3'>Easy-to-use</p></div>
                <div>
                <Image src={demo} alt='Demo Picture' width={700} height={500} className='p-3' />
                <p className='p-3'>Support for various content formats</p></div>
                <div>
                <Image src={demo} alt='Demo Picture' width={700} height={500} className='p-3' />
                <p className='p-3'>Organize</p></div>
            </div>
        </div>
    )
}
export default Feature