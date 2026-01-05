import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useBoolean } from './use-boolean';

describe('useBoolean', () => {
  it('should return initial value as false by default', () => {
    const { result } = renderHook(() => useBoolean());
    expect(result.current[0]).toBe(false);
  });

  it('should return initial value when provided', () => {
    const { result } = renderHook(() => useBoolean(true));
    expect(result.current[0]).toBe(true);
  });

  it('should set value to true with setTrue', () => {
    const { result } = renderHook(() => useBoolean(false));
    act(() => {
      result.current[1].setTrue();
    });
    expect(result.current[0]).toBe(true);
  });

  it('should set value to false with setFalse', () => {
    const { result } = renderHook(() => useBoolean(true));
    act(() => {
      result.current[1].setFalse();
    });
    expect(result.current[0]).toBe(false);
  });

  it('should toggle value with toggle', () => {
    const { result } = renderHook(() => useBoolean(false));
    act(() => {
      result.current[1].toggle();
    });
    expect(result.current[0]).toBe(true);
    act(() => {
      result.current[1].toggle();
    });
    expect(result.current[0]).toBe(false);
  });

  it('should set value directly with setValue', () => {
    const { result } = renderHook(() => useBoolean(false));
    act(() => {
      result.current[1].setValue(true);
    });
    expect(result.current[0]).toBe(true);
    act(() => {
      result.current[1].setValue(false);
    });
    expect(result.current[0]).toBe(false);
  });
});
