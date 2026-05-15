import {SectionFade} from './SectionFade';

type Props = {
  title?: string;
  body?: string;
};

const DEFAULT_TITLE = "If it isn't worth it in 30 days, get your money back.";
const DEFAULT_BODY =
  "One sentence in an email. No screenshots, no exit interview. We'd rather refund 10% of buyers than keep one frustrated. Most days, that math works in our favour.";

export function GuaranteeBlock({title = DEFAULT_TITLE, body = DEFAULT_BODY}: Props) {
  return (
    <section className="guarantee">
      <div className="guarantee-inner">
        <SectionFade as="div">
          <span className="label section-eyebrow">The guarantee</span>
          <h2>{title}</h2>
          <p>{body}</p>
          <span className="badge">30-day money-back guarantee</span>
        </SectionFade>
      </div>
    </section>
  );
}
