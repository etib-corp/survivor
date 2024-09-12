import React from 'react';

import { Button } from 'flowbite-react';

import { HiArrowRight } from 'react-icons/hi';

import { buttonOutlineTheme } from '../themes';

const ETIBCard: React.FC<{ title: string, subtitle: string, buttonTitle: string, path: string, content: any|null }> = ({ title, subtitle, buttonTitle, path, content }) => {
    return (
        <div className="h-full p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-center items-center">
            {
                content && content
            }
            <a href={path}>
                <h5 className="p-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {title}
                </h5>
            </a>
            <p className="px-4 mb-4 font-normal text-gray-700 dark:text-gray-400">
                {subtitle}
            </p>
            <Button href={path} theme={buttonOutlineTheme} color="default" className='hover:text-white hover:bg-pinkT'>
                {buttonTitle}
                <HiArrowRight className="ml-2 w-5 h-5" />
            </Button>
        </div>
    );
};

export default ETIBCard;