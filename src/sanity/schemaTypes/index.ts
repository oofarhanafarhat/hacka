import { type SchemaTypeDefinition } from 'sanity';
import {heroType} from '../schemaTypes/Hero'
import { featurType } from './featurs';
import { categoryType } from './category';
import {productType} from './product';
import {faq} from './faq';
import { cartItem } from './cart';
import { contact } from './contact';
import {chair} from './chair'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [heroType , featurType ,categoryType ,productType,faq, cartItem, contact ,chair],
}
