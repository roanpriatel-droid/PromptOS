import type {CartApiQueryFragment} from 'storefrontapi.generated';
import type {CartLayout} from '~/components/CartMain';
import {CartForm, Money, type OptimisticCart} from '@shopify/hydrogen';
import {useEffect, useId, useRef, useState} from 'react';
import {useFetcher} from 'react-router';

type CartSummaryProps = {
  cart: OptimisticCart<CartApiQueryFragment | null>;
  layout: CartLayout;
};

export function CartSummary({cart, layout}: CartSummaryProps) {
  const className =
    layout === 'page' ? 'cart-summary-page' : 'cart-summary-aside';
  const summaryId = useId();
  const discountsHeadingId = useId();
  const discountCodeInputId = useId();
  const giftCardHeadingId = useId();
  const giftCardInputId = useId();

  const subtotal = cart?.cost?.subtotalAmount;
  const total = cart?.cost?.totalAmount ?? subtotal;
  const totalAmount = total?.amount ? parseFloat(total.amount) : 0;
  const totalDisplay = total ? (
    <Money data={total} />
  ) : (
    <span>-</span>
  );

  return (
    <div aria-labelledby={summaryId} className={`${className} cart-summary-v34`}>
      <h4 id={summaryId} className="sr-only">
        Totals
      </h4>
      <div className="cart-summary-divider" aria-hidden />
      <dl role="group" className="cart-summary-row cart-subtotal">
        <dt>Subtotal</dt>
        <dd>
          {subtotal?.amount ? <Money data={subtotal} /> : '-'}
        </dd>
      </dl>
      <dl role="group" className="cart-summary-row cart-summary-row-meta">
        <dt>Shipping</dt>
        <dd className="cart-summary-meta-val">Free · Digital delivery</dd>
      </dl>
      <dl role="group" className="cart-summary-row cart-summary-row-total">
        <dt>Total</dt>
        <dd className="cart-summary-total-val">{totalDisplay}</dd>
      </dl>

      <details className="cart-summary-codes">
        <summary>Have a discount code?</summary>
        <div className="cart-summary-codes-body">
          <CartDiscounts
            discountCodes={cart?.discountCodes}
            discountsHeadingId={discountsHeadingId}
            discountCodeInputId={discountCodeInputId}
          />
          <CartGiftCard
            giftCardCodes={cart?.appliedGiftCards}
            giftCardHeadingId={giftCardHeadingId}
            giftCardInputId={giftCardInputId}
          />
        </div>
      </details>

      <CartCheckoutActions
        checkoutUrl={cart?.checkoutUrl}
        totalAmount={totalAmount}
        totalCurrency={total?.currencyCode}
      />

      <ul className="cart-trust-list" aria-label="Trust signals">
        <li>
          <span className="cart-trust-icon" aria-hidden>🔒</span>
          Secure checkout · Shopify Payments
        </li>
        <li>
          <span className="cart-trust-icon" aria-hidden>📥</span>
          Instant download after purchase
        </li>
        <li>
          <span className="cart-trust-icon" aria-hidden>↩</span>
          30-day satisfaction guarantee
        </li>
      </ul>
    </div>
  );
}

function CartCheckoutActions({
  checkoutUrl,
  totalAmount,
  totalCurrency,
}: {
  checkoutUrl?: string;
  totalAmount: number;
  totalCurrency?: string;
}) {
  if (!checkoutUrl) return null;
  const formatted =
    totalAmount > 0
      ? new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: totalCurrency || 'USD',
          maximumFractionDigits: 2,
        }).format(totalAmount)
      : null;
  return (
    <a href={checkoutUrl} target="_self" className="cart-checkout-btn">
      <span className="cart-checkout-label">Checkout</span>
      {formatted && (
        <>
          <span className="cart-checkout-dot" aria-hidden>·</span>
          <span className="cart-checkout-price">{formatted}</span>
        </>
      )}
    </a>
  );
}

function CartDiscounts({
  discountCodes,
  discountsHeadingId,
  discountCodeInputId,
}: {
  discountCodes?: CartApiQueryFragment['discountCodes'];
  discountsHeadingId: string;
  discountCodeInputId: string;
}) {
  const codes: string[] =
    discountCodes
      ?.filter((discount) => discount.applicable)
      ?.map(({code}) => code) || [];

  return (
    <section aria-label="Discounts" className="cart-codes-section">
      {/* Existing discount, display it with a remove option */}
      <dl hidden={!codes.length} className="cart-codes-applied">
        <dt id={discountsHeadingId}>Discount</dt>
        <UpdateDiscountForm>
          <div
            className="cart-codes-applied-row"
            role="group"
            aria-labelledby={discountsHeadingId}
          >
            <code>{codes?.join(', ')}</code>
            <button
              type="submit"
              aria-label="Remove discount"
              className="cart-codes-remove"
            >
              Remove
            </button>
          </div>
        </UpdateDiscountForm>
      </dl>

      <UpdateDiscountForm discountCodes={codes}>
        <div className="cart-codes-input-row">
          <label htmlFor={discountCodeInputId} className="sr-only">
            Discount code
          </label>
          <input
            id={discountCodeInputId}
            type="text"
            name="discountCode"
            placeholder="Discount code"
            className="cart-codes-input"
          />
          <button
            type="submit"
            aria-label="Apply discount code"
            className="cart-codes-apply"
          >
            Apply
          </button>
        </div>
      </UpdateDiscountForm>
    </section>
  );
}

function UpdateDiscountForm({
  discountCodes,
  children,
}: {
  discountCodes?: string[];
  children: React.ReactNode;
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.DiscountCodesUpdate}
      inputs={{
        discountCodes: discountCodes || [],
      }}
    >
      {children}
    </CartForm>
  );
}

function CartGiftCard({
  giftCardCodes,
  giftCardHeadingId,
  giftCardInputId,
}: {
  giftCardCodes: CartApiQueryFragment['appliedGiftCards'] | undefined;
  giftCardHeadingId: string;
  giftCardInputId: string;
}) {
  const giftCardCodeInput = useRef<HTMLInputElement>(null);
  const removeButtonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const previousCardIdsRef = useRef<string[]>([]);
  const giftCardAddFetcher = useFetcher({key: 'gift-card-add'});
  const [removedCardIndex, setRemovedCardIndex] = useState<number | null>(null);

  useEffect(() => {
    if (giftCardAddFetcher.data) {
      if (giftCardCodeInput.current !== null) {
        giftCardCodeInput.current.value = '';
      }
    }
  }, [giftCardAddFetcher.data]);

  useEffect(() => {
    const currentCardIds = giftCardCodes?.map((card) => card.id) || [];

    if (removedCardIndex !== null && giftCardCodes) {
      const focusTargetIndex = Math.min(
        removedCardIndex,
        giftCardCodes.length - 1,
      );
      const focusTargetCard = giftCardCodes[focusTargetIndex];
      const focusButton = focusTargetCard
        ? removeButtonRefs.current.get(focusTargetCard.id)
        : null;

      if (focusButton) {
        focusButton.focus();
      } else if (giftCardCodeInput.current) {
        giftCardCodeInput.current.focus();
      }

      setRemovedCardIndex(null);
    }

    previousCardIdsRef.current = currentCardIds;
  }, [giftCardCodes, removedCardIndex]);

  const handleRemoveClick = (cardId: string) => {
    const index = previousCardIdsRef.current.indexOf(cardId);
    if (index !== -1) {
      setRemovedCardIndex(index);
    }
  };

  return (
    <section aria-label="Gift cards" className="cart-codes-section">
      {giftCardCodes && giftCardCodes.length > 0 && (
        <dl className="cart-codes-applied">
          <dt id={giftCardHeadingId}>Applied Gift Card(s)</dt>
          {giftCardCodes.map((giftCard) => (
            <dd key={giftCard.id} className="cart-codes-applied-row">
              <RemoveGiftCardForm
                giftCardId={giftCard.id}
                lastCharacters={giftCard.lastCharacters}
                onRemoveClick={() => handleRemoveClick(giftCard.id)}
                buttonRef={(el: HTMLButtonElement | null) => {
                  if (el) {
                    removeButtonRefs.current.set(giftCard.id, el);
                  } else {
                    removeButtonRefs.current.delete(giftCard.id);
                  }
                }}
              >
                <code>***{giftCard.lastCharacters}</code>
                <Money data={giftCard.amountUsed} />
              </RemoveGiftCardForm>
            </dd>
          ))}
        </dl>
      )}

      <AddGiftCardForm fetcherKey="gift-card-add">
        <div className="cart-codes-input-row">
          <label htmlFor={giftCardInputId} className="sr-only">
            Gift card code
          </label>
          <input
            id={giftCardInputId}
            type="text"
            name="giftCardCode"
            placeholder="Gift card code"
            ref={giftCardCodeInput}
            className="cart-codes-input"
          />
          <button
            type="submit"
            disabled={giftCardAddFetcher.state !== 'idle'}
            aria-label="Apply gift card code"
            className="cart-codes-apply"
          >
            Apply
          </button>
        </div>
      </AddGiftCardForm>
    </section>
  );
}

function AddGiftCardForm({
  fetcherKey,
  children,
}: {
  fetcherKey?: string;
  children: React.ReactNode;
}) {
  return (
    <CartForm
      fetcherKey={fetcherKey}
      route="/cart"
      action={CartForm.ACTIONS.GiftCardCodesAdd}
    >
      {children}
    </CartForm>
  );
}

function RemoveGiftCardForm({
  giftCardId,
  lastCharacters,
  children,
  onRemoveClick,
  buttonRef,
}: {
  giftCardId: string;
  lastCharacters: string;
  children: React.ReactNode;
  onRemoveClick?: () => void;
  buttonRef?: (el: HTMLButtonElement | null) => void;
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.GiftCardCodesRemove}
      inputs={{
        giftCardCodes: [giftCardId],
      }}
    >
      {children}
      <button
        type="submit"
        aria-label={`Remove gift card ending in ${lastCharacters}`}
        onClick={onRemoveClick}
        ref={buttonRef}
        className="cart-codes-remove"
      >
        Remove
      </button>
    </CartForm>
  );
}
