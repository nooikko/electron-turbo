import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { NodeHeader } from '../'; // replace with your actual path

describe('NodeHeader', () => {
  // Test 1: Component renders without crashing
  it('renders without crashing', () => {
    render(<NodeHeader />);
  });

  // Test 2: It renders its children correctly
  it('renders its children', () => {
    const { getByText } = render(<NodeHeader>Test Child</NodeHeader>);
    expect(getByText('Test Child')).toBeInTheDocument();
  });

  // Test 3: It merges the provided className prop with its default classes
  it('merges provided className with default classes', () => {
    const { container } = render(<NodeHeader className='custom-class'>Test</NodeHeader>);
    const divElem = container.firstChild;

    // check if the rendered component has both the default and the provided class names
    expect(divElem).toHaveClass('w-full');
    expect(divElem).toHaveClass('px-2');
    expect(divElem).toHaveClass('bg-red-500');
    expect(divElem).toHaveClass('py-0.5');
    expect(divElem).toHaveClass('text-xs');
    expect(divElem).toHaveClass('text-white');
    expect(divElem).toHaveClass('custom-class');
  });
});
