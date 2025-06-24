
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/sanity/lib/db/db";
import { cartItems, products } from "@/sanity/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const items = await db
      .select({
        id: cartItems.id,
        quantity: cartItems.quantity,
        price: cartItems.price,
        productId: cartItems.productId,
        title: products.title,
        imageUrl: products.imageUrl,
      })
      .from(cartItems)
      .leftJoin(products, eq(cartItems.productId, products.id));

    return Response.json(items);
  } catch (error) {
    console.error("Fetch cart error:", error);
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
  }
}

// POST handler
export async function POST(req: NextRequest) {
  try {
    const { productId, quantity, price, title, imageUrl } = await req.json();

    if (!productId || !price || !title || !imageUrl) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // 1. Insert into `products` table (if not already there)
    const existingProduct = await db
      .select()
      .from(products)
      .where(eq(products.id, productId));

    if (existingProduct.length === 0) {
      await db.insert(products).values({
        id: productId,
        title,
        price,
        imageUrl,
        buttonLabel: "Buy Now", // or leave null if not needed
      });
    }

    // 2. Insert/update cart
    const existingCartItem = await db
      .select()
      .from(cartItems)
      .where(eq(cartItems.productId, productId));

    if (existingCartItem.length > 0) {
      await db
        .update(cartItems)
        .set({
          quantity: existingCartItem[0].quantity + (quantity || 1),
        })
        .where(eq(cartItems.productId, productId));
    } else {
      await db.insert(cartItems).values({
        productId,
        quantity: quantity || 1,
        price,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 });
  }
}
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();

    // If `id` is provided → delete single item
    if (body.id) {
      await db.delete(cartItems).where(eq(cartItems.id, body.id));
      return NextResponse.json({ success: true, message: "Item removed from cart." });
    }

    // If `clearAll` is true → delete all cart items
    if (body.clearAll) {
      await db.delete(cartItems);
      return NextResponse.json({ success: true, message: "All cart items cleared." });
    }

    // If nothing provided
    return NextResponse.json({ error: "Missing cart item id or clearAll flag." }, { status: 400 });

  } catch (error) {
    console.error("❌ DELETE error in /api/cart:", error);
    return NextResponse.json({ error: "Failed to delete cart item(s)." }, { status: 500 });
  }
}

