type RatingStarsProps = {
  rating: number;        // 0–5, can be fractional
  size?: 's' | 'l' | 'xl';
  label?: string;
};

/** Five-star display. Half-stars rendered via gradient mask. */
export function RatingStars({rating, size = 's', label}: RatingStarsProps) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <span className={`rating-stars ${size}`} aria-label={label ?? `Rated ${rating} out of 5 stars`}>
      {stars.map((n) => {
        const fill = Math.min(1, Math.max(0, rating - (n - 1)));
        return <Star key={n} fill={fill} />;
      })}
    </span>
  );
}

function Star({fill}: {fill: number}) {
  const id = `s-${Math.random().toString(36).slice(2, 9)}`;
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
          <stop offset={`${fill * 100}%`} stopColor="currentColor" />
          <stop offset={`${fill * 100}%`} stopColor="rgba(0,0,0,0.12)" />
        </linearGradient>
      </defs>
      <path
        d="M12 2.5 14.8 8.9 22 9.7l-5.5 4.7 1.7 7L12 17.8 5.8 21.4l1.7-7L2 9.7l7.2-.8z"
        fill={`url(#${id})`}
      />
    </svg>
  );
}
