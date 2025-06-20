
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

// Validate
if (!productId || !price || !title || !imageUrl) {
  return NextResponse.json({ error: "Missing fields" }, { status: 400 });
}

    // 🧠 Check if item already in cart
    const existing = await db
      .select()
      .from(cartItems)
      .where(eq(cartItems.productId, productId));

  
if (existing.length > 0) {
  await db
    .update(cartItems)
    .set({
      quantity: existing[0].quantity + (quantity || 1),
    })
    .where(eq(cartItems.productId, productId));
} else {
  await db.insert(cartItems).values({
    productId,
    quantity: quantity || 1,
    price,
    title,     
    imageUrl,  
  });
}

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 });
  }
}

