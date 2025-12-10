import React from 'react';
import { GlassCard } from './GlassCard';
import { Button } from './Button';
import { BibleCard } from '../data';

interface GameScreenProps {
  currentCard: BibleCard;
  currentCardIndex: number;
  totalCards: number;
  score: number;
  language: 'zh' | 'en';
  answered: boolean;
  selectedAnswer: number | null;
  translations: any;
  onAnswer: (index: number) => void;
  onNextCard: () => void;
  onBack: () => void;
}

export const GameScreen = ({
  currentCard,
  currentCardIndex,
  totalCards,
  score,
  language,
  answered,
  selectedAnswer,
  translations: t,
  onAnswer,
  onNextCard,
  onBack,
}: GameScreenProps) => {
  const cardContent = currentCard.content[language];
  const progressPercent = ((currentCardIndex + 1) / totalCards) * 100;

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-4 w-full max-w-full sm:mb-6 sm:max-w-2xl lg:mb-8">
        <div className="mb-4 flex items-center justify-between gap-4 sm:flex-row sm:gap-8 lg:mb-6">
          <div className="flex flex-col gap-1">
            <p className="text-[10px] font-black tracking-[0.2em] text-neutral-400 uppercase">
              {t.game.progress}
            </p>
            <p className="text-2xl font-black text-white">
              {currentCardIndex + 1}/{totalCards}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-[10px] font-black tracking-[0.2em] text-neutral-400 uppercase">
              {t.game.score}
            </p>
            <p className="text-2xl font-black text-orange-500">{score}</p>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-[10px] font-black tracking-[0.2em] text-neutral-400 uppercase">
              {t.game.testaments[currentCard.testament]}
            </p>
            <Button onClick={onBack} variant="secondary" className="text-xs sm:text-sm">
              {language === 'zh' ? '返回' : 'Back'}
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1 w-full overflow-hidden rounded-full bg-neutral-700 sm:h-2">
          <div
            className="h-full bg-linear-to-r from-orange-400 to-red-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Card */}
      <GlassCard className="mb-4 w-full max-w-full space-y-3 overflow-hidden p-4 sm:mb-6 sm:max-w-2xl sm:space-y-4 sm:p-8 lg:mb-8 lg:space-y-6 lg:p-12">
        {/* Decorative gradient line */}
        <div className="h-1 rounded-full bg-linear-to-r from-orange-500 via-red-500 to-purple-600"></div>

        {/* Verse */}
        <p className="border-l-4 border-orange-500 pl-3 text-xs leading-relaxed text-neutral-300 italic sm:pl-4 sm:text-sm lg:pl-6 lg:text-lg lg:leading-relaxed">
          "{cardContent.verse}"
        </p>

        {/* Question */}
        <h3 className="text-center text-lg font-bold text-white sm:text-xl lg:text-3xl">
          {cardContent.question}
        </h3>

        {/* Options */}
        <div className="grid grid-cols-1 gap-2 sm:gap-3 lg:gap-4">
          {cardContent.options.map((option, idx) => {
            const isCorrect = idx === currentCard.answer;
            const isSelected = idx === selectedAnswer;
            const showResult = answered && isSelected;
            const showCorrect = answered && isCorrect && !isSelected;

            return (
              <button
                key={idx}
                onClick={() => onAnswer(idx)}
                disabled={answered}
                className={`rounded-lg border-2 p-3 text-left text-xs font-semibold transition-all duration-300 sm:rounded-lg sm:p-4 sm:text-sm lg:rounded-2xl lg:p-6 lg:text-lg ${
                  showResult
                    ? isCorrect
                      ? 'border-green-500 bg-green-500/20 text-green-300'
                      : 'border-red-500 bg-red-500/20 text-red-300'
                    : showCorrect
                      ? 'border-green-500 bg-green-500/20 text-green-300'
                      : `${
                          answered
                            ? 'cursor-not-allowed border-neutral-600 bg-neutral-800/30'
                            : 'cursor-pointer border-neutral-700 bg-neutral-800/30 hover:bg-neutral-700/50 active:scale-95'
                        }`
                }`}
              >
                <span className="mr-3 font-bold">{String.fromCharCode(65 + idx)}.</span>
                {option}
              </button>
            );
          })}
        </div>

        {/* Answer Explanation */}
        {answered && (
          <div className="rounded-lg border-2 border-blue-500/50 bg-blue-500/20 p-3 sm:rounded-xl sm:p-4 lg:mt-8 lg:rounded-2xl lg:p-6">
            <p className="mb-1 text-xs font-bold text-blue-300 sm:mb-2 sm:text-sm lg:text-base">
              {t.game.answer}
            </p>
            <p className="text-xs text-blue-300 sm:text-sm lg:text-base">
              {cardContent.options[currentCard.answer]}
            </p>
            <p className="mt-1 text-xs text-blue-400 sm:mt-2 sm:text-xs lg:text-sm">
              {cardContent.reference}
            </p>
          </div>
        )}
      </GlassCard>

      {/* Action Button */}
      {answered && (
        <Button
          onClick={onNextCard}
          className="px-6 py-2 text-xs sm:px-8 sm:py-4 sm:text-base lg:px-12 lg:py-5 lg:text-xl"
        >
          {currentCardIndex < totalCards - 1
            ? language === 'zh'
              ? '下一題'
              : 'Next'
            : language === 'zh'
              ? '完成'
              : 'Finish'}
        </Button>
      )}
    </div>
  );
};
