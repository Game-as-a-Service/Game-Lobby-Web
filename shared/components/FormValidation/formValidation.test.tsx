import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormValidation from '.';
const setup = () => {
    const utils = render(<FormValidation submit={() => {}} />)
    const input = utils.container.querySelector('#nickname')
    return {
        ...utils,
        input,
    }
}

test('It should be between 4 and 10 characters', () => {
    const { input } = setup();
    // fireEvent.change(input, { target: { value: '123' } });
    // expect(input.value).toBe('1234');
    // fireEvent.change(input, { target: { value: '12345678901' } });
    // expect(input.value).toBe('1234567890123456');
    // fireEvent.change(input, { target: { value: '1234' } });
    // expect(input.value).toBe('1234');
    fireEvent.change(input, { target: { value: '1234567890123456' } });
    expect(input.maxLength).toBe(16)
    expect(input.minLength).toBe(4)
    expect(input.value).toBe('1234567890123456');
});

test('It should not allow special characters', () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: '中文英文12' } });
    expect(input.value).toBe('中文英文12');
})