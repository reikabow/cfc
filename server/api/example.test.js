/* This is an example of a test */

describe('addition', () => {
  it('should work with positive numbers', () => {
    expect(1 + 2).toBe(3);
  });
  it('should work with negative numbers', () => {
    expect(1 + -3).toBe(-2);
  });
  it('should be incorrect', () => {
    expect(1 + 1).toBe(2);
  });
});
