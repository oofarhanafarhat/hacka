// db/schema.ts (if mirroring Sanity product)
import { pgTable, text, numeric  ,integer, timestamp} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const products = pgTable("products", {
  id: text("id").primaryKey(), // Sanity's _id
  title: text("title").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  imageUrl: text("image_url"),
  buttonLabel: text("button_label"),
});
export const cartItems = pgTable("cart_items", { 
  id: text("id").primaryKey().default(sql`gen_random_uuid()`),
  productId: text("product_id").notNull(),
  quantity: integer("quantity").notNull().default(1),
  price: integer("price").notNull(), // ✅ Changed to integer — good!
  createdAt: timestamp("created_at").defaultNow(),
});

