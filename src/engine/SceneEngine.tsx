import { Children, useState, useCallback, cloneElement, type ReactNode, type ReactElement } from 'react';
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

  const handleComplete = useCallback(() => {
    setCompletedScenes((prev) => new Set(prev).add(currentIndex));
  }, [currentIndex]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      // Don't advance if clicking on interactive elements
      const target = e.target as HTMLElement;
      if (
        target.closest('button') ||
        target.closest('input') ||
        target.closest('[data-interactive]') ||
        target.closest('.deep-dive')
      ) {
        return;
      }
      if (currentCanAdvance) {
        goNext();
      }
    },
    [currentCanAdvance, goNext],
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

      {currentIsInteractive && currentIsCompleted && (
        <button className="scene-continue-btn" onClick={goNext}>
          {t('继续 →', 'Continue →')}
        </button>
      )}

      {currentIsInteractive && !currentIsCompleted && (
        <div className="scene-interact-hint" aria-live="polite">
          {t('请完成上方的互动体验', 'Please complete the interactive experience above')}
        </div>
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
