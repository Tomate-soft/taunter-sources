import styles from './period_details_form.module.css';

export const PeriodSkeleton = () => {
  return (
    <div className={styles.skeletonBlock}>
      <div className={styles.skeletonBadge}></div>
      <div className={styles.skeletonLabel}></div>
      <div className={styles.skeletonInput}></div>
      <div className={styles.skeletonLabel}></div>
      <div className={styles.skeletonInput}></div>
    </div>
  );
};

export const PeriodSkeletonGrid = () => {
  return (
    <div className={styles.periodsContainer}>
      {[...Array(24)].map((_, i) => (
        <PeriodSkeleton key={i} />
      ))}
    </div>
  );
};
