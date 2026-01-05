import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useMount } from './use-mount';

describe('useMount', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call callback on mount', () => {
    const callback = vi.fn();
    renderHook(() => useMount(callback));
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should call callback only once on mount', () => {
    const callback = vi.fn();
    const { rerender } = renderHook(() => useMount(callback));
    rerender();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should not call callback on unmount', () => {
    const callback = vi.fn();
    const { unmount } = renderHook(() => useMount(callback));
    unmount();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

