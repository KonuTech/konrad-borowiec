import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { TECH_BY_ID } from '@/data/technologies';
import { TECH_EXPERIENCE, MAX_EXPERIENCE_YEARS } from '@/data/experience';

type ExperienceChartProps = {
  /** Selected technology ids (shared filter state). */
  selected: string[];
  /** Toggle a technology in/out of the filter. */
  onToggle: (id: string) => void;
};

// Round the axis up to a clean even maximum so ticks land on 0, 2, 4, … evenly
// (avoids the max value crowding the last even tick at the right edge).
const AXIS_MAX = Math.ceil(MAX_EXPERIENCE_YEARS / 2) * 2;
const axisTicks = Array.from({ length: AXIS_MAX / 2 + 1 }, (_, i) => i * 2);

const ExperienceChart: FC<ExperienceChartProps> = ({ selected, onToggle }) => {
  const { t } = useTranslation();

  return (
    <div>
      <h3 className="font-nunito mb-4 text-2xl font-bold text-portfolio-primary dark:text-portfolio-lighter md:mb-3">
        {t('about.experienceTitle')}
      </h3>

      {/* Chart is always LTR so bars grow left→right consistently. */}
      <div dir="ltr">
        {/* Axis tick labels */}
        <div className="mb-1 grid grid-cols-[11rem_1fr_2.5rem] items-end gap-2">
          <span />
          <div className="relative h-4 text-[10px] text-portfolio-muted dark:text-portfolio-lighter/60">
            {axisTicks.map((tick, i) => {
              const isFirst = i === 0;
              const isLast = i === axisTicks.length - 1;
              return (
                <span
                  key={tick}
                  className="absolute"
                  style={{
                    left: `${(tick / AXIS_MAX) * 100}%`,
                    transform: isFirst
                      ? 'translateX(0)'
                      : isLast
                        ? 'translateX(-100%)'
                        : 'translateX(-50%)',
                  }}
                >
                  {tick}
                </span>
              );
            })}
          </div>
          <span />
        </div>

        {/* Rows */}
        <div className="exp-scroll max-h-[26rem] space-y-1 overflow-y-auto pr-1">
          {TECH_EXPERIENCE.map(({ id, years }) => {
            const label = TECH_BY_ID.get(id)?.label ?? id;
            const active = selected.includes(id);
            const pct = (years / AXIS_MAX) * 100;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onToggle(id)}
                aria-pressed={active}
                title={`${label} — ${years} ${t('about.yearsShort')}`}
                className={`grid w-full grid-cols-[11rem_1fr_2.5rem] items-center gap-2 rounded-md px-1 py-1 transition-colors ${
                  active
                    ? 'bg-portfolio-primary/10'
                    : 'hover:bg-portfolio-lightest dark:hover:bg-portfolio-darker/60'
                }`}
              >
                <span
                  className={`pr-1 text-left text-xs leading-tight ${
                    active
                      ? 'font-semibold text-portfolio-primary dark:text-portfolio-light'
                      : 'text-portfolio-text dark:text-portfolio-lighter'
                  }`}
                >
                  {label}
                </span>

                {/* Track */}
                <span className="relative block h-2.5 rounded-full bg-portfolio-lightest dark:bg-portfolio-darker">
                  <span
                    className="absolute left-0 top-0 block h-full rounded-full bg-gradient-to-r from-portfolio-primary to-portfolio-accent transition-[width] duration-500 ease-out"
                    style={{ width: `${pct}%` }}
                  />
                </span>

                <span className="whitespace-nowrap text-right text-xs font-medium text-portfolio-text dark:text-portfolio-lighter">
                  {years} {t('about.yearsShort')}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExperienceChart;
