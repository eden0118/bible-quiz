import { GlassCard } from '../components/GlassCard';
import { BibleCard } from '../database';
import { FaExternalLinkSquareAlt } from 'react-icons/fa';

interface GameScreenProps {
  currentCard: BibleCard;
  currentCardIndex: number;
  totalCards: number;
  score: number;
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
  answered,
  selectedAnswer,
  translations: t,
  onAnswer,
  onNextCard,
  onBack,
}: GameScreenProps) => {
  const cardContent = currentCard.content;
  const progressPercent = ((currentCardIndex + 1) / totalCards) * 100;

  return (
    <div className="fle mx-auto max-w-6xl flex-1 flex-col items-center justify-center space-y-5 p-6 sm:space-y-8 lg:p-8">
      {/* Header */}
      <div className="mb-4 w-full max-w-full p-2 sm:mb-6 sm:max-w-2xl lg:mb-8">
        <div className="flex items-center justify-between gap-4 pb-2 sm:flex-row sm:gap-8">
          {/* progress */}
          <div className="flex flex-col items-center justify-center gap-1">
            <span className="text-[10px] font-black tracking-[0.2em] text-neutral-400 uppercase">
              {t.game.progress}
            </span>
            <span className="text-2xl font-black text-white">
              {currentCardIndex + 1}/{totalCards}
            </span>
          </div>

          {/* score */}
          <div className="flex flex-col items-center justify-center gap-1">
            <span className="text-[10px] font-black tracking-[0.2em] text-neutral-400 uppercase">
              {t.game.score}
            </span>
            <span className="text-2xl font-black text-orange-500">{score}</span>
          </div>

          <div className="flex items-center gap-3">
            <p className="text-xs font-black tracking-[0.2em] text-neutral-400 uppercase">
              {t.game.testaments[currentCard.testament]}
            </p>
            <button onClick={onBack} className="small-btn">
              <FaExternalLinkSquareAlt size={14} />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1 w-full overflow-hidden rounded-full bg-neutral-700 sm:h-2">
          <div
            className="from-primary to-accent h-full bg-linear-to-r transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Card */}
      <GlassCard className="psm:max-w-xl mx-auto flex w-full flex-col gap-6 space-y-5 overflow-hidden px-6 py-8 sm:space-y-8 lg:max-w-lg">
        {/* Verse */}
        <p className="text-accent border-accent border-l-4 pl-3 text-sm leading-relaxed italic sm:pl-4 lg:pl-6 lg:text-lg lg:leading-relaxed">
          {cardContent.verse}
        </p>

        {/* Question */}
        <h3 className="text-foreground text-center text-lg font-medium lg:text-xl">
          {cardContent.question}
        </h3>

        {/* Options */}
        <div className="grid grid-cols-2 gap-2 sm:gap-4">
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
                className={`flex flex-col items-center overflow-hidden rounded-lg border transition-all duration-300 lg:rounded-xl ${
                  showResult
                    ? isCorrect
                      ? 'border-success bg-success/20 text-success'
                      : 'border-error bg-error/20 text-error'
                    : showCorrect
                      ? 'border-success bg-success/20 text-success'
                      : `${
                          answered
                            ? 'cursor-not-allowed border-neutral-600 bg-neutral-800/30'
                            : 'cursor-pointer border-neutral-700 bg-neutral-800/30 hover:bg-neutral-700/50 active:scale-95'
                        }`
                }`}
              >
                <span className="w-full bg-neutral-100/10 p-1 text-xs font-bold drop-shadow-2xl lg:text-base">
                  {String.fromCharCode(65 + idx)}.
                </span>
                <span className="flex min-h-16 items-center justify-center p-2 text-sm lg:text-base">
                  {option}
                </span>
              </button>
            );
          })}
        </div>
      </GlassCard>

      {/* Action Button */}
      {answered && (
        <div className="w-full px-1">
          <button onClick={onNextCard} className="button secondary-btn">
            {currentCardIndex < totalCards - 1 ? '下一題' : '完成'}
          </button>
        </div>
      )}
    </div>
  );
};
