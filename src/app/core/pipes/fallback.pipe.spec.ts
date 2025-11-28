import { FallbackPipe } from './fallback.pipe';

describe('FallbackPipe', () => {
  it('create an instance', () => {
    const pipe = new FallbackPipe();
    expect(pipe).toBeTruthy();
  });
});
