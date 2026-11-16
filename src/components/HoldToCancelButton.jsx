import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const HOLD_DURATION_MS = 1500;

export default function HoldToCancelButton({
  onCancel,
  disabled = false,
  className = ''
}) {
  const { t } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('idle'); // 'idle' | 'holding' | 'completed'

  const startTimeRef = useRef(0);
  const animationFrameRef = useRef(null);
  const isHoldingRef = useRef(false);
  const isCompletedRef = useRef(false);
  const onCancelRef = useRef(onCancel);

  // Keep latest onCancel callback reference
  useEffect(() => {
    onCancelRef.current = onCancel;
  }, [onCancel]);

  // Clean up animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const resetHold = useCallback(() => {
    if (isCompletedRef.current) return;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    isHoldingRef.current = false;
    setProgress(0);
    setStatus('idle');
  }, []);

  const step = useCallback((currentTime) => {
    if (!isHoldingRef.current || isCompletedRef.current) return;

    const elapsed = currentTime - startTimeRef.current;
    const currentProgress = Math.min(100, (elapsed / HOLD_DURATION_MS) * 100);
    setProgress(currentProgress);

    if (elapsed >= HOLD_DURATION_MS) {
      isCompletedRef.current = true;
      isHoldingRef.current = false;
      setProgress(100);
      setStatus('completed');

      // Brief completion feedback before closing modal
      setTimeout(() => {
        if (onCancelRef.current) {
          onCancelRef.current();
        }
      }, 180);
    } else {
      animationFrameRef.current = requestAnimationFrame(step);
    }
  }, []);

  const startHold = useCallback(() => {
    if (disabled || isCompletedRef.current || isHoldingRef.current) return;

    isHoldingRef.current = true;
    startTimeRef.current = performance.now();
    setStatus('holding');
    animationFrameRef.current = requestAnimationFrame(step);
  }, [disabled, step]);

  // Pointer event handlers (Mouse & Touchscreen)
  const handlePointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return; // Only primary button
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

  // Keyboard accessibility: hold Space key for 1.5s
  const handleKeyDown = (e) => {
    if ((e.key === ' ' || e.key === 'Spacebar') && !e.repeat) {
      e.preventDefault();
      startHold();
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      resetHold();
    }
  };

  const handleBlur = () => {
    resetHold();
  };

  const getButtonText = () => {
    if (status === 'completed') return t('modal.cancelled', {}, 'Cancelled');
    if (status === 'holding') return t('modal.cancelling', {}, 'Cancelling...');
    return t('modal.holdToCancel', {}, 'Hold to Cancel');
  };

  return (
    <div className={`hold-to-cancel-container ${className}`}>
      <button
        type="button"
        disabled={disabled || status === 'completed'}
        className={`hold-to-cancel-btn ${status === 'holding' ? 'is-holding' : ''} ${status === 'completed' ? 'is-completed' : ''}`}
        aria-label={`${t('modal.holdToCancel', {}, 'Hold to Cancel')}. Press and hold for 1.5 seconds to cancel.`}
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
        onClick={(e) => e.preventDefault()}
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
            <Check size={15} className="hold-btn-icon text-success" />
          ) : (
            <X size={15} className="hold-btn-icon" />
          )}
          <span className="hold-btn-text">{getButtonText()}</span>
        </span>
      </button>

      <span className="hold-hint-text" aria-hidden="true">
        {t('modal.holdToCancel', {}, 'Hold to Cancel')} (1.5s)
      </span>
    </div>
  );
}
