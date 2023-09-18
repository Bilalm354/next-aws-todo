import { getNewId } from './TodoList';
import { describe, expect, it } from '@jest/globals';

describe('getNewId', () => {
  it('returns 1 when the list is empty', () => {
    expect(getNewId([])).toBe(1);
  });

  it('returns one more than the highest id in the list', () => {
    const todos = [
      { id: 19, text: 'Pay electric bill', isChecked: false },
      { id: 8, text: 'Walk the dog', isChecked: false },
    ];
    expect(getNewId(todos)).toBe(20);
  });
});