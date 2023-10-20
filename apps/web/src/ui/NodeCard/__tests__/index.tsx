import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { NodeCard } from '../'; // replace with your actual path

describe('NodeCard', () => {
  // Test 1: Component renders without crashing
  it('renders without crashing', () => {
    render(<NodeCard />);
  });

  // Test 2: It renders its children correctly
  it('renders its children', () => {
    const { getByText } = render(<NodeCard>Test Child</NodeCard>);
    expect(getByText('Test Child')).toBeInTheDocument();
  });

  // Test 3: It merges the provided className prop with its default classes
  it('merges provided className with default classes', () => {
    const { container } = render(<NodeCard className='custom-class'>Test</NodeCard>);
    const divElem = container.firstChild;

    if (divElem) {
      // check if the rendered component has both the default and the provided class names
      expect(divElem).toHaveClass('card');
      expect(divElem).toHaveClass('w-48');
      expect(divElem).toHaveClass('overflow-hidden');
      expect(divElem).toHaveClass('rounded-md');
      expect(divElem).toHaveClass('border');
      expect(divElem).toHaveClass('border-gray-100');
      expect(divElem).toHaveClass('bg-base-100');
      expect(divElem).toHaveClass('shadow-xl');
      expect(divElem).toHaveClass('custom-class');
    }
  });

  // Test 4: It merges the provided innerClassName prop with its default classes for the inner div
  it('merges provided innerClassName with default classes of inner div', () => {
    const { container } = render(<NodeCard innerClassName='inner-custom-class'>Test</NodeCard>);
    const innerDivElem = container.firstChild?.firstChild;

    if (innerDivElem) {
      // check if the inner div of the rendered component has both the default and the provided class names
      expect(innerDivElem).toHaveClass('card-body');
      expect(innerDivElem).toHaveClass('gap-0');
      expect(innerDivElem).toHaveClass('p-0');
      expect(innerDivElem).toHaveClass('inner-custom-class');
    }
  });
});
