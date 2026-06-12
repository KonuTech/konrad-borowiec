import { FC, useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { TECH_BY_ID } from '@/data/technologies';
import { highlightTechnologies } from '@/lib/highlightTech';

import { timelineItems, type TimelineItem } from '@/data/roles';

// Sort items by date (most recent first). `originalIndex` is preserved so the
// i18n description key (timeline.items.N) always matches the entry it was
// authored for, regardless of how the date sort reorders the list.
type SortedTimelineItem = TimelineItem & { originalIndex: number };

const sortedTimelineItems: SortedTimelineItem[] = timelineItems
  .map((item, originalIndex) => ({ ...item, originalIndex }))
  .sort((a, b) => {
    const aYear = parseInt(a.period.split(' - ')[0].split('.')[1]);
    const bYear = parseInt(b.period.split(' - ')[0].split('.')[1]);
    if (aYear !== bYear) return bYear - aYear;

    const aMonth = parseInt(a.period.split(' - ')[0].split('.')[0]);
    const bMonth = parseInt(b.period.split(' - ')[0].split('.')[0]);
    return bMonth - aMonth;
  });

const TimelineItem: FC<{
  item: TimelineItem;
  isLast: boolean;
  isActive: boolean;
  onClick: () => void;
  index: number;
  selected: string[];
  onToggleTech: (id: string) => void;
}> = ({ item, isLast, isActive, onClick, index, selected, onToggleTech }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-stretch">
        <div className="relative mr-3 flex flex-col items-center self-stretch sm:mr-6">
          {/* Icon container */}
          <div
            className={`relative z-10 flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full sm:h-12 sm:w-12 ${
              item.type === 'work'
                ? 'bg-portfolio-primary text-white'
                : 'bg-portfolio-accent text-white dark:bg-portfolio-darker'
            }`}
            onClick={onClick}
          >
            {item.type === 'work' ? (
              <i className="fas fa-briefcase text-lg"></i>
            ) : (
              <i className="fas fa-graduation-cap text-lg"></i>
            )}
          </div>

          {/* Connecting line — grows to fill the full height of the entry
              (header + tags, and the description when expanded), so it always
              reaches the next entry regardless of card height. */}
          {!isLast && (
            <div className="mt-2 w-1 flex-1 rounded bg-portfolio-lighter dark:bg-[#4A90E2]" />
          )}
        </div>

        <div className={`relative flex-1 ${isLast ? '' : 'pb-8'}`}>
          {/* Title and organization card */}
          <div
            onClick={onClick}
            className={`flex w-full cursor-pointer flex-col rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg dark:bg-portfolio-darker sm:p-6 ${isActive ? 'border-l-4 border-portfolio-primary dark:border-portfolio-primary' : ''}`}
          >
            <div className="flex-grow">
              {/* Responsive layout for title, organization, and date */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h4 className="font-nunito text-lg font-bold text-portfolio-dark dark:text-portfolio-lighter">
                    {item.title}
                  </h4>
                  <h5 className="whitespace-pre-line text-sm text-portfolio-text dark:text-portfolio-lighter/70">
                    {item.organization}
                  </h5>
                  {/* Technology tags (row 3). Skill tags are clickable filters; others are plain. */}
                  {item.technologies.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {item.technologies.map((id) => {
                        const tech = TECH_BY_ID.get(id);
                        if (!tech) return null;
                        const active = selected.includes(id);
                        if (!tech.isSkill) {
                          return (
                            <span
                              key={id}
                              className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-portfolio-muted dark:bg-portfolio-darker/60 dark:text-portfolio-lighter/60"
                            >
                              {tech.label}
                            </span>
                          );
                        }
                        return (
                          <button
                            key={id}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleTech(id);
                            }}
                            aria-pressed={active}
                            title={`Filter by ${tech.label}`}
                            className={`rounded-full px-2 py-0.5 text-xs font-medium transition-colors ${
                              active
                                ? 'bg-portfolio-primary text-white'
                                : 'bg-portfolio-lightest text-portfolio-accent hover:bg-portfolio-primary/10 dark:bg-portfolio-darker dark:text-portfolio-lighter dark:hover:bg-portfolio-primary/20'
                            }`}
                          >
                            {tech.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                  {/* Date displayed under organization on mobile */}
                  <div className="mt-1 block text-sm font-medium text-portfolio-text dark:text-portfolio-lighter sm:hidden">
                    {item.period}
                  </div>
                </div>
                {/* Date displayed on the right side on larger screens */}
                <div className="hidden whitespace-nowrap text-right text-sm font-medium text-portfolio-text dark:text-portfolio-lighter sm:block">
                  {item.period}
                </div>
              </div>
            </div>
          </div>

          {/* Description (expands/collapses) */}
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div
                  className={`mt-1 rounded-b-lg bg-white px-2 pb-2 pt-4 shadow-md dark:bg-portfolio-darker sm:px-4 timeline-description-id-${index}`}
                >
                  <p className="whitespace-pre-line text-justify text-sm text-portfolio-text dark:text-portfolio-lighter/90">
                    {highlightTechnologies(item.description)}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

type TimelineProps = {
  /** Selected technology ids; empty array means "show all". */
  selected?: string[];
  onToggleTech?: (id: string) => void;
};

const Timeline: FC<TimelineProps> = ({ selected = [], onToggleTech = () => {} }) => {
  const { t } = useTranslation();
  // Multiple entries can be expanded at once; the user collapses each one
  // independently. The first entry starts expanded.
  const [expandedIndexes, setExpandedIndexes] = useState<Set<number>>(() => new Set([0]));

  const toggleItem = (index: number) => {
    setExpandedIndexes((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  // Keep each item's stable index (into sortedTimelineItems) so the i18n
  // description key and active state stay correct after filtering.
  const visibleItems = useMemo(
    () =>
      sortedTimelineItems
        .map((item, index) => ({ item, index }))
        .filter(
          ({ item }) =>
            selected.length === 0 || item.technologies.some((id) => selected.includes(id)),
        ),
    [selected],
  );

  // When the filter changes, expand the first visible role so the panel isn't
  // left showing a now-hidden item's (collapsed) state.
  useEffect(() => {
    if (selected.length === 0) {
      setExpandedIndexes(new Set([0]));
    } else if (visibleItems.length > 0) {
      setExpandedIndexes(new Set([visibleItems[0].index]));
    } else {
      setExpandedIndexes(new Set());
    }
  }, [selected.length, visibleItems]);

  if (visibleItems.length === 0) {
    return (
      <div className="px-4 py-8 text-center text-sm text-portfolio-muted dark:text-portfolio-lighter/70">
        {t('about.noRolesMatch')}
      </div>
    );
  }

  return (
    <div className="px-0 sm:px-4">
      <AnimatePresence>
        {visibleItems.map(({ item, index }, visiblePos) => (
          <TimelineItem
            key={index}
            item={{
              ...item,
              description: t(`timeline.items.${item.originalIndex}`) || item.description,
            }}
            isLast={visiblePos === visibleItems.length - 1}
            isActive={expandedIndexes.has(index)}
            onClick={() => toggleItem(index)}
            index={index}
            selected={selected}
            onToggleTech={onToggleTech}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Timeline;
