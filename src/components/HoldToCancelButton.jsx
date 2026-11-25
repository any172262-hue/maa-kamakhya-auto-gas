import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Check } from 'lucide-react';

const HOLD_DURATION_MS = 2000;

export default function HoldToCancelButton({
  onCancel,
  disabled = false,
  className = ''
}) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('idle'); // 'idle' | 'holding' | 'completed'

  const startTimeRef = useRef(0);
  const animationFrameRef = useRef(null);
  const isHoldingRef = useRef(false);
  const isCompletedRef = useRef(false);
  const isMountedRef = useRef(true);
  const onCancelRef = useRef(onCancel);

  // Keep latest onCancel callback reference
  useEffect(() => {
    onCancelRef.current = onCancel;
  }, [onCancel]);

  // Clean up animation frame and listeners on unmount
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      isHoldingRef.current = false;
    };
  }, []);

  const resetHold = useCallback(() => {
    if (isCompletedRef.current) return;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    isHoldingRef.current = false;
    if (isMountedRef.current) {
      setProgress(0);
      setStatus('idle');
    }
  }, []);

  const step = useCallback((currentTime) => {
    if (!isMountedRef.current || !isHoldingRef.current || isCompletedRef.current) return;

    const elapsed = currentTime - startTimeRef.current;
    const currentProgress = Math.min(100, (elapsed / HOLD_DURATION_MS) * 100);
    setProgress(currentProgress);

    if (elapsed >= HOLD_DURATION_MS) {
      isCompletedRef.current = true;
      isHoldingRef.current = false;
      animationFrameRef.current = null;
      setProgress(100);
      setStatus('completed');

      if (onCancelRef.current) {
        onCancelRef.current();
      }
    } else {
      animationFrameRef.current = requestAnimationFrame(step);
    }
  }, []);

  const startHold = useCallback(() => {
    if (disabled || isCompletedRef.current || isHoldingRef.current) return;

    isHoldingRef.current = true;
    startTimeRef.current = performance.now();
    setProgress(0);
    setStatus('holding');
    animationFrameRef.current = requestAnimationFrame(step);
  }, [disabled, step]);

  // Ensure release outside element also cancels pending hold cleanly
  useEffect(() => {
    const handleGlobalRelease = () => {
      if (isHoldingRef.current && !isCompletedRef.current) {
        resetHold();
      }
    };
    window.addEventListener('pointerup', handleGlobalRelease);
    window.addEventListener('pointercancel', handleGlobalRelease);
    return () => {
      window.removeEventListener('pointerup', handleGlobalRelease);
      window.removeEventListener('pointercancel', handleGlobalRelease);
    };
  }, [resetHold]);

  // Pointer event handlers (Mouse & Touchscreen)
  const handlePointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return; // Only primary pointer button
    startHold();
  };

  const handlePointerUp = () => {
    resetHold();
  };

  const handlePointerLeave = () => {
    resetHold();
  };

  const handlePointerCancel = () => {
    resetHold();
  };

  // Keyboard accessibility: hold Space or Enter key for 2 seconds
  const handleKeyDown = (e) => {
    if (e.key === ' ' || e.key === 'Spacebar' || e.key === 'Enter') {
      e.preventDefault();
      if (!e.repeat) {
        startHold();
      }
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === ' ' || e.key === 'Spacebar' || e.key === 'Enter') {
      e.preventDefault();
      resetHold();
    }
  };

  const handleBlur = () => {
    resetHold();
  };

  const getButtonText = () => {
    if (status === 'completed') return 'Cancelled';
    if (status === 'holding') return 'Hold to cancel...';
    return 'Cancel';
  };

  return (
    <div className={`hold-to-cancel-container ${className}`}>
      <button
        type="button"
        disabled={disabled || status === 'completed'}
        className={`hold-to-cancel-btn ${status === 'holding' ? 'is-holding' : ''} ${status === 'completed' ? 'is-completed' : ''}`}
        aria-label="Cancel. Press and hold for 2 seconds to cancel enquiry review."
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onPointerCancel={handlePointerCancel}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onBlur={handleBlur}
        onContextMenu={(e) => e.preventDefault()}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {/* Visual Progress Fill (0% to 100%) */}
        <span
          className="hold-progress-fill"
          style={{ width: `${progress}%` }}
          aria-hidden="true"
        />

        {/* Foreground Content */}
        <span className="hold-btn-content">
          {status === 'completed' ? (
            <Check size={15} className="hold-btn-icon" />
          ) : (
            <X size={15} className="hold-btn-icon" />
          )}
          <span className="hold-btn-text">{getButtonText()}</span>
        </span>
      </button>
    </div>
  );
}
