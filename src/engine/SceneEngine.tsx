import { Children, useState, useCallback, useEffect, useRef, cloneElement, type ReactNode, type ReactElement } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSceneNavigation } from './useSceneNavigation';
import { getTransitionVariants, transitionConfig } from './transitions';
import { useLanguage } from '../i18n/LanguageContext';
import ProgressDots from '../components/scene/ProgressDots';

interface SceneEngineProps {
  children: ReactNode;
}

function extractScenes(children: ReactNode): ReactElement[] {
  const scenes: ReactElement[] = [];

  Children.forEach(children, (child) => {
    if (
      child &&
      typeof child === 'object' &&
      'type' in child &&
      typeof child.type === 'function' &&
      (child.type as { displayName?: string }).displayName === 'Scene'
    ) {
      scenes.push(child as ReactElement);
    }
  });

  // Fallback: search one level deep if no direct Scene children found
  if (scenes.length === 0) {
    Children.forEach(children, (child) => {
      if (child && typeof child === 'object' && 'props' in child) {
        const nested = (child as ReactElement).props?.children;
        if (nested) {
          Children.forEach(nested, (inner) => {
            if (
              inner &&
              typeof inner === 'object' &&
              'type' in inner &&
              typeof inner.type === 'function' &&
              (inner.type as { displayName?: string }).displayName === 'Scene'
            ) {
              scenes.push(inner as ReactElement);
            }
          });
        }
      }
    });
  }

  if (scenes.length === 0) {
    throw new Error(
      'SceneEngine: No <Scene> components found. Chapter MDX must contain <Scene> components as direct children.',
    );
  }

  return scenes;
}

function SceneEngineInner({ children }: SceneEngineProps) {
  const { t } = useLanguage();
  const scenes = extractScenes(children);
  const [completedScenes, setCompletedScenes] = useState<Set<number>>(new Set());
  const [scenesFinished, setScenesFinished] = useState(false);
  const hasDispatchedRef = useRef(false);

  const isLastScene = (index: number) => index >= scenes.length - 1;

  const isInteractive = (index: number) => {
    const scene = scenes[index] as ReactElement<{ interactive?: boolean }>;
    return scene?.props?.interactive === true;
  };

  const {
    currentIndex,
    direction,
    canAdvance,
    visitedMax,
    goNext,
    goPrev,
    goTo,
  } = useSceneNavigation({
    totalScenes: scenes.length,
    isInteractive: isInteractive(0),
    isCompleted: completedScenes.has(0),
  });

  // Recalculate for current index
  const currentIsInteractive = isInteractive(currentIndex);
  const currentIsCompleted = completedScenes.has(currentIndex);
  const currentCanAdvance = !currentIsInteractive || currentIsCompleted;

  // Detect when we reach the last scene and it's ready
  useEffect(() => {
    if (isLastScene(currentIndex) && currentCanAdvance && !hasDispatchedRef.current) {
      hasDispatchedRef.current = true;
      setScenesFinished(true);
      window.dispatchEvent(new CustomEvent('claude101-scenes-complete'));
    }
  }, [currentIndex, currentCanAdvance]);

  const handleComplete = useCallback(() => {
    setCompletedScenes((prev) => new Set(prev).add(currentIndex));
  }, [currentIndex]);

  const handleScrollDown = useCallback(() => {
    const article = document.querySelector('.chapter-article');
    if (article) {
      article.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      // Don't advance if clicking on interactive elements
      const target = e.target as HTMLElement;
      if (
        target.closest('button') ||
        target.closest('input') ||
        target.closest('[data-interactive]') ||
        target.closest('.deep-dive') ||
        target.closest('.scroll-indicator')
      ) {
        return;
      }
      if (scenesFinished) {
        // On last scene, click scrolls to article
        handleScrollDown();
        return;
      }
      if (currentCanAdvance) {
        goNext();
      }
    },
    [currentCanAdvance, goNext, scenesFinished, handleScrollDown],
  );

  const variants = getTransitionVariants(direction);
  const currentScene = scenes[currentIndex];

  // Clone scene with onComplete prop if interactive (Scene provides it via Context)
  const sceneWithProps = currentIsInteractive
    ? cloneElement(currentScene as ReactElement<Record<string, unknown>>, { onComplete: handleComplete })
    : currentScene;

  return (
    <div className="scene-engine" onClick={handleClick}>
      <div className="scene-viewport">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="scene-wrapper"
            initial={variants.initial}
            animate={variants.animate}
            exit={variants.exit}
            transition={transitionConfig}
          >
            {sceneWithProps}
          </motion.div>
        </AnimatePresence>
      </div>

      {currentIsInteractive && currentIsCompleted && !isLastScene(currentIndex) && (
        <button className="scene-continue-btn" onClick={goNext}>
          {t('继续 →', 'Continue →')}
        </button>
      )}

      {currentIsInteractive && !currentIsCompleted && (
        <div className="scene-interact-hint" aria-live="polite">
          {t('请完成上方的互动体验', 'Please complete the interactive experience above')}
        </div>
      )}

      {scenesFinished && (
        <button className="scroll-indicator" onClick={handleScrollDown}>
          <span>{t('向下滚动，深入了解', 'Scroll down to learn more')}</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 4v12M5 11l5 5 5-5" />
          </svg>
        </button>
      )}

      <ProgressDots
        current={currentIndex}
        total={scenes.length}
        visitedMax={visitedMax}
        onDotClick={goTo}
      />
    </div>
  );
}

export default function SceneEngine({ children }: SceneEngineProps) {
  return <SceneEngineInner>{children}</SceneEngineInner>;
}
