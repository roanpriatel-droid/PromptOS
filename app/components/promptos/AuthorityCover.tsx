import type {Authority, Pack, Guide} from '~/lib/catalog';
import {PackCover} from './PackCover';
import {GuideCover} from './GuideCover';
import {CoverV39, hasV39Cover} from './CoverV39';

/**
 * Renders the appropriate cover for an Authority product based on its
 * `coverStyle`. PackCover for content-engine (pack-shape), GuideCover for
 * the playbook-shape Authority products.
 *
 * v3.9a Phase B — if the slug has a designed v3.9 cover, use it.
 * Falls back to the existing pack/guide-style inline SVGs otherwise.
 */
export function AuthorityCover({product}: {product: Authority}) {
  if (hasV39Cover(product.slug)) {
    return <CoverV39 slug={product.slug} alt={product.name} />;
  }
  if (product.coverStyle === 'pack') {
    return <PackCover pack={product as unknown as Pack} />;
  }
  return <GuideCover guide={product as unknown as Guide} />;
}
