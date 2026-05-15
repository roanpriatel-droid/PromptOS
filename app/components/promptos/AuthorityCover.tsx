import type {Authority, Pack, Guide} from '~/lib/catalog';
import {PackCover} from './PackCover';
import {GuideCover} from './GuideCover';

/**
 * Renders the appropriate cover for an Authority product based on its
 * `coverStyle`. PackCover for content-engine (pack-shape), GuideCover for
 * the playbook-shape Authority products.
 */
export function AuthorityCover({product}: {product: Authority}) {
  if (product.coverStyle === 'pack') {
    return <PackCover pack={product as unknown as Pack} />;
  }
  return <GuideCover guide={product as unknown as Guide} />;
}
