import { useState } from 'react';

type Props = {
    name: string
}

export default function FormValidation(props: Props) {
    const [inputValue, setInputValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [errorSpecialCharacter, setErrorSpecialCharacter] = useState('');
    const [count, setCount] = useState(0);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const maxLength = 16;
        const minLength = 4;
        const length = value
        .split('')
        .map( char => (/[^\x00-\xff]/.test(char) ? 2 : 1))
        .reduce((acc, curr) => acc + curr, 0)
        
        const isDuplicate = value === props.name

        setInputValue(value);
        setCount(length);

        if (length < minLength) return setErrorMessage('請輸入至少 4 個英文字符或 2 個中文字符');
        if (length > maxLength) return setErrorMessage('請輸入最多 16 個英文字符或 8 個中文字符');
        if (isDuplicate) return setErrorMessage('暱稱不可重複');

        setErrorMessage('');
    }

    const handleInputKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

        if (specialChars.test(inputValue)) setErrorSpecialCharacter('請勿使用特殊字元');
        else setErrorSpecialCharacter('');
        if (count === 0) setErrorMessage('');
    }


    return (
        <form className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="col-span-full">
                <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                暱稱
                </label>

                <div className="mt-2.5">
                    <input
                        className={`
                            block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm 
                            ring-1 ring-inset  placeholder:text-gray-400 
                            focus:ring-2 focus:ring-inset 
                            sm:text-sm sm:leading-6
                            transition duration-150 ease-in-out
                            ${errorMessage ? 'ring-red-500 focus:ring-2 focus:ring-red-800 ' : 'ring-gray-300 focus:ring-indigo-600 '}
                        `}
                        id="nickname"
                        name="nickname"
                        type="text" 
                        value={inputValue} 
                        onChange={handleInputChange}
                        onKeyUp={handleInputKeyUp}
                        required
                    />
                </div>
            </div>

            <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
                
                 <div className={`sm:col-span-2 text-sm leading-6 ${count < 4 || count > 16 ? 'text-red-500' : 'text-gray-500'}`}>
                    {count > 0 && count + '/16 '} 
                    {errorMessage && <span className="text-red-500">{errorMessage}</span>}
                    {errorSpecialCharacter && <span className="text-red-500"> {errorSpecialCharacter}</span>}
                </div>

                <div className="sm:col-span-2 flex justify-end">
                    <button
                        type="submit"
                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        送出
                    </button>
                </div>
                
            </div>
        </form>
    )
}  